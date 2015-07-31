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
        canvascontext.drawImage(img, canvas.width / 2, canvas.height / 2, 18, 25, 100, 100, 18, 25);
    }
    img.src = 'https://cloud.githubusercontent.com/assets/13082525/9018290/9c490a28-37ab-11e5-8c6f-71568956a3c3.png';
}
