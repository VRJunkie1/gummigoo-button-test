# button-page

The one interactive surface of the project: the Gummigoo test button.

## Structure

- Markup: `#gummigoo-btn` (a native `<button>`) and `#status` (the live region)
  in `index.html`.
- Style: `.gummigoo-btn` in `styles.css`. Pill shape (`border-radius: 999px`),
  pink fill, a bottom box-shadow that acts as a 3D "base"; `:active` translates
  the button down and shrinks that shadow to fake a squish/press.
- Logic: `script.js`, an IIFE. Single `click` listener → `handleActivate()`,
  which increments `clickCount` and updates `#status`.

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
  is the single behavior hook.
- Keep the `#gummigoo-btn` / `#status` ids aligned across HTML and JS.
