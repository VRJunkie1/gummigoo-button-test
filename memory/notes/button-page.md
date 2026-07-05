# button-page

The one interactive surface of the project: the Gummigoo test button.

## Structure

- Markup: `#gummigoo-btn` (a native `<button>`), `#status` (the live region),
  and `#reset-btn` (a secondary native `<button>`) in `index.html`.
- Style: `.gummigoo-btn` in `styles.css`. Pill shape (`border-radius: 999px`),
  pink fill, a bottom box-shadow that acts as a 3D "base"; `:active` translates
  the button down and shrinks that shadow to fake a squish/press.
  `.reset-btn` is a low-emphasis outlined pill (transparent fill, faint border)
  so it reads as secondary to the main button.
- Logic: `script.js`, an IIFE. `#gummigoo-btn` click → `handleActivate()`,
  which increments `clickCount` and updates `#status`. `#reset-btn` click →
  `handleReset()`, which zeroes `clickCount` and restores the idle status.
  The reset listener is guarded (`if (resetButton)`) so the counter works even
  if the reset control is removed.

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
- Keep the `#gummigoo-btn` / `#status` / `#reset-btn` ids aligned across HTML
  and JS.
