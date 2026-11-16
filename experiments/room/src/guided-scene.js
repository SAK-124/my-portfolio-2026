import * as THREE from 'three';
import {atmosphere} from './atmosphere.js';
import {media} from './media.js';

const loader=media;
const radians = THREE.MathUtils.degToRad;
const clamp = THREE.MathUtils.clamp;
const vertexShader = 'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
const fragmentShader = `uniform sampler2D first,second;uniform float blend;varying vec2 vUv;
void main(){gl_FragColor=vec4(mix(texture2D(first,vUv).rgb,texture2D(second,vUv).rgb,smoothstep(0.,1.,blend)),1.);
#include <colorspace_fragment>
}`;

// A curved photographic surface, not a depth mesh. Rotation reveals already-rendered
// rays; it never invents surfaces behind the silhouette of an object.
function panoramaGeometry(horizontal,vertical,{start=-horizontal/2,end=horizontal/2,radius=30,inset=0,nx=180}={}) {
 const positions=[],uvs=[],indices=[],ny=64;
 for(let y=0;y<=ny;y++)for(let x=0;x<=nx;x++){
  const yaw=start+(end-start)*x/nx,pitch=(y/ny-.5)*vertical;
  positions.push(radius*Math.sin(yaw)*Math.cos(pitch),radius*Math.sin(pitch),-radius*Math.cos(yaw)*Math.cos(pitch));
  uvs.push(inset+x/nx*(1-2*inset),y/ny);
 }
 for(let y=0;y<ny;y++)for(let x=0;x<nx;x++){const a=y*(nx+1)+x,b=a+1,c=a+nx+1;indices.push(a,b,c,b,c+1,c);}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geometry.setIndex(indices);return geometry;
}
// Keep the real room vertical while turning a capture whose initial camera
// looked down at a desktop. Yaw rotates around the room's up axis, not a tilted one.
function orientation(asset,look){
 const tilt=asset.baseTilt||0;
 return new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),-tilt)
  .multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(tilt+look.y,-look.x,0,'YXZ')));
}
function latitudeRange(quaternion,tanH,tanV){
 const m=new THREE.Matrix4().makeRotationFromQuaternion(quaternion).elements,a=m[1],b=m[5],c=m[9];let low=1,high=-1;
 const sample=(x,y)=>{const value=(a*x+b*y-c)/Math.sqrt(1+x*x+y*y);low=Math.min(low,value);high=Math.max(high,value);};
 for(const x of [-tanH,tanH])for(const y of [-tanV,tanV])sample(x,y);
 for(const x of [-tanH,tanH]){const d=a*x-c;if(Math.abs(d)>1e-9){const y=b*(1+x*x)/d;if(Math.abs(y)<=tanV)sample(x,y);}}
 for(const y of [-tanV,tanV]){const d=b*y-c;if(Math.abs(d)>1e-9){const x=a*(1+y*y)/d;if(Math.abs(x)<=tanH)sample(x,y);}}
 if(c<0&&Math.abs(a/c)<=tanH&&Math.abs(b/c)<=tanV)high=1;
 if(c>0&&Math.abs(a/c)<=tanH&&Math.abs(b/c)<=tanV)low=-1;
 return [Math.asin(clamp(low,-1,1)),Math.asin(clamp(high,-1,1))];
}
export class GuidedRoom {
 constructor(element,manifest,onFrame){
  this.element=element;this.manifest=manifest;this.onFrame=onFrame;this.cache=new Map();this.retired=new Set();this.motion=!matchMedia('(prefers-reduced-motion:reduce)').matches;
  this.current=null;this.incoming=null;this.transition=0;
  this.renderer=new THREE.WebGLRenderer({antialias:false,powerPreference:'high-performance'});this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.NoToneMapping;this.renderer.setClearColor(0x10110f);element.appendChild(this.renderer.domElement);
  this.a=null;this.b=null;this.airTarget=new THREE.WebGLRenderTarget(1,1,{type:THREE.HalfFloatType,depthBuffer:false});
  this.photoUniforms={roomAir:{value:this.airTarget.texture},airEnabled:{value:0},viewport:{value:new THREE.Vector2(1,1)}};
  this.composite=new THREE.Scene();this.outputCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);this.uniforms={first:{value:null},second:{value:null},blend:{value:0}};
  this.composite.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.ShaderMaterial({uniforms:this.uniforms,vertexShader,fragmentShader,depthTest:false,depthWrite:false,toneMapped:false})));
  this.resize=()=>{const box=element.getBoundingClientRect();this.width=Math.max(1,box.width);this.height=Math.max(1,box.height);this.renderer.setPixelRatio(Math.min(devicePixelRatio,2.5));this.renderer.setSize(this.width,this.height);const size=this.renderer.getDrawingBufferSize(new THREE.Vector2());this.pixelWidth=size.x;this.pixelHeight=size.y;this.airTarget.setSize(size.x,size.y);this.a?.setSize(size.x,size.y);this.b?.setSize(size.x,size.y);this.photoUniforms.viewport.value.copy(size);this.dirty=true;};
  this.observer=new ResizeObserver(this.resize);this.observer.observe(element);this.resize();
  this.last=performance.now();this.lastDraw=0;this.time=0;this.render=this.render.bind(this);this.request=requestAnimationFrame(this.render);
 }
 photoMaterial(photo){
  const material=new THREE.MeshBasicMaterial({map:photo,toneMapped:false,side:THREE.DoubleSide});
  // Add light in linear space before Three's single display color conversion.
  material.onBeforeCompile=shader=>{Object.assign(shader.uniforms,this.photoUniforms);shader.fragmentShader='uniform sampler2D roomAir;uniform vec2 viewport;uniform float airEnabled;\n'+shader.fragmentShader.replace('#include <colorspace_fragment>','if(airEnabled>.5)gl_FragColor.rgb+=texture2D(roomAir,gl_FragCoord.xy/viewport).rgb;\n#include <colorspace_fragment>');};
  material.customProgramCacheKey=()=> 'photograph-with-linear-air-v1';return material;
 }
 prepare(view,mode){
  if(!this.manifest.views[view]?.available.includes(mode)||this.disposed)return;
  this.asset(view,mode).catch(()=>{});
  const previous=this.active(),from=previous?.def.parent||previous?.view,to=this.manifest.views[view].parent||view;
  if(this.motion&&from&&from!==to){const route=this.manifest.routes?.[from+'-'+to];if(route?.available.includes(mode))media.clip(route.videos[mode]).catch(()=>{});}
 }
 async asset(view,mode){
  const key=view+':'+mode;
  if(this.cache.has(key)){const value=this.cache.get(key),asset=await value;this.cache.delete(key);if(this.manifest.views[view].panorama?.available?.includes(mode)&&(!asset.pano||this.manifest.views[view].panorama?.tiles?.[mode]&&!asset.tileFiles)){this.retired.add(asset);return this.asset(view,mode);}this.cache.set(key,value);return asset;}
  const promise=(async()=>{
   const def=this.manifest.views[view],pano=def.panorama?.available?.includes(mode),file=pano?(def.panorama.previews?.[mode]||def.panorama.images[mode]):def.images[mode];
   const photo=await loader.loadAsync(file);photo.colorSpace=THREE.SRGBColorSpace;if(pano)photo.wrapS=THREE.RepeatWrapping;photo.minFilter=THREE.LinearMipmapLinearFilter;photo.magFilter=THREE.LinearFilter;photo.anisotropy=Math.min(4,this.renderer.capabilities.getMaxAnisotropy());
   const tanH=def.sensor/(2*def.lens),tanV=tanH/((def.width||this.manifest.width)/(def.height||this.manifest.height)),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(50,1,.04,60);
   const geometry=pano?panoramaGeometry(radians(def.panorama.horizontal),radians(def.panorama.vertical)):new THREE.PlaneGeometry(60*tanH,60*tanV);
   const material=this.photoMaterial(photo);const surface=new THREE.Mesh(geometry,material);if(!pano)surface.position.z=-30;scene.add(surface);
   const active=this.active(),same=active?.view===view;
   const baseTilt=pano?(def.panorama.baseTilt||0):Math.asin(clamp(new THREE.Vector3(0,0,-1).transformDirection(new THREE.Matrix4().fromArray(def.matrix)).z,-1,1));
   const asset={view,mode,def,pano,baseTilt,photo,tanH,tanV,scene,camera,geometry,material,air:null,look:same?active.look.clone():new THREE.Vector2(),goal:same?active.goal.clone():new THREE.Vector2(),zoom:same?active.zoom:1,tileFiles:pano&&def.panorama.tiles?.[mode],tiles:new Map(),visibleTiles:new Set(),disposed:false,
    dispose(){this.disposed=true;for(const tile of this.tiles.values())tile.dispose();this.tiles.clear();photo.dispose();geometry.dispose();material.dispose();this.air?.dispose();}};
   asset.air=await atmosphere(asset,this.manifest,loader);this.configure(asset);return asset;
  })();this.cache.set(key,promise);promise.then(()=>this.trim(),()=>this.cache.delete(key));return promise;
 }
 neededTiles(asset){
  const q=asset.camera.quaternion,ray=new THREE.Vector3(0,0,-1).applyQuaternion(q),center=Math.atan2(ray.x,-ray.z);
  const tanV=Math.tan(radians(asset.camera.fov)/2),tanH=tanV*asset.camera.aspect;let low=0,high=0;
  for(let i=0;i<=8;i++){
   const t=i/4-1;
   for(const [x,y]of [[-1,t],[1,t],[t,-1],[t,1]]){
    ray.set(x*tanH,y*tanV,-1).applyQuaternion(q);const yaw=Math.atan2(ray.x,-ray.z);const delta=Math.atan2(Math.sin(yaw-center),Math.cos(yaw-center));low=Math.min(low,delta);high=Math.max(high,delta);
   }
  }
  const n=asset.def.panorama.tileColumns,step=2*Math.PI/n,ids=[];
  for(let k=Math.floor((center+low-.04+Math.PI)/step);k<=Math.floor((center+high+.04+Math.PI)/step);k++)ids.push(((k%n)+n)%n);
  return [...new Set(ids)];
 }
 tile(asset,index,priority=0){
  if(asset.tiles.has(index)){const tile=asset.tiles.get(index);asset.tiles.delete(index);asset.tiles.set(index,tile);return tile.promise;}
  const tile={mesh:null,texture:null,retired:false,dispose(){this.retired=true;if(this.mesh){asset.scene.remove(this.mesh);this.mesh.geometry.dispose();this.mesh.material.dispose();}this.texture?.dispose();}};
  asset.tiles.set(index,tile);
  tile.promise=loader.loadAsync(asset.tileFiles[index],priority).then(texture=>{
   if(asset.disposed||tile.retired){texture.dispose();return null;}
   texture.colorSpace=THREE.SRGBColorSpace;texture.minFilter=THREE.LinearMipmapLinearFilter;texture.magFilter=THREE.LinearFilter;texture.anisotropy=Math.min(4,this.renderer.capabilities.getMaxAnisotropy());
   const p=asset.def.panorama,n=p.tileColumns,step=2*Math.PI/n,pad=p.tilePadding,tileWidth=p.width/n;
   const geometry=panoramaGeometry(2*Math.PI,radians(p.vertical),{start:-Math.PI+index*step,end:-Math.PI+(index+1)*step,radius:29.97,inset:pad/(tileWidth+2*pad),nx:24});
   tile.texture=texture;tile.mesh=new THREE.Mesh(geometry,this.photoMaterial(texture));asset.scene.add(tile.mesh);this.pruneTiles(asset);this.dirty=true;return tile;
  }).catch(()=>{if(asset.tiles.get(index)===tile)asset.tiles.delete(index);return null;});
  return tile.promise;
 }
 pruneTiles(asset){
  for(const [id,tile]of asset.tiles){if(asset.tiles.size<=6)break;if(asset.visibleTiles.has(id))continue;asset.tiles.delete(id);tile.dispose();}
 }
 updateTiles(asset){
  if(!asset.tileFiles||asset.disposed)return [];
  const ids=this.neededTiles(asset);asset.visibleTiles=new Set(ids);
  const jobs=ids.map(index=>this.tile(asset,index));this.pruneTiles(asset);
  const signature=ids.join(',');
  if(signature!==asset.tileSignature){asset.tileSignature=signature;Promise.all(jobs).then(()=>{
   if(asset.disposed||asset.tileSignature!==signature||navigator.connection?.saveData)return;
   const n=asset.def.panorama.tileColumns;
   for(const index of [(ids[0]-1+n)%n,(ids.at(-1)+1)%n])if(!asset.visibleTiles.has(index))this.tile(asset,index,1);
  });}
  return jobs;
 }
 pointLook(asset,point){
  const p=new THREE.Vector3(Math.sin(point.yaw)*Math.cos(point.pitch),Math.sin(point.pitch),-Math.cos(point.yaw)*Math.cos(point.pitch)).applyAxisAngle(new THREE.Vector3(1,0,0),asset.def.panorama?.baseTilt||0);
  const yaw=Math.atan2(p.x,-p.z);return new THREE.Vector2(yaw+Math.round((asset.look.x-yaw)/(2*Math.PI))*2*Math.PI,Math.asin(clamp(p.y,-1,1))-(asset.def.panorama?.baseTilt||0));
 }
 worldLook(asset,quaternion){
  const native=new THREE.Matrix4().fromArray(asset.def.matrix),q=new THREE.Quaternion().setFromRotationMatrix(native).invert().multiply(quaternion);
  const ray=new THREE.Vector3(0,0,-1).applyQuaternion(q);
  return this.pointLook(asset,{yaw:Math.atan2(ray.x,-ray.z),pitch:Math.asin(clamp(ray.y,-1,1))});
 }
 async pose(asset,look,zoom,duration=650){
  if(!this.motion){asset.look.copy(look);asset.goal.copy(look);asset.zoom=zoom;this.configure(asset);return;}
  const from=asset.look.clone(),initial=asset.zoom,start=performance.now();
  await new Promise(resolve=>{this.tween={asset,from,to:look.clone(),initial,zoom,start,duration,resolve};});
  this.configure(asset);if(asset.tileFiles)await Promise.all(this.updateTiles(asset));
 }
 async leaveCloseup(asset,mode){
  const parent=await this.asset(asset.def.parent,mode);
  const world=new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().fromArray(asset.def.matrix)).multiply(asset.camera.quaternion);
  const look=this.worldLook(parent,world);parent.look.copy(look);parent.goal.copy(look);parent.zoom=52/THREE.MathUtils.radToDeg(this.fov(asset));this.configure(parent);
  await Promise.all(this.updateTiles(parent));this.current=parent;this.incoming=null;return parent;
 }
 async journey(previous,next,route,mode){
  const blob=await media.clip(route.videos[mode]),clipURL=URL.createObjectURL(blob);
  const video=document.createElement('video');video.muted=true;video.playsInline=true;video.preload='auto';video.src=clipURL;
  try{
   await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('The camera journey could not load.')),20000);video.onloadeddata=()=>{clearTimeout(timer);resolve();};video.onerror=()=>{clearTimeout(timer);reject(Error('The camera journey could not load.'));};video.load();});
   const settings=route.clipSettings?.[mode]||route,tanV=Math.tan(radians(settings.captureFov)/2),tanH=tanV*settings.aspect;
   const fov=Math.min(radians(route.displayFov),2*Math.atan(tanH/(this.width/this.height)*.98));
   const zoom=52/THREE.MathUtils.radToDeg(fov);
   await this.pose(previous,this.pointLook(previous,route.start),zoom,480);
   const texture=new THREE.VideoTexture(video);texture.colorSpace=THREE.SRGBColorSpace;
   const geometry=new THREE.PlaneGeometry(60*tanH,60*tanV),material=new THREE.MeshBasicMaterial({map:texture,toneMapped:false}),surface=new THREE.Mesh(geometry,material);surface.position.z=-30;
   const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(THREE.MathUtils.radToDeg(fov),this.width/this.height,.1,60);scene.add(surface);
   this.video={video,scene,camera,texture,geometry,material,tanH,displayFov:route.displayFov};this.dirty=true;
   await new Promise((resolve,reject)=>{video.onended=resolve;video.onerror=()=>reject(Error('The camera journey was interrupted.'));video.play().catch(reject);});
   const end=route.end||{yaw:0,pitch:0};next.look.copy(this.pointLook(next,end));next.goal.copy(next.look);next.zoom=52/this.video.camera.fov;this.configure(next);await Promise.all(this.updateTiles(next));
   this.current=next;this.incoming=null;
  }finally{
   video.pause();video.removeAttribute('src');video.load();URL.revokeObjectURL(clipURL);if(this.video){this.video.texture.dispose();this.video.geometry.dispose();this.video.material.dispose();this.video=null;}
  }
 }
 async select(view,mode,instant=false){
  const next=await this.asset(view,mode);let previous=this.incoming||this.current;
  if(this.pin&&this.pin!==view+':'+mode)return next;
  if(instant||!previous||!this.motion){next.look.set(0,0);next.goal.set(0,0);next.zoom=1;this.current=next;this.incoming=null;this.trim();this.dirty=true;return next;}
  if(previous.view===view){next.look.copy(previous.look);next.goal.copy(previous.goal);next.zoom=previous.zoom;this.configure(next);await Promise.all(this.updateTiles(next));this.current=previous;this.incoming=next;this.transition=performance.now();this.dirty=true;return next;}
  const from=previous.def.parent||previous.view,to=next.def.parent||view;
  if(from!==to&&!this.manifest.routes?.[from+'-'+to]?.available.includes(mode))throw Error('This camera move is still rendering.');
  this.busy=true;
  try{
   this.current=previous;this.incoming=null;
   if(!previous.pano)previous=await this.leaveCloseup(previous,mode);
   const station=next.def.parent||view;
   if(previous.view!==station){
    const destination=next.pano?next:await this.asset(station,mode),route=this.manifest.routes?.[previous.view+'-'+station];
    if(route?.available.includes(mode))await this.journey(previous,destination,route,mode);
    else throw Error('This camera move is still rendering.');
    previous=this.current;
   }
   if(next.def.parent){
    next.look.set(0,0);next.goal.set(0,0);next.zoom=1;this.configure(next);
    const fov=THREE.MathUtils.radToDeg(this.fov(next));
    await this.pose(previous,this.pointLook(previous,next.def.entry),52/fov,820);
    this.current=next;
   }else if(previous===next){const front=new THREE.Vector2(Math.round(next.look.x/(2*Math.PI))*2*Math.PI,0);if(next.look.distanceToSquared(front)>1e-8||Math.abs(next.zoom-1)>.001)await this.pose(next,front,1,400);}
   this.incoming=null;this.trim();this.dirty=true;return next;
  }finally{this.busy=false;this.trim();}
 }
 trim(){
  if(this.busy)return;
  for(const promise of this.cache.values())promise.then(asset=>{if(asset!==this.current&&asset!==this.incoming)asset.air?.release();},()=>{});
  for(const asset of this.retired)if(asset!==this.current&&asset!==this.incoming){asset.dispose();this.retired.delete(asset);}
  let excess=this.cache.size-2;const protectedKeys=new Set([this.pin,this.current&&this.current.view+':'+this.current.mode,this.incoming&&this.incoming.view+':'+this.incoming.mode]);
  for(const [key,promise]of this.cache){if(excess<=0)break;if(protectedKeys.has(key))continue;this.cache.delete(key);excess--;promise.then(asset=>asset.dispose(),()=>{});}
 }
 active(){return this.incoming||this.current;}
 pan(dx,dy){const asset=this.active();if(!asset||this.busy)return;const sensitivity=asset.pano ? .0023*Math.max(1,720/this.width) : .00065;asset.goal.x-=dx*sensitivity;asset.goal.y+=dy*sensitivity;this.bound(asset,asset.goal);this.dirty=true;}
 zoomBy(amount){const asset=this.active();if(!asset||this.busy)return;asset.zoom=clamp(asset.zoom*Math.exp(amount),asset.pano ? .82 : 1,1.65);this.bound(asset,asset.goal);this.dirty=true;}
 reset(){const asset=this.active();if(!asset||this.busy)return;asset.goal.set(Math.round(asset.look.x/(2*Math.PI))*2*Math.PI,0);asset.zoom=1;this.dirty=true;}
 setMotion(value){this.motion=value;this.dirty=true;}
 fov(asset){
  const aspect=this.width/this.height;
  return asset.pano?radians(clamp(52/asset.zoom,4,64)):Math.min(radians(asset.def.displayFov||50),2*Math.atan(Math.min(asset.tanV/1.12,asset.tanH/aspect*.94)))/asset.zoom;
 }
 bound(asset,look){
  const v=this.fov(asset)/2,tanV=Math.tan(v),tanH=tanV*this.width/this.height;
  const vertical=asset.pano?radians(asset.def.panorama.vertical)/2:Math.atan(asset.tanV),horizontal=asset.pano?radians(asset.def.panorama.horizontal)/2:Math.atan(asset.tanH);
  if(asset.pano&&asset.def.panorama.horizontal>=359){
   const tilt=asset.def.panorama.baseTilt||0;
   look.y=clamp(look.y,-Math.PI/2+.08-tilt,Math.PI/2-.08-tilt);
   for(let attempt=0;attempt<8;attempt++){
    const [low,high]=latitudeRange(orientation(asset,look),tanH,tanV);let correction=0;
    if(low < -vertical+.025)correction+=-vertical+.025-low;
    if(high > vertical-.025)correction-=high-vertical+.025;
    if(Math.abs(correction)<1e-5)break;look.y+=correction;
   }
   return;
  }
  look.y=clamp(look.y,-Math.max(0,vertical-v-.025),Math.max(0,vertical-v-.025));
  const extent=Math.atan2(tanH,Math.cos(look.y)-Math.abs(Math.sin(look.y))*tanV);
  const yawLimit=asset.pano&&asset.def.panorama.horizontal>=359 ? Math.PI : Math.max(0,horizontal-extent-.025);look.x=clamp(look.x,-yawLimit,yawLimit);
  // Perspective close-ups are a flat photograph. Check all corner rays against
  // the source rectangle, so looking around never exposes an empty edge.
  if(!asset.pano){
   const ray=new THREE.Vector3();
   for(let attempt=0;attempt<30;attempt++){
    const q=orientation(asset,look);let fits=true;
    for(const x of [-1,1])for(const y of [-1,1]){ray.set(x*tanH,y*tanV,-1).applyQuaternion(q);if(ray.z>=0||Math.abs(ray.x/-ray.z)>asset.tanH*.995||Math.abs(ray.y/-ray.z)>asset.tanV*.995)fits=false;}
    if(fits)break;look.multiplyScalar(.9);
   }
  }
 }
 configure(asset){
  const signature=[asset.look.x,asset.look.y,asset.goal.x,asset.goal.y,asset.zoom,this.width,this.height].join(':');
  if(asset.poseSignature!==signature){
   asset.poseSignature=signature;this.bound(asset,asset.goal);this.bound(asset,asset.look);asset.camera.aspect=this.width/this.height;asset.camera.fov=THREE.MathUtils.radToDeg(this.fov(asset));asset.camera.updateProjectionMatrix();
   asset.camera.position.set(0,0,0);asset.camera.quaternion.copy(orientation(asset,asset.look));asset.camera.updateMatrixWorld();this.updateTiles(asset);this.cameraRevision=(this.cameraRevision||0)+1;
  }
  asset.air?.update(this.time,this.pixelHeight,this.motion);
 }
 render(now){
  this.request=requestAnimationFrame(this.render);if(document.hidden)return;
  const turning=this.current&&this.current.look.distanceToSquared(this.current.goal)>1e-8;
  const interactive=turning||this.tween||this.incoming||this.video;
  const interval=interactive?0:1000/30;
  if(!this.dirty&&now-this.lastDraw<interval)return;
  const dt=Math.min((now-this.last)/1000,.1);this.last=now;this.lastDraw=interval?now-(now-this.lastDraw)%interval:now;this.time+=dt;let moving=false;
  if(this.tween){const t=this.tween,progress=clamp((now-t.start)/t.duration,0,1),eased=progress*progress*(3-2*progress);t.asset.look.lerpVectors(t.from,t.to,eased);t.asset.goal.copy(t.asset.look);t.asset.zoom=THREE.MathUtils.lerp(t.initial,t.zoom,eased);moving=true;if(progress===1){this.tween=null;t.resolve();}}
  for(const asset of [this.current,this.incoming])if(asset&&asset!==this.tween?.asset){asset.look.lerp(asset.goal,this.motion?1-Math.exp(-dt*14):1);if(asset.look.distanceToSquared(asset.goal)<1e-8)asset.look.copy(asset.goal);moving ||= asset.look.distanceToSquared(asset.goal)>1e-8;}
  if(!this.current||(!this.dirty&&!moving&&!this.incoming&&!this.motion))return;
  this.draw(now);this.dirty=false;
  const overlayKey=[this.current.view,this.current.mode,this.cameraRevision,Boolean(this.incoming),Boolean(this.busy)].join(':');
  if(this.overlayKey!==overlayKey){this.overlayKey=overlayKey;this.onFrame?.(this);}
 }
 drawAsset(asset,target){
  this.configure(asset);this.photoUniforms.airEnabled.value=this.motion?1:0;
  if(this.motion)asset.air?.render(this.renderer,this.airTarget,this.pixelWidth,this.pixelHeight);
  this.renderer.setRenderTarget(target);this.renderer.render(asset.scene,asset.camera);
 }
 draw(now=performance.now()){
  if(!this.current)return;
  if(this.video){const clip=this.video;clip.camera.aspect=this.width/this.height;clip.camera.fov=Math.min(clip.displayFov,THREE.MathUtils.radToDeg(2*Math.atan(clip.tanH/clip.camera.aspect*.98)));clip.camera.updateProjectionMatrix();this.renderer.setRenderTarget(null);this.renderer.render(clip.scene,clip.camera);return;}
  if(!this.incoming){this.drawAsset(this.current,null);return;}
  // Floating point full-scene buffers exist only during a lighting crossfade.
  if(!this.a){this.a=new THREE.WebGLRenderTarget(this.pixelWidth,this.pixelHeight,{type:THREE.HalfFloatType,depthBuffer:false});this.b=this.a.clone();}
  this.drawAsset(this.current,this.a);this.drawAsset(this.incoming,this.b);
  this.uniforms.first.value=this.a.texture;this.uniforms.second.value=this.b.texture;const t=clamp((now-this.transition)/850,0,1);this.uniforms.blend.value=t;
  this.renderer.setRenderTarget(null);this.renderer.render(this.composite,this.outputCamera);
  if(t===1){this.current.air?.release();this.current=this.incoming;this.incoming=null;this.a.dispose();this.b.dispose();this.a=null;this.b=null;this.trim();}
 }

 hotspot(point){
  const asset=this.active();if(!asset)return null;let p;
  if(asset.pano){const yaw=point.yaw,pitch=point.pitch;p=new THREE.Vector3(Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),-Math.cos(yaw)*Math.cos(pitch));}
  else p=new THREE.Vector3((2*point.x-1)*asset.tanH,(1-2*point.y)*asset.tanV,-1);
  const forward=p.clone().applyQuaternion(asset.camera.quaternion.clone().invert()).z<0;p.project(asset.camera);
  return {x:(p.x*.5+.5)*this.width,y:(-.5*p.y+.5)*this.height,visible:forward&&Math.abs(p.x)<.94&&Math.abs(p.y)<.90};
 }
 pick(x,y){
  const asset=this.active();if(!asset?.pano||this.busy)return null;
  const raycaster=new THREE.Raycaster();raycaster.setFromCamera(new THREE.Vector2(x/this.width*2-1,1-y/this.height*2),asset.camera);
  const matrix=new THREE.Matrix4().fromArray(asset.def.matrix),origin=new THREE.Vector3().setFromMatrixPosition(matrix),direction=raycaster.ray.direction.transformDirection(matrix),ray=new THREE.Ray(origin,direction);let nearest=Infinity,chosen=null;
  for(const point of asset.def.panorama.hotspots){const bounds=this.manifest.objectBounds?.[point.target];if(!bounds)continue;const intersection=ray.intersectBox(new THREE.Box3(new THREE.Vector3().fromArray(bounds[0]),new THREE.Vector3().fromArray(bounds[1])),new THREE.Vector3());if(intersection){const distance=origin.distanceTo(intersection);if(distance<nearest){nearest=distance;chosen=point;}}}
  return chosen;
 }
 capture(){this.draw();return new Promise(resolve=>this.renderer.domElement.toBlob(resolve));}
 dispose(){this.disposed=true;cancelAnimationFrame(this.request);this.tween?.resolve();if(this.video){this.video.video.pause();this.video.video.removeAttribute('src');this.video.video.load();this.video.texture.dispose();this.video.geometry.dispose();this.video.material.dispose();}this.observer.disconnect();this.renderer.dispose();this.a?.dispose();this.b?.dispose();this.airTarget.dispose();for(const asset of this.retired)asset.dispose();for(const promise of this.cache.values())promise.then(asset=>asset.dispose());}
}
