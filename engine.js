var Sprites = new function() {
  this.map = {};
  this.load = function(spriteData, callback) {
    this.map = spriteData;
    this.image = new Image();
    this.image.onload = callback;
    this.image.src = 'https://cloud.githubusercontent.com/assets/13082525/9018290/9c490a28-37ab-11e5-8c6f-71568956a3c3.png';
  };
  this.draw = function(canvascontext, spriteID, xpos, ypos, frameN) {
    var spriteInfo = this.map[spriteID];
    if (!spriteInfo) {
      window.alert('uhoh');
    }
    if (!frameN) {
     frameN = 0; 
    }
    canvascontext.drawImage(this.image, spriteInfo.sx + frameN * spriteInfo.w, spriteInfo.sy, spriteInfo.w, spriteInfo.h, xpos, ypos, spriteInfo.w, spriteInfo.h);
  };
}
