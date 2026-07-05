# gummigoo-button-test — current state

Goals, open threads, recent decisions. Refreshed at the end of each dev session.

## What exists now

A working single-page site (`index.html` + `styles.css` + `script.js`):
a centered "Gummigoo" pill button that, when clicked, shows a **random
Gummigoo picture** and keeps a running click count in the status line
("Click #7 — enjoy the pic."), plus a secondary "Reset" button that zeroes the
counter and hides the picture for repeat test runs. Keyboard (Enter/Space),
touch, hover, pressed, and focus states all work. No build step — open
`index.html` directly.

The four pictures live in `assets/` (`attached_0.png` … `attached_3.png`,
delivered by the harness) and are listed in the `IMAGES` array in `script.js`.
This completes all build steps of the approved plan. The only unchecked step is
a human browser smoke test (see below).

## Recent decisions

- Kept it framework-free and dependency-free — simplest thing that runs in a
  browser immediately (matches the approved plan's "blank slate" reading).
- Used a native `<button>` so keyboard/touch/double-click edge cases are
  handled by the platform instead of custom JS.
- **The button now serves a random picture on each press, and keeps the click
  counter** (plan step 2 decision): the page stays a test rig, so the count
  stays in the status line rather than being replaced by the picture.
- **Kept the images in `assets/`** rather than making a new `images/` folder as
  the pre-file plan sketched — the harness delivered them into `assets/` and the
  task text said to reference them there, so no binary duplication.
- **No back-to-back repeat** only when 2+ images exist; 1 image re-shows and 0
  degrades to the old count-only behavior. No dead button, no infinite loop.

## Open threads / next decisions

- **What should the button ultimately do? Still open.** The random-picture
  display is *decorative placeholder* behavior — a fun stand-in VRmike asked
  for, not the answer to what the button is really for (link, form submit, game,
  prank, …). Don't treat "shows a random pic" as the product decision.
  - Sub-thread: if the picture should fully *replace* the counter rather than
    sit alongside it, that's a one-line change in `handleActivate()`.
- No tests or CI yet. Not needed for a static placeholder page, but worth
  revisiting once the button's real purpose lands.
- Not yet opened/clicked in a real browser by a human in this session — no
  browser/shell is available in the dev environment, so the counter, reset, and
  the new random-image behavior are all verified by inspection only. Smoke test
  still owed (covers this change AND the still-untested reset control from last
  time — knock out both at once): open the page, mash the button and confirm
  random pics appear and never repeat back-to-back, hit Reset and confirm the
  picture disappears, check the console for errors.

## How to run

Open `index.html` in any browser, or serve the folder
(e.g. `python -m http.server`) and visit it.
