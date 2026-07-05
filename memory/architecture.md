# gummigoo-button-test — architecture ground truth

Updated by dev sessions whenever a change alters the design.

## Overview

A single static web page. No build step, no framework, no dependencies —
just open `index.html` in a browser (or serve the folder statically).

## Files

- `index.html` — the page: a title, the primary `<button>`, a `<p>` status
  line, and a secondary "Reset" `<button>`.
- `styles.css` — presentation: centered layout, "gummy" pill button with
  hover / pressed / focus states, dark gradient background, plus a
  low-emphasis outlined `.reset-btn`. Responsive via `clamp()` + flexbox
  (works desktop and narrow mobile).
- `script.js` — behavior: increments a click counter and writes a
  confirmation into the status line; the reset control zeroes the counter and
  restores the idle status. IIFE, no globals.

## Key design decisions

- **Native `<button>` element** rather than a styled `<div>`. This gives
  keyboard activation (Enter/Space), touch support, focus handling, and
  built-in click debouncing for free — no extra JS for edge cases.
- **`aria-live="polite"` status line** so the click result is announced to
  assistive tech.
- The click action is a **placeholder** (count + confirm). What the button
  should ultimately do is an open product question (see project-state.md).

## Contract between files

- `script.js` looks up `#gummigoo-btn`, `#status`, and `#reset-btn` by id.
  Keep those ids in sync with `index.html` if either changes. The reset button
  is optional: its listener is guarded, so the counter still works without it.
