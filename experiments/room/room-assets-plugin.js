import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';

// Bundle the manifest and version every media URL without re-encoding any render.
export function roomAssets(directory) {
 return {name:'room-assets',resolveId(id){if(id==='virtual:room-manifest')return '\0room-manifest';},
  load(id){
   if(id!=='\0room-manifest')return;
   const hashes=new Map();
   const source=JSON.parse(readFileSync(resolve(directory,'manifest.json'),'utf8'));
   source.routes=Object.fromEntries(Object.entries(source.routes||{}).map(([key,route])=>[key,{from:route.from,to:route.to,start:route.start,end:route.end,available:route.available}]));
   source.mode='native-cycles-still-zoom-navigation';
   const manifest=JSON.parse(JSON.stringify(source),(_key,value)=>{
    if(typeof value!=='string'||!/^[-\w]+\.(webp|mp4)$/.test(value))return value;
    if(!hashes.has(value))hashes.set(value,createHash('sha256').update(readFileSync(resolve(directory,value))).digest('hex').slice(0,12));
    return value+'?v='+hashes.get(value);
   });
   return 'export default '+JSON.stringify(manifest)+';';
  }};
}
