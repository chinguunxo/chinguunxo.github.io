// VS Code Pets-style walking pixel cat mascot (blog page only).
(function () {
  var W = 20, H = 13, PX = 3;
  var COLORS = { o: '#3d2414', f: '#a9683f', e: '#1a1a1a', p: '#e8a0a0' };

  var FRAME_A = [
    '..............o..o..',
    '..............offo..',
    '.............oooooo.',
    '.............fffffo.',
    '..oo........offfffo.',
    '.of.........offfefo.',
    '.o..fooooooooffffpo.',
    '.f..offfffffofffffo.',
    '.of.offffffffoooooo.',
    '..ofoffffffffo......',
    '...ooffffffffo......',
    '....offoooooo.......',
    '.....oo.............'
  ];
  var FRAME_B = [
    '..............o..o..',
    '..............offo..',
    '.............oooooo.',
    '.............fffffo.',
    '..oo........offfffo.',
    '.of.........offfefo.',
    '.o..fooooooooffffpo.',
    '.f..offfffffofffffo.',
    '.of.offffffffoooooo.',
    '..ofoffffffffo......',
    '...ooffffffffo......',
    '....ooooooffo.......',
    '..........oo........'
  ];

  function buildFrame(rows) {
    var frame = document.createElement('div');
    frame.className = 'pixel-cat-frame';
    frame.style.gridTemplateColumns = 'repeat(' + W + ', ' + PX + 'px)';
    frame.style.gridTemplateRows = 'repeat(' + H + ', ' + PX + 'px)';
    rows.forEach(function (row) {
      for (var i = 0; i < row.length; i++) {
        var ch = row[i];
        var cell = document.createElement('div');
        if (ch !== '.') cell.style.background = COLORS[ch];
        frame.appendChild(cell);
      }
    });
    return frame;
  }

  function init() {
    var root = document.createElement('div');
    root.className = 'pixel-pet';
    root.setAttribute('aria-hidden', 'true');

    var bubble = document.createElement('div');
    bubble.className = 'pixel-pet-bubble';
    bubble.textContent = 'hi from my old buddy 小礼！';
    root.appendChild(bubble);

    var sprite = document.createElement('div');
    sprite.className = 'pixel-pet-sprite';
    var frameA = buildFrame(FRAME_A);
    var frameB = buildFrame(FRAME_B);
    frameA.classList.add('frame-visible');
    sprite.appendChild(frameA);
    sprite.appendChild(frameB);
    root.appendChild(sprite);

    document.body.appendChild(root);

    var spriteWidth = W * PX;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var x = 24;
    var dir = 1;
    var hovering = false;
    var pauseUntil = 0;
    var frameAcc = 0;
    var showingFrameB = false;

    root.style.left = x + 'px';

    function setDirection(d) {
      dir = d;
      sprite.style.transform = d === 1 ? 'scaleX(1)' : 'scaleX(-1)';
    }
    setDirection(1);

    function positionBubble() {
      var bubbleWidth = bubble.offsetWidth;
      var desired = x + spriteWidth / 2 - bubbleWidth / 2;
      var clamped = Math.min(Math.max(desired, 4), window.innerWidth - bubbleWidth - 4);
      bubble.style.left = clamped + 'px';
      bubble.style.transform = '';
    }

    root.addEventListener('mouseenter', function () { hovering = true; positionBubble(); });
    root.addEventListener('mouseleave', function () { hovering = false; });
    root.addEventListener('touchstart', function () {
      hovering = true;
      positionBubble();
      clearTimeout(root._touchTimer);
      root._touchTimer = setTimeout(function () { hovering = false; }, 2500);
    }, { passive: true });

    if (reduceMotion) return; // stay put; hover/focus bubble still works

    var SPEED = 26; // px/sec
    var last = performance.now();

    function tick(now) {
      var dt = now - last;
      last = now;
      var walking = !hovering && now > pauseUntil;

      if (walking) {
        x += dir * SPEED * (dt / 1000);
        var max = window.innerWidth - spriteWidth - 8;
        if (x >= max) { x = max; setDirection(-1); pauseUntil = now + 900; }
        else if (x <= 8) { x = 8; setDirection(1); pauseUntil = now + 900; }
        root.style.left = x + 'px';

        frameAcc += dt;
        if (frameAcc > 220) {
          frameAcc = 0;
          showingFrameB = !showingFrameB;
          frameA.classList.toggle('frame-visible', !showingFrameB);
          frameB.classList.toggle('frame-visible', showingFrameB);
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
