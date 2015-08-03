var pass = prompt('password?', '???');
while(pass != 'meep') { // I really don't care if this password is blatantly obvious but I'd like to have a little privacy whilst developing. :P
  pass = prompt('password?', '???');
}
var sprites = {
  player: {sx: 0, sy: 0, w: 37, h: 42}
};
var gameStart = function() {
  Sprites.load(sprites, function() {Sprites.draw("player", 0, 0);});   
}
Game.initialize(sprites, gameStart);
