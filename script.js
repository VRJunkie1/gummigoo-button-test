// Gummigoo Button Test — placeholder click behavior.
// Counts clicks and shows a confirmation so we can verify the button works.
(function () {
  "use strict";

  var button = document.getElementById("gummigoo-btn");
  var status = document.getElementById("status");
  var resetButton = document.getElementById("reset-btn");

  if (!button || !status) {
    return;
  }

  var clickCount = 0;

  function handleActivate() {
    clickCount += 1;
    var times = clickCount === 1 ? "time" : "times";
    status.textContent = "Gummigoo! Clicked " + clickCount + " " + times + ".";
  }

  function handleReset() {
    clickCount = 0;
    status.textContent = "Counter reset. Click the button to start.";
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
