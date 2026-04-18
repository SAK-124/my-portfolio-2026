import { Font } from '@react-pdf/renderer'

let registered = false

export function ensureFontsRegistered() {
  if (registered) return
  // Disable default hyphenation — cleaner output; react-pdf's default hyphenator
  // inserts awkward breaks at natural spots.
  Font.registerHyphenationCallback((word) => [word])
  registered = true
}
