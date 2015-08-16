var pass = prompt('password?', '???');
while(pass != 'meep') { // I really don't care if this password is blatantly obvious but I'd like to have a little privacy whilst developing. :P
  pass = prompt('password?', '???');
}
var Playertype = 1;
var Playerprojectiletype = 2;
var Enemytype = 4;
var Enemyprojectiletype = 8;
var Poweruptype = 16;
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
player.prototype.type = Playertype;
var playermissile = function(x, y) {
  this.w = Sprites.map['missile'].w;
  this.h = Sprites.map['missile'].h;
  this.x = x - this.w / 2; //srsly that makes a 1px difference xD
  this.y = y - this.h;
  this.vy = -20;
}
playermissile.prototype.step = function(dtime) {
  this.y += this.vy;
  if(this.y < -this.h) {
    this.board.removeSelect(this);
  }
}
playermissile.prototype.draw = function(canvascontext) {
  Sprites.draw('missile', this.x, this.y);
}
playermissile.prototype.type = Playerprojectiletype;

var enemy = function(blueprint, override) {
  var base = {A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0};
  for (var property in base) {
    this[property] = base[property];
  }
  for (var property in blueprint) {
    this[property] = blueprint[property];
  }
  if(override) {
    for (var property in override) {
      this[property] = override[property];
    }
  }
  this.w = Sprites.map[this.sprite].w;
  this.h = Sprites.map[this.sprite].h;
  this.time = 0;
}
enemy.prototype.step = function(dtime) {
  this.time += dtime;
  this.vx = this.A + this.B * Math.sin(this.C * this.time + this.D);
  this.vy = this.E + this.F * Math.sin(this.G * this.time + this.H);
  this.x += this.vx * dtime;
  this.y += this.vy * dtime;
  if (this.y > Game.height) {
    this.board.removeSelect(this);
  }
}
enemy.prototype.draw = function(canvascontext) {
  Sprites.draw(this.sprite, this.x, this.y);
}











//lol
