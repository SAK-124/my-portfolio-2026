# Interactive room source

This standalone Vite / Three.js experience is served at `/new` by the portfolio's exact-path rewrite. Its styles and runtime do not wrap or change the existing Next.js portfolio.

## Rebuild the room

From the repository root:

```sh
npm ci --prefix experiments/room
npm run build --prefix experiments/room
```

The build updates `public/new/index.html` and its hashed JS/CSS assets. The committed native render pack in `public/new/guided` remains intact. Commit both source changes and the generated HTML/JS/CSS. The normal portfolio build remains `npm run build`.

The 135-file render pack contains eight object close-ups in three lights, tiled native panoramas, compressed geometric atmosphere masks and native 1080p camera journeys. Only the visible view is loaded. Native Blender files, source models, private reference photos and local capture endpoints are excluded from deployment.

Asset credits are available at `/new/credits.html`.
