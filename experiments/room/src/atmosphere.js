import * as THREE from 'three';

const shared=`
uniform sampler2D roomDepth;
uniform float hasDepth,isPano,tanH,tanV,time,strength,shaftStrength,depthFar,axialDepth;
uniform vec3 sunDirection,airColor;
uniform mat4 captureWorld,captureInverse;
float surfaceDistance(vec3 ray){
 if(hasDepth<.5)return 0.;
 vec2 uv=isPano>.5?vec2(atan(ray.x,-ray.z)/6.2831853+.5,asin(clamp(ray.y,-1.,1.))/2.0943951+.5):ray.xy/max(.0001,-ray.z)/vec2(tanH,tanV)*.5+.5;
 if(uv.y<0.||uv.y>1.||isPano<.5&&(ray.z>0.||uv.x<0.||uv.x>1.))return 0.;
 vec2 packed=texture2D(roomDepth,uv).rg*255.;
 return (packed.x*256.+packed.y)/65535.*depthFar/mix(1.,max(.001,-ray.z),axialDepth);
}
float beam(vec3 p){
 float t=(p.x+2.22)/max(.01,sunDirection.x);
 vec3 w=p-sunDirection*t;
 float aperture=smoothstep(-2.18,-2.08,w.y)*(1.-smoothstep(-.63,-.53,w.y))*smoothstep(.96,1.05,w.z)*(1.-smoothstep(2.43,2.53,w.z));
 float mullion=1.-.82*exp(-pow((w.y+1.355)/.032,2.));
 return aperture*mullion*step(0.,t)*step(p.x,3.2)*step(-6.8,p.y)*step(p.y,0.)*step(0.,p.z)*step(p.z,3.05);
}`;

// Positions live in the native room, not on the screen. Captured geometric
// depth hides the air behind the same furniture visible in the photograph.
export async function atmosphere(asset,manifest,loader){
 const matrix=new THREE.Matrix4().fromArray(asset.def.matrix),inverse=matrix.clone().invert();
 const empty=new THREE.DataTexture(new Uint8Array([255,255,0,255]),1,1);empty.needsUpdate=true;
 const uniforms={roomDepth:{value:empty},hasDepth:{value:0},depthFar:{value:asset.def.depthFar||30},axialDepth:{value:asset.def.depthProjection==='camera-z'?1:0},isPano:{value:asset.pano?1:0},tanH:{value:asset.tanH},tanV:{value:asset.tanV},time:{value:0},strength:{value:1},shaftStrength:{value:1},sunDirection:{value:new THREE.Vector3()},airColor:{value:new THREE.Color()},captureWorld:{value:matrix},captureInverse:{value:inverse},height:{value:1000},cameraRotation:{value:new THREE.Matrix4()},screenTan:{value:new THREE.Vector2()}};
 const preset=manifest.atmosphere?.[asset.mode]||{direction:[.8,.3,-.5],color:[1,.85,.65],strength:.4};
 uniforms.sunDirection.value.fromArray(preset.direction);uniforms.airColor.value.fromArray(preset.color);
 let seed=7349;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const positions=[],seeds=[];
 for(let i=0;i<340;i++){positions.push(-2.1+random()*4.4,-2.9+random()*3.0,.5+random()*2.1);seeds.push(random()*100);}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('seed',new THREE.Float32BufferAttribute(seeds,1));
 const material=new THREE.ShaderMaterial({uniforms,transparent:true,depthTest:false,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,vertexShader:`attribute float seed;uniform float height;varying float visibility;${shared}
 void main(){
  vec3 p=position+vec3(sin(seed+time*.14)*.055,cos(seed*.7+time*.11)*.045,sin(seed*.31+time*.09)*.065);
  vec3 local=(captureInverse*vec4(p,1.)).xyz;float distance=length(local);vec4 view=viewMatrix*vec4(local,1.);
  gl_Position=projectionMatrix*view;gl_PointSize=clamp(height*.0022*(.7+.6*fract(seed*.37))/max(.15,-view.z),1.8,6.0);
  float clear=step(distance+.025,surfaceDistance(normalize(local)))*step(.06,-view.z);
  float lit=beam(p)*shaftStrength;
  visibility=clear*(.018+.045*fract(seed))*(.025+lit*1.4)*strength;
 }`,fragmentShader:`varying float visibility;uniform vec3 airColor;void main(){float r=length(gl_PointCoord-.5)*2.;gl_FragColor=vec4(airColor,exp(-r*r*3.)*(1.-smoothstep(.15,1.,r))*visibility);}`});
 const points=new THREE.Points(geometry,material);points.frustumCulled=false;points.renderOrder=3;asset.scene.add(points);
 const rayMaterial=new THREE.ShaderMaterial({uniforms,transparent:true,depthTest:false,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false,vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:`varying vec2 vUv;uniform mat4 cameraRotation;uniform vec2 screenTan;${shared}
 void main(){
  vec3 ray=normalize(mat3(cameraRotation)*vec3((vUv*2.-1.)*screenTan,-1.));
  float end=min(surfaceDistance(ray),8.);vec3 worldRay=mat3(captureWorld)*ray;vec3 origin=captureWorld[3].xyz;
  float haze=0.;
  for(int i=0;i<12;i++){
   float d=end*(float(i)+.5)/12.;vec3 p=origin+worldRay*d;
   float flow=.84+.16*sin(p.y*5.+p.z*3.+sin(p.x*4.+time*.13)+time*.16);
   haze+=beam(p)*flow*end/12.;
  }
  float phase=.28+.72*pow(max(0.,dot(-worldRay,sunDirection)),5.);
  gl_FragColor=vec4(airColor,haze*.028*phase*shaftStrength);
 }`});
 const rays=new THREE.Mesh(new THREE.PlaneGeometry(2,2),rayMaterial);rays.frustumCulled=false;rays.renderOrder=2;asset.scene.add(rays);
 let depth=null,disposed=false;
 if(asset.def.depth)loader.loadAsync(import.meta.env.BASE_URL+'guided/'+asset.def.depth).then(texture=>{
  if(disposed){texture.dispose();return;}depth=texture;texture.colorSpace=THREE.NoColorSpace;texture.minFilter=THREE.LinearFilter;texture.magFilter=THREE.LinearFilter;texture.generateMipmaps=false;texture.wrapS=asset.pano?THREE.RepeatWrapping:THREE.ClampToEdgeWrapping;uniforms.roomDepth.value=texture;uniforms.hasDepth.value=1;
 }).catch(()=>{});
 rays.visible=preset.strength>.05;
 return {update(time,height,moving){uniforms.time.value=time;uniforms.height.value=height;uniforms.strength.value=moving?(asset.mode==='evening'?.4:.85):0;uniforms.shaftStrength.value=moving?preset.strength:0;uniforms.cameraRotation.value.copy(asset.camera.matrixWorld);const v=Math.tan(THREE.MathUtils.degToRad(asset.camera.fov)/2);uniforms.screenTan.value.set(v*asset.camera.aspect,v);},dispose(){disposed=true;depth?.dispose();empty.dispose();geometry.dispose();material.dispose();rays.geometry.dispose();rayMaterial.dispose();}};
}
