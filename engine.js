var Starfield = new function() {
  this.initialize = function() {
    this.stars = [];
    this.starcanvas = document.createElement('canvas');
    this.starcanvas.width = Game.width;
    this.starcanvas.height = Game.height;
    this.starcanvascontext = starcanvas.getContext('2d');
    for(var i = 0; i < 250; i++) {
      var randomX = math.floor(math.random() * this.starcanvas.width);
      var randomY = math.floor(math.random() * this.starcanvas.height);
      var randomS = math.random() * 2 + 0.5;
      var alpha = randomS * 40 / 100;
      this.stars[i] = new Star(randomS, randomX, randomY, alpha);
    }
  }
  this.step = function(time) {
    var c = this.stars.length;
    for(var i = 0; i < c; i++) {
      this.stars[i].Y += this.stars[i].size * time;
      if(this.stars[i].Y > this.starcanvas.height) {
        var randomX = math.floor(math.random() * this.starcanvas.width);
        var randomS = math.random() * 2 + 0.5;
        var alpha = randomS * 40 / 100;
        this.stars[i] = new Star(randomS, randomX, 0, alpha);
      }
    }
  }
  this.draw = function() {
    this.starcanvascontext.fillStyle = "#000";
    this.starcanvascontext.fillRect(0, 0, this.starcanvas.width, this.starcanvas.height);
    var c = this.stars.length;
    this.starcanvascontext.fillStyle = "#FFF";
    for(var i = 0; i < c; i++) {
      this.starcanvascontext.globalAlpha = this.stars[i].alpha;
      this.starcanvascontext.fillRect(this.stars[i].X, this.stars[i].Y, this.stars[i].size, this.stars[i].size);
    }
  }
}
function Star(size, initX, initY, alpha) {
  this.size = size;
  this.X = initX;
  this.Y = initY;
  this.alpha = alpha;
}




var Game = new function() {
  this.initialize = function(spritedata, callback) {
    this.canvas = document.getElementById('game');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    
    this.canvascontext = this.canvas.getContext && this.canvas.getContext('2d');
    if(!this.canvascontext) {
      return alert('ye useless browser cannot render canvas');
    }
    this.setupInput();
    this.loop();
    Sprites.load(spritedata, callback);
  }
  var keycodes = {37: 'left', 39: 'right', 32: 'space'};
  this.keys = {};
  this.setupInput = function() {
    window.addEventListener('keydown', function(e) {
      if(keycodes[e.keyCode]) {
        Game.keys[keycodes[e.keyCode]] = true;
        e.preventDefault();
      }
    });
    window.addEventListener('keyup', function(e) {
      if(keycodes[e.keyCode]) {
        Game.keys[keycodes[e.keyCode]] = false;
        e.preventDefault();
      }
    });
  }
  var boards = [];
  this.loop = function() {
    var time = 30;
    for (var i = 0; i < boards.length; i++) {
      if(boards[i]) {
        boards[i].step(time / 1000);
        boards[i] && boards[i].draw(Game.canvascontext);
      }
    }
    setTimeout(Game.loop, time);
  };
  this.setSprite = function(i, sprite) {
    boards[i] = sprite;
  };
}
var Sprites = new function() {
  this.map = { };
  this.load = function(spriteData, callback) {
    this.map = spriteData;
    this.image = new Image();
    this.image.onload = callback;
    this.image.src = 'https://cloud.githubusercontent.com/assets/13082525/9018290/9c490a28-37ab-11e5-8c6f-71568956a3c3.png';
  };
  this.draw = function(spriteID, xpos, ypos, frameN) {
    var s = this.map[spriteID];
    if (!s) {
      window.alert('uhoh');
    }
    if (!frameN) {
     frameN = 0; 
    }
    Game.canvascontext.drawImage(this.image, s.sx + frameN * s.w, s.sy, s.w, s.h, xpos, ypos, s.w, s.h);
  };
}
