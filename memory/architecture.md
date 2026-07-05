# gummigoo-button-test — architecture ground truth

Updated by dev sessions whenever a change alters the design.

## Overview

A single static web page. No build step, no framework, no dependencies —
just open `index.html` in a browser (or serve the folder statically).

## Files

- `index.html` — the page: a title, the primary `<button>`, a `<p>` status
  line, a hidden `<img>` slot for the random picture, and a secondary "Reset"
  `<button>`.
- `styles.css` — presentation: centered layout, "gummy" pill button with
  hover / pressed / focus states, dark gradient background, a responsive
  rounded `.gummigoo-img` slot, plus a low-emphasis outlined `.reset-btn`.
  Responsive via `clamp()` + flexbox (works desktop and narrow mobile).
- `script.js` — behavior: increments a click counter, writes a confirmation
  into the status line, and shows a random picture from `assets/` on each
  click (never the same one twice in a row when 2+ images exist); the reset
  control zeroes the counter, restores the idle status, and hides the picture.
  IIFE, no globals.
- `assets/` — the Gummigoo picture files the button serves up at random.

## Key design decisions

- **Native `<button>` element** rather than a styled `<div>`. This gives
  keyboard activation (Enter/Space), touch support, focus handling, and
  built-in click debouncing for free — no extra JS for edge cases.
- **`aria-live="polite"` status line** so the click result is announced to
  assistive tech.
- The click action now **serves a random picture** (plus the running count).
  The counter is kept on purpose so the page still reads as a test rig — the
  status line reads like "Click #7 — enjoy the pic." This is still *decorative
  placeholder* behavior — what the button should ultimately do remains an open
  product question (see project-state.md).
- **No back-to-back repeats** only kicks in with 2+ images; with 1 image it
  re-shows and with 0 it degrades to the old count-only behavior. No dead
  button, no infinite loop.
- Images live in **`assets/`** (where they were delivered) and are listed in
  an `IMAGES` array in `script.js`; adding one is a file drop + one line.

## Contract between files

- `script.js` looks up `#gummigoo-btn`, `#status`, `#reset-btn`, and
  `#gummigoo-img` by id. Keep those ids in sync with `index.html` if either
  changes. The reset button and the image slot are both optional: their
  lookups are guarded, so the counter still works without them.
