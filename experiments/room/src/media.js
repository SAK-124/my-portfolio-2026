import * as THREE from 'three';

const base=import.meta.env.BASE_URL+'guided/';
const queue=[];let running=0;
function drain(){
 while(running<3&&queue.length){
  const job=queue.shift();running++;
  job.run().then(job.resolve,job.reject).finally(()=>{running--;drain();});
 }
}
function schedule(run,priority){return new Promise((resolve,reject)=>{queue.push({run,priority,resolve,reject});queue.sort((a,b)=>a.priority-b.priority);drain();});}
const fallback=new THREE.TextureLoader();
export const media={
 async loadAsync(file,priority=0){
  return schedule(async()=>{
   const url=base+file;
   if(typeof createImageBitmap!=='function')return fallback.loadAsync(url);
   const response=await fetch(url,{cache:'force-cache',priority:priority?'low':'high'});
   if(!response.ok)throw Error('A room image could not load.');
   const blob=await response.blob();let bitmap;
   try{bitmap=await createImageBitmap(blob,{imageOrientation:'flipY',premultiplyAlpha:'none'});}
   catch{return fallback.loadAsync(url);}
   const texture=new THREE.Texture(bitmap);texture.needsUpdate=true;
   texture.addEventListener('dispose',()=>bitmap.close());
   return texture;
  },priority);
 }
};
