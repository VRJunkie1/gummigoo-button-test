# button-page

The one interactive surface of the project: the Gummigoo test button.

## Structure

- Markup: `#gummigoo-btn` (a native `<button>`), `#status` (the live region),
  `#gummigoo-img` (a hidden `<img>` slot), and `#reset-btn` (a secondary native
  `<button>`) in `index.html`.
- Style: `.gummigoo-btn` in `styles.css`. Pill shape (`border-radius: 999px`),
  pink fill, a bottom box-shadow that acts as a 3D "base"; `:active` translates
  the button down and shrinks that shadow to fake a squish/press.
  `.gummigoo-img` is a rounded image with a fixed, responsive footprint
  (`width`/`height: min(90vw, 20rem)`, `max-height: 50vh`) plus
  `object-fit: contain`, so every picture fills the same box and the layout
  doesn't jump between presses. Hidden by default via the `hidden` attribute.
  `.reset-btn` is a low-emphasis outlined pill (transparent fill, faint border)
  so it reads as secondary to the main button.
- Logic: `script.js`, an IIFE. `#gummigoo-btn` click → `handleActivate()`,
  which increments `clickCount`, updates `#status`, and calls
  `showRandomImage()`. `#reset-btn` click → `handleReset()`, which zeroes
  `clickCount`, restores the idle status, and calls `clearImage()`. The reset
  listener is guarded (`if (resetButton)`) and the image lookup is guarded
  (`if (!image)`), so the counter works even if either is removed.
- Images: the `IMAGES` array (src + alt) lists the files in `assets/`.
  `pickImageIndex()` returns a random index, avoiding an immediate repeat when
  there are 2+ images (`do…while index === lastImageIndex`); with 1 image it
  re-shows, with 0 it returns -1 and the slot stays untouched. To add a
  picture: drop the file in `assets/` and add one line to `IMAGES`.

## Edge cases already handled

- **Keyboard**: native `<button>` fires `click` on Enter and Space, so the one
  listener covers it. `:focus-visible` gives a visible outline.
- **Rapid / double clicks**: each real click fires once; the counter reflects
  actual clicks. No custom debounce needed.
- **Touch / mobile**: native button handles tap; layout uses `clamp()` +
  flexbox so it stays centered and readable on narrow widths.
- **Screen readers**: `role="status"` + `aria-live="polite"` on `#status`
  announces the result.

## If you extend this

- To change what clicking does, edit `handleActivate()` in `script.js` — that
  is the single behavior hook. To change reset behavior, edit `handleReset()`.
- Keep the `#gummigoo-btn` / `#status` / `#gummigoo-img` / `#reset-btn` ids
  aligned across HTML and JS.
