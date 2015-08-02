var Game = new function() {
  this.initialize = function(spritedata, callback) {
    this.canvas = document.getElementByID('game');
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
  this.setupInput = function() {
    
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
