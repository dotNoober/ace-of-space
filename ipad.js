var ipad = navigator.userAgent.match(/iPad/i) !== null;

if (ipad) {
  document.addEventListener('DOMContentLoaded', function () {
    var leftControls = document.getElementById('left-controls');
    var rightControls = document.getElementById('right-controls');
    var bodyChildren = document.body.children;
    var gameContainer = document.getElementById('game-container');
    var canvas = document.getElementById('canvas');

    leftControls.style.display = 'block';
    rightControls.style.display = 'block';

    // Hide all body children
    for (var i = 0; i < bodyChildren.length; i++) {
      bodyChildren[i].style.display = 'none';
    }

    document.body.style.margin = '0px';
    document.body.style.background = 'black';
    document.body.insertBefore(gameContainer, document.body.firstChild);
    gameContainer.style.width = '1024px';
    gameContainer.style.marginTop = '26px';
    gameContainer.style.display = 'block';

    canvas.width = 1020;
    canvas.height = 660;
    canvas.style.background = 'white';
    canvas.style.margin = '0 1';

    var metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width; height=device-height; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;';
    document.head.insertBefore(metaViewport, document.head.firstChild);

    var controls = [leftControls, rightControls];

    controls.forEach(function (control) {
      control.addEventListener('touchstart', handleTouch);
      control.addEventListener('touchmove', handleTouch);
      control.addEventListener('touchend', handleTouch);
    });

    document.addEventListener('touchstart', function () {
      window.gameStart = true;
    });

    document.addEventListener('gesturestart', preventDefault);
    document.addEventListener('gesturechange', preventDefault);
    document.addEventListener('gestureend', preventDefault);
    document.addEventListener('touchstart', preventDefault);
    document.addEventListener('touchmove', preventDefault);
    document.addEventListener('touchend', preventDefault);

    function handleTouch(e) {
      if (e.type !== 'touchend') {
        for (var k in KEY_STATUS) {
          KEY_STATUS[k] = false;
        }
      }

      var touches = e.type === 'touchend' ? e.changedTouches : e.touches;

      for (var i = 0; i < touches.length; i++) {
        var ele = document.elementFromPoint(touches[i].pageX, touches[i].pageY);
        KEY_STATUS[ele.id] = (e.type !== 'touchend');
      }
    }

    function preventDefault(e) {
      e.preventDefault();
    }
  });
}

