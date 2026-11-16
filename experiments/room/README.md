# Interactive room source

This standalone Vite / Three.js experience is served at `/new` by the portfolio's exact-path rewrite. Its styles and runtime do not wrap or change the existing Next.js portfolio.

## Rebuild the room

From the repository root:

```sh
npm ci --prefix experiments/room
npm run build --prefix experiments/room
```

The build updates `public/new/index.html` and its hashed JS/CSS assets. The committed native render pack in `public/new/guided` remains intact. Commit both source changes and the generated HTML/JS/CSS. The normal portfolio build remains `npm run build`.

The render pack contains eight object close-ups in three lights, tiled native panoramas and compressed geometric atmosphere masks. Navigation uses those sharp still views. Legacy camera clips remain on disk for compatibility with older cached clients; the current viewer never requests them. Native Blender files, source models, private reference photos and local capture endpoints are excluded from deployment.

Asset credits are available at `/new/credits.html`.

## Delivery and rendering

- The Vite plugin bundles the manifest and adds a content hash to every media URL. There is no manifest request on navigation.
- The Next.js headers let browsers retain hashed JS/CSS and versioned media for one year. Unversioned media retain the framework's default revalidation behavior.
- ImageBitmap decodes native lossless WebP images asynchronously; the loader prioritizes visible tiles and limits concurrent image work to three requests.
- Visible panorama tiles remain pinned. A bounded LRU retains nearby tiles, and one column beyond each visible edge is prepared after visible detail loads.
- Pointer/focus intent prepares destination imagery. On navigation, the visible tile columns along the turn are pinned, loaded and uploaded before the camera moves. The camera eases toward the destination, switches viewpoints at the zoom peak, and settles into its front view. This uses the same animation-frame loop as item inspection; no video, walking simulation or navigation fade is used.
- Photographs render directly to the display with linear-space air compositing. Full-scene floating-point targets exist only during a lighting change.
- The full-resolution, depth-occluded light-shaft field is cached while the camera is still. Dust and soft density continue animating; camera movement updates the field.
- Camera interaction uses animation-frame cadence. Stationary atmosphere uses a drift-corrected 30 Hz cadence. Camera projection, tile selection and hotspot DOM positions update only when their inputs change.
- Output supports up to 2.5 device pixels per CSS pixel, rather than the former 1.5 cap. No panorama, close-up or depth image is resized or re-encoded.

Research: [Marzipano's visible-tile/LRU model](https://www.marzipano.net/reference/TextureStore.html), [Three.js rendering on demand](https://threejs.org/manual/pages/rendering-on-demand.html), [ImageBitmapLoader](https://threejs.org/docs/pages/ImageBitmapLoader.html), [Vercel cache headers](https://vercel.com/docs/caching/cache-control-headers).
