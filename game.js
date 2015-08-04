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
  Game.setSprite(1, new TitleScreen("Alien Invasion", "Started"));
}
