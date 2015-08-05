var pass = prompt('password?', '???');
while(pass != 'meep') { // I really don't care if this password is blatantly obvious but I'd like to have a little privacy whilst developing. :P
  pass = prompt('password?', '???');
}
var sprites = {
  player: {sx: 0, sy: 0, w: 37, h: 42}
};
var gameStart = function() {
  Starfield.initialize();
  Game.setSprite(0, Starfield);
  Game.setSprite(1, new TitleScreen("Alien Invasion", "Press space to start playing", playGame));
}
window.addEventListener('load', function() {
  Game.initialize(sprites, gameStart);
});
var playGame = function() {
  window.alert(Sprites.map['player']);
  Game.setSprite(1, new TitleScreen("Alien Invasion", "Started"));
  Game.setSprite(2, new player());
}
var player = function() {
  this.w = 18;
  this.h = 35;
  this.x = Game.width / 2 - this.w / 2;
  this.y = Game.height - 10 - this.h;
  this.vx = 0;
  this.step = function(dtime) {
    if(Game.keys['right']) {
      this.vx += 1;
    }
    if(Game.keys['left']) {
      this.vx -= 1;
    }
    this.vx *= 0.9;
    this.x += this.vx;
    if(this.x < 0) {
      this.x = 0;
    }
    if(this.x > Game.width - this.w) {
      this.x = Game.width - this.w;
    }
  }
  this.draw = function(canvascontext) {
    Sprites.draw(canvascontext, 'player', this.x, this.y);
  }
}
