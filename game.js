var pass = prompt('password?', '???');
while(pass != 'meep') { // I really don't care if this password is blatantly obvious but I'd like to have a little privacy whilst developing. :P
    pass = prompt('password?', '???');
}
var canvas = document.getElementById('game');
var canvascontext = canvas.getContext && canvas.getContext('2d');
if(!canvascontext) {
    alert('Pls upgrade browser');
}
else {
    Sprites.load({
        player: {sx: 0, sy: 0, w: 37, h: 42}
    }, function() {Sprites.draw(canvascontext, "player", 0, 0);});
}
