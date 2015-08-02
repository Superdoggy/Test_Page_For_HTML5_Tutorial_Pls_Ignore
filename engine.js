var Game = new function() {
  this.initialize = function(spritedata, callback) {
    this.canvas = document.getElementById('game');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    
    this.canvascontext = this.canvas.getContext && canvas.getContext('2d');
    if(!canvascontext) {
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
      if(keycodes[event.keyCode]) {
        Game.keys[keycodes[event.keyCode]] = true;
        e.preventDefault();
      }
    });
    window.addEventListener('keyup', function(e) {
      if(keycodes[event.keyCode]) {
        Game.keys[keycodes[event.keyCode]] = false;
        e.preventDefault();
      }
    })
  }
  this.loop = function() {
    
  }
}
var Sprites = new function() {
  this.map = { };
  this.load = function(spriteData, callback) {
    this.map = spriteData;
    this.image = new Image();
    this.image.onload = callback;
    this.image.src = 'https://cloud.githubusercontent.com/assets/13082525/9018290/9c490a28-37ab-11e5-8c6f-71568956a3c3.png';
  };
  this.draw = function(canvascontext, spriteID, xpos, ypos, frameN) {
    var s = this.map[spriteID];
    if (!s) {
      window.alert('uhoh');
    }
    if (!frameN) {
     frameN = 0; 
    }
    canvascontext.drawImage(this.image, s.sx + frameN * s.w, s.sy, s.w, s.h, xpos, ypos, s.w, s.h);
  };
}
