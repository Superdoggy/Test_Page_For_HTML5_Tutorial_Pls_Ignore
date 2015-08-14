var pass = prompt('password?', '???');
while(pass != 'meep') { // I really don't care if this password is blatantly obvious but I'd like to have a little privacy whilst developing. :P
  pass = prompt('password?', '???');
}
var sprites = {
  player: {sx: 0, sy: 0, w: 37, h: 42},
  missile: {sx: 0, sy: 30, w: 2, h: 10}
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
  var board = new Gameboard();
  board.add(new player());
  Game.setSprite(2, board);
  Game.setSprite(1, new TitleScreen("Alien Invasion", "Started"));
}
var player = function() {
  this.w = Sprites.map['player'].w;
  this.h = Sprites.map['player'].h;
  this.x = Game.width / 2 - this.w / 2;
  this.y = Game.height - 10 - this.h;
  this.vx = 0;
  this.reloadTime = 0.25;
  this.reload = this.reloadTime;
  this.step = function(dtime) {
    if(Game.keys['right']) {
      this.vx += 1;
    }
    if(Game.keys['left']) {
      this.vx -= 1;
    }
    this.vx *= 0.9;
    this.x += this.vx * dtime * 50;
    if(this.x < 0) {
      this.x = 0;
    }
    if(this.x > Game.width - this.w) {
      this.x = Game.width - this.w;
      this.vx = 0;
    }
    this.reload -= dtime;
    if(Game.keys['space'] && this.reload < 0) {
      Game.keys['space'] = false;
      this.reload = this.reloadTime;
      this.board.add(new playermissile(this.x, this.y +this.h/2));
      this.board.add(new playermissile(this.x + this.w, this.y + this.h/2));
    }
  }
  this.draw = function(canvascontext) {
    Sprites.draw('player', this.x, this.y);
  }
}
var playermissile = function(x, y) {
  this.w = Sprites.map['missile'].w;
  this.h = Sprites.map['missile'].h;
  this.x = x - this.w / 2; //srsly that makes a 1px difference xD
  this.y = y - this.h;
  this.vy = -5;
}
playermissile.prototype.step = function(dtime) {
  this.y += this.vy;
  if(this.y < -this.h) {
    this.board.remove(this);
  }
}
playermissile.prototype.draw = function(canvascontext) {
  Sprites.draw(canvascontext, 'missile', this.x, this.y);
}











//lol
