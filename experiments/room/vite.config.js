import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';
import {roomAssets} from './room-assets-plugin.js';

export default defineConfig({
  base:'/new/',
  publicDir:false,
  plugins:[roomAssets(fileURLToPath(new URL('../../public/new/guided/',import.meta.url)))],
  build:{outDir:'../../public/new',emptyOutDir:false},
});
