var Starfield = new function() {
  var stars = [];
  var starcanvas = document.getElementById('background');
  var starcanvascontext = starcanvas.getContext('2d');
  this.initialize = function() {
    starcanvas.width = Game.width;
    starcanvas.height = Game.height;
    for(var i = 0; i < 250; i++) {
      var randomX = Math.floor(Math.random() * starcanvas.width);
      var randomY = Math.floor(Math.random() * starcanvas.height);
      var randomS = Math.random() * 3 + 0.5;
      var alpha = randomS * 40 / 100;
      stars[i] = new Star(randomS, randomX, randomY, alpha);
    }
  }
  this.step = function(time) {
    var c = stars.length;
    for(var i = 0; i < c; i++) {
      stars[i].Y += stars[i].size * time * 30;
      if(stars[i].Y > starcanvas.height) {
        var randomX = Math.floor(Math.random() * starcanvas.width);
        var randomS = Math.random() * 3 + 0.5;
        var alpha = randomS * 40 / 100;
        stars[i].X = randomX;
        stars[i].Y = 0;
        stars[i].alpha = alpha;
        stars[i].size = randomS;
      }
    }
  }
  this.draw = function(ctx) {
    starcanvascontext.globalAlpha = 0.5;
    starcanvascontext.fillStyle = "#000";
    starcanvascontext.fillRect(0, 0, starcanvas.width, starcanvas.height);
    var c = stars.length;
    starcanvascontext.fillStyle = "#FFF";
    starcanvascontext.globalAlpha = 1;
    for(var i = 0; i < c; i++) {
      starcanvascontext.fillRect(stars[i].X, stars[i].Y, stars[i].size, stars[i].size);
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
    Sprites.clear();
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
  this.clear = function() {
    Game.canvascontext.clearRect(0, 0, Game.width, Game.height);
  }
  this.draw = function(spriteID, xpos, ypos, frameN) {
    var s = this.map[spriteID];
    if (!frameN) {
     frameN = 0; 
    }
    Game.canvascontext.drawImage(this.image, s.sx + frameN * s.w, s.sy, s.w, s.h, xpos, ypos, s.w, s.h);
  };
};
function TitleScreen(title, subtitle, callback) {
  this.step = function(dtime) {
    if(Game.keys['space'] && callback) {
      callback();
    }
  }
  this.draw = function(canvascontext) {
    canvascontext.fillStyle = "#FFF";
    canvascontext.textAlign = "center";
    canvascontext.font = "20px 'Press Start 2P'";
    canvascontext.fillText(title, Game.width/2, Game.height/2);
    canvascontext.font = "10px 'Press Start 2P'";
    canvascontext.fillText(subtitle, Game.width/2, Game.height/2 + 40);
  }
}
var Gameboard = function() {
  var board = this; //???
  this.objects = [];
  this.count = [];
  this.add = function(obj) {
    obj.board = this;
    this.objects.push(obj);
    this.count[obj.type] = (this.cnt[obj.type] || 0) + 1;
  }
  this.removeSelect = function(obj) {
    if(this.removed.indexOf(obj) != -1) {
      this.removed.push(obj);
    }
  }
  this.resetRemoved = function() {
    this.removed = [];
  }
  this.removeObjects = function() {
    for(var i = 0; i < this.removed.length; i++) {
      var index = this.objects.indexOf(this.removed[i]);
      if(index != -1) {
        this.count[this.removed[i].type]--;
        if(this.count[this.removed[i].type] == 0) {
          this.count.splice(this.count.indexOf(this.removed[i].type), 1);
        }
        this.objects.splice(index, 1);
      }
    }
  }
}









//nobody likes working right at the bottom of the page... :P or at least I don't. xD
