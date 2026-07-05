// Gummigoo Button Test — click behavior.
// Counts clicks and shows a random Gummigoo picture on each press so we can
// verify the button works.
(function () {
  "use strict";

  var button = document.getElementById("gummigoo-btn");
  var status = document.getElementById("status");
  var resetButton = document.getElementById("reset-btn");
  var image = document.getElementById("gummigoo-img");

  if (!button || !status) {
    return;
  }

  // Available pictures. To add one: drop the file in assets/ and add a line.
  var IMAGES = [
    { src: "assets/attached_0.png", alt: "Gummigoo, the cowboy-hat gator, at the circus." },
    { src: "assets/attached_1.webp", alt: "Pomni the jester kneeling in front of a golden gator." },
    { src: "assets/attached_2.webp", alt: "Chibi drawing of Gummigoo in a hat and green overalls." },
    { src: "assets/attached_3.png", alt: "Gummigoo lounging on a red couch with Pomni." }
  ];

  var clickCount = 0;
  var lastImageIndex = -1;

  // Pick a random image index, avoiding an immediate repeat when there are 2+
  // images. With 1 image it re-shows; with 0 it returns -1 (no image).
  function pickImageIndex() {
    if (IMAGES.length === 0) {
      return -1;
    }
    if (IMAGES.length === 1) {
      return 0;
    }
    var index;
    do {
      index = Math.floor(Math.random() * IMAGES.length);
    } while (index === lastImageIndex);
    return index;
  }

  // Show a fresh random image in the slot. No-ops if the slot or list is empty.
  function showRandomImage() {
    if (!image) {
      return;
    }
    var index = pickImageIndex();
    if (index === -1) {
      return;
    }
    lastImageIndex = index;
    image.src = IMAGES[index].src;
    image.alt = IMAGES[index].alt;
    image.hidden = false;
  }

  // Return the image slot to its idle (hidden, empty) state.
  function clearImage() {
    if (!image) {
      return;
    }
    image.hidden = true;
    image.removeAttribute("src");
    image.alt = "";
    lastImageIndex = -1;
  }

  function handleActivate() {
    clickCount += 1;
    status.textContent = "Click #" + clickCount + " — enjoy the pic.";
    showRandomImage();
  }

  function handleReset() {
    clickCount = 0;
    status.textContent = "Counter reset. Click the button to start.";
    clearImage();
  }

  // A plain <button> already fires click on mouse, touch, Enter and Space,
  // so a single click listener covers keyboard activation too. Native buttons
  // also debounce their own activation, so rapid clicks each register cleanly
  // without double-firing.
  button.addEventListener("click", handleActivate);

  // Secondary reset control for repeat test runs. Optional in the DOM, so
  // guard the listener — the counter still works if it's absent.
  if (resetButton) {
    resetButton.addEventListener("click", handleReset);
  }
})();
