(function () {
  "use strict";

  var STORAGE_KEY = "chai_birthday_celebration_count_v1";
  /** 点击按钮时随机从中选图，升起动画在 styles.css 的 .balloon / @keyframes rise */
  /** 来自「气球 png.zip」解压后的四张素材（assets/balloon-cyx-1..4.png） */
  var BALLOON_SRC_LIST = [
    "assets/balloon-cyx-1.png",
    "assets/balloon-cyx-2.png",
    "assets/balloon-cyx-3.png",
    "assets/balloon-cyx-4.png",
  ];

  var btn = document.getElementById("celebrateBtn");
  var countEl = document.getElementById("countNum");
  var layer = document.getElementById("balloonLayer");

  function readCount() {
    var raw = localStorage.getItem(STORAGE_KEY);
    var n = parseInt(raw, 10);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }

  function writeCount(n) {
    localStorage.setItem(STORAGE_KEY, String(n));
  }

  function renderCount(n) {
    countEl.textContent = String(n);
  }

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function spawnBalloons() {
    var count = Math.floor(randomBetween(4, 8));

    for (var i = 0; i < count; i++) {
      var img = document.createElement("img");
      var src =
        BALLOON_SRC_LIST[Math.floor(Math.random() * BALLOON_SRC_LIST.length)];
      img.className = "balloon";
      img.alt = "";
      img.decoding = "async";
      img.loading = "lazy";
      img.src = src;
      img.addEventListener(
        "error",
        function () {
          if (img.parentNode) img.parentNode.removeChild(img);
        },
        { once: true }
      );

      var leftPct = randomBetween(4, 92);
      img.style.left = leftPct + "%";

      var drift = randomBetween(-42, 42);
      img.style.setProperty("--drift", drift + "px");

      var delay = randomBetween(0, 0.35);
      img.style.animationDelay = delay + "s";

      var dur = randomBetween(7.5, 11);
      img.style.animationDuration = dur + "s";

      var w = randomBetween(60, 115);
      img.style.width = w + "px";

      layer.appendChild(img);

      window.setTimeout(function (node) {
        if (node && node.parentNode) node.parentNode.removeChild(node);
      }, Math.ceil((dur + delay + 0.5) * 1000), img);
    }
  }

  var current = readCount();
  renderCount(current);

  btn.addEventListener("click", function () {
    current += 1;
    writeCount(current);
    renderCount(current);
    spawnBalloons();
  });
})();
