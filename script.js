// Gummigoo Button Test — placeholder click behavior.
// Counts clicks and shows a confirmation so we can verify the button works.
(function () {
  "use strict";

  var button = document.getElementById("gummigoo-btn");
  var status = document.getElementById("status");

  if (!button || !status) {
    return;
  }

  var clickCount = 0;

  function handleActivate() {
    clickCount += 1;
    var times = clickCount === 1 ? "time" : "times";
    status.textContent = "Gummigoo! Clicked " + clickCount + " " + times + ".";
  }

  // A plain <button> already fires click on mouse, touch, Enter and Space,
  // so a single click listener covers keyboard activation too. Native buttons
  // also debounce their own activation, so rapid clicks each register cleanly
  // without double-firing.
  button.addEventListener("click", handleActivate);
})();
