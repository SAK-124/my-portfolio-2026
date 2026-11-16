import './style.css';
import {GuidedRoom} from './guided-scene.js';
import manifest from 'virtual:room-manifest';
const $=selector=>document.querySelector(selector);
$('#asset-credits').href=import.meta.env.BASE_URL+'credits.html';
const groups={room:[['room','Overview']],hobbies:[['hobbies','Maker table'],['printer','3D printer'],['project','PCB project'],['tools','Tool wall'],['drill','Drill'],['rotary','Dremel']],work:[['work','The desk'],['detail','MacBook'],['reading','Books & notes'],['coffee','Coffee']]};
let room,current='room',mode='daylight',token=0,hotspots=[],motion=!matchMedia('(prefers-reduced-motion:reduce)').matches;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('visible'),2800);}
function updateHotspots(){for(const item of hotspots){const p=room.hotspot(item.point);if(!p)continue;item.button.style.left=p.x+'px';item.button.style.top=p.y+'px';item.button.style.opacity=room.incoming||room.busy?'0':'1';item.button.hidden=!p.visible||room.busy;}}
function decorate(view){const definition=room.active()?.def||manifest.views[view],section=definition.section;
 $('#eyebrow').textContent=section==='room'?'01 / AROUND THE ROOM':section==='hobbies'?'02 / MAKER TABLE':'03 / THE DESK';
 $('#title').textContent=definition.label;$('#description').textContent='';
 document.querySelectorAll('[data-section]').forEach(button=>{button.classList.toggle('selected',button.dataset.section===section);button.setAttribute('aria-current',button.dataset.section===section?'page':'false');});
 $('#details').replaceChildren();for(const [id,label]of groups[section]){if(section==='room')continue;const button=document.createElement('button');button.textContent=label;button.classList.toggle('selected',view===id);button.setAttribute('aria-pressed',view===id);button.onpointerenter=()=>room.prepare(id,mode);button.onfocus=button.onpointerenter;button.onclick=()=>id===section&&current===section?room.reset():navigate(id);$('#details').appendChild(button);}
 const parent=section==='hobbies'?'hobbies':'work';$('#back').hidden=section==='room';$('#back').textContent=view===parent?'← Back to the room':section==='hobbies'?'← Back to maker table':'← Back to the desk';$('#back').onclick=()=>navigate(view===parent?'room':parent);
 $('#look-hint').innerHTML=room.active()?.pano?'Drag or two-finger scroll to look around <span>·</span> Click an object to explore':'Drag to inspect · Pinch to zoom <span>·</span> Back to explore the whole section';
 $('#hotspots').replaceChildren();hotspots=[];for(const point of (room.active()?.pano?definition.panorama.hotspots:definition.hotspots)){const button=document.createElement('button');button.className=section==='room'||point.kind==='destination'?'hotspot destination':'hotspot';button.setAttribute('aria-label',point.label);const dot=document.createElement('span');dot.className='hotspot-dot';dot.setAttribute('aria-hidden','true');const label=document.createElement('span');label.className='hotspot-label';label.textContent=point.label;button.append(dot,label);button.onclick=()=>navigate(point.target);button.onpointerenter=()=>room.prepare(point.target,mode);button.onfocus=button.onpointerenter;$('#hotspots').appendChild(button);hotspots.push({point,button});}
 document.querySelectorAll('[data-light]').forEach(button=>{const active=button.dataset.light===mode;button.classList.toggle('selected',active);button.setAttribute('aria-pressed',active);});
}
async function navigate(view,newMode=mode,instant=false){
 if(room?.busy)return;const request=++token,def=manifest.views[view];if(!def)return;
 if(!def.available.includes(newMode)){toast('This lighting is unavailable.');return;}
 room.prepare(view,newMode);
 const loading=$('#scene-loading');loading.classList.remove('done');loading.classList.toggle('quiet',Boolean(room.current));$('#loading-text').textContent=room.current?'Moving closer…':'Opening the room';
 try{room.manifest=manifest;room.pin=view+':'+newMode;const asset=await room.asset(view,newMode);if(request!==token)return;await room.select(view,newMode,instant);if(request!==token)return;current=view;mode=newMode;decorate(view);const url=new URL(location.href);url.hash=view;url.searchParams.set('light',newMode);history.replaceState(null,'',url);updateHotspots();
  if(asset.tileFiles&&[...asset.visibleTiles].some(id=>!asset.tiles.get(id)?.mesh)){loading.classList.add('quiet');$('#loading-text').textContent='Loading fine detail…';await Promise.all(room.updateTiles(asset));}
  if(request===token)loading.classList.add('done');
  // Station textures load on demand; no unseen models are loaded.
 }catch(error){loading.classList.add('done');toast(error.message||'The view could not be opened.');}
}
$('#identity').onclick=event=>{event.preventDefault();navigate('room');};document.querySelectorAll('[data-section]').forEach(button=>button.onclick=()=>button.dataset.section===current?room?.reset():navigate(button.dataset.section));document.querySelectorAll('[data-light]').forEach(button=>button.onclick=()=>navigate(current,button.dataset.light));
 document.querySelectorAll('[data-section]').forEach(button=>{button.onpointerenter=()=>room?.prepare(button.dataset.section,mode);button.onfocus=button.onpointerenter;});
$('#fullscreen').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
$('#motion').onclick=()=>{motion=!motion;room?.setMotion(motion);$('#motion').setAttribute('aria-pressed',motion);};$('#motion').setAttribute('aria-pressed',motion);
$('#capture').onclick=async()=>{if(!room?.current)return;const blob=await room.capture();if(!blob)return;const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`my-room-${current}-${mode}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);if(import.meta.env.DEV){const result=await fetch('/__capture',{method:'POST',headers:{'Content-Type':'image/png'},body:blob});if(!result.ok)console.warn('Local review capture was not saved.');}toast('View saved');};
$('#reset-view').onclick=()=>{room?.reset();toast('View centered');};
$('#zoom-in').onclick=()=>room?.zoomBy(.12);$('#zoom-out').onclick=()=>room?.zoomBy(-.12);
const stage=$('#stage'),pointers=new Map();let gesture=null,dragged=false;
function centroid(){const points=[...pointers.values()];return {x:points.reduce((n,p)=>n+p.x,0)/points.length,y:points.reduce((n,p)=>n+p.y,0)/points.length,distance:points.length>1?Math.hypot(points[0].x-points[1].x,points[0].y-points[1].y):0};}
stage.addEventListener('pointerdown',event=>{
 if(event.target.closest('button')||event.button>0)return;
 pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});stage.setPointerCapture(event.pointerId);gesture=centroid();dragged=false;stage.classList.add('dragging');
});
stage.addEventListener('pointermove',event=>{
 if(!pointers.has(event.pointerId))return;event.preventDefault();pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});const next=centroid();
 if(gesture){const dx=next.x-gesture.x,dy=next.y-gesture.y;if(Math.abs(dx)+Math.abs(dy)>1)dragged=true;room?.pan(dx,dy);if(next.distance&&gesture.distance)room?.zoomBy(Math.log(next.distance/gesture.distance));}gesture=next;
});
function endGesture(event){pointers.delete(event.pointerId);gesture=pointers.size?centroid():null;if(!pointers.size)stage.classList.remove('dragging');}
stage.addEventListener('pointerup',endGesture);stage.addEventListener('pointercancel',endGesture);stage.addEventListener('lostpointercapture',endGesture);
stage.addEventListener('click',event=>{if(dragged){event.stopPropagation();dragged=false;return;}if(event.target.closest('button'))return;const bounds=stage.getBoundingClientRect(),point=room?.pick(event.clientX-bounds.left,event.clientY-bounds.top);if(point)navigate(point.target);},true);
stage.addEventListener('wheel',event=>{
 event.preventDefault();const unit=event.deltaMode===1?16:event.deltaMode===2?stage.clientHeight:1;
 if(event.ctrlKey||event.metaKey)room?.zoomBy(-event.deltaY*.008);else room?.pan(-event.deltaX*unit,-event.deltaY*unit);
},{passive:false});
// Safari trackpad pinch emits gesture events rather than ctrl-wheel.
let gestureScale=1;stage.addEventListener('gesturestart',event=>{event.preventDefault();gestureScale=1;},{passive:false});
stage.addEventListener('gesturechange',event=>{event.preventDefault();room?.zoomBy(Math.log(event.scale/gestureScale));gestureScale=event.scale;},{passive:false});
addEventListener('keydown',event=>{
 if(event.target.matches('input,textarea,select')||event.ctrlKey||event.metaKey||event.altKey)return;
 const directions={ArrowLeft:[65,0],ArrowRight:[-65,0],ArrowUp:[0,65],ArrowDown:[0,-65]};
 if(directions[event.key]){event.preventDefault();room?.pan(...directions[event.key]);}
 if(event.key==='0')room?.reset();if(event.key==='+'||event.key==='=')room?.zoomBy(.12);if(event.key==='-')room?.zoomBy(-.12);
 if(event.key==='Escape'){const section=manifest?.views[current].section;if(section)navigate(current===section?'room':section);}
});
async function start(){try{const preferred=new URLSearchParams(location.search).get('light');if(['daylight','golden','evening'].includes(preferred))mode=preferred;room=new GuidedRoom($('#canvas'),manifest,updateHotspots);room.setMotion(motion);const requested=location.hash.slice(1);const view=manifest.views[requested]?requested:'room';const initialMode=manifest.views[view]?.available.includes(mode)?mode:'daylight';await navigate(manifest.views[view]?.available.includes(initialMode)?view:manifest.views[view]?.parent||'room',initialMode,true);window.addEventListener('pagehide',()=>room.dispose(),{once:true});}catch(error){$('#loading-text').textContent=error.message;}}
start();
