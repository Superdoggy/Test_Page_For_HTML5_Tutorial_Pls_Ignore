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
    startGame();
}
function startGame() {
    var img = new Image();
    img.onload = function(){
        canvascontext.drawImage(img, 0, 0, 37, 43, 100, 100, 37, 43);
    }
    img.src = 'https://cloud.githubusercontent.com/assets/13082525/9018290/9c490a28-37ab-11e5-8c6f-71568956a3c3.png';
}
