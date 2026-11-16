import {defineConfig} from 'vite';

export default defineConfig({
  base:'/new/',
  publicDir:false,
  build:{outDir:'../../public/new',emptyOutDir:false},
});
