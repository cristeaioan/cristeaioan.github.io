var x = 0, y = 0,
    vx = 0, vy = 0,
    ax = 0, ay = 0,

    stop = true;

var sphere = document.getElementById("sphere"),

    home = document.getElementById("home"),
    obstacle1 = document.getElementById("obstacle1"),
    obstacle2 = document.getElementById("obstacle2"),
    obstacle3 = document.getElementById("obstacle3"),

    time = document.getElementById("time"),
    stopwatch = new Stopwatch(time),

    modalStart = document.getElementById("modal-start"),
    modalStop = document.getElementById("modal-stop"),
    buttonStart = document.getElementById("start"),
    buttonRestart = document.getElementById("restart");

window.addEventListener("devicemotion", on_device_motion);
function on_device_motion(event) {
    if( !stop ) {

        ax = -event.accelerationIncludingGravity.x * 5;
        ay = -event.accelerationIncludingGravity.y * 5;

        var landscapeOrientation = window.innerWidth / window.innerHeight > 1;
        if (landscapeOrientation) {
            vx = vx + ay;
            vy = vy + ax;
        } else {
            vx = vx + ax;
            vy = vy - ay;
        }
        vx = vx * 0.98;
        vy = vy * 0.98;
        y = parseInt(y + vy / 150);
        x = parseInt(x + vx / 150);

        if( detectCollision(home, sphere) ) {
            stopGame('success');
        }
        if( detectCollision(obstacle1, sphere) ) {
            stopGame('fail');
        }
        if( detectCollision(obstacle2, sphere) ) {
            stopGame('fail');
        }
        if( detectCollision(obstacle3, sphere) ) {
            stopGame('fail');
        }

        boundingBoxCheck();

        sphere.style.top = y + "px";
        sphere.style.left = x + "px";
    }
}

function detectCollision(a, b) {
    var aX = a.offsetLeft,
        aY = a.offsetTop,
        aWidth = a.clientWidth,
        aHeight = a.clientHeight,

        bX = b.offsetLeft,
        bY = b.offsetTop,
        bWidth = b.clientWidth,
        bHeight = b.clientHeight;

    if( ((aY + aHeight) < bY) ||
        (aY > (bY + bHeight)) ||
        ((aX + aWidth) < bX) ||
        (aX > (bX + bWidth)) ) {
        return false;
    }

    return true;
}

function boundingBoxCheck() {
    if ( x < 0 ) { x = 0; vx = -vx; }
    if ( y < 0 ) { y = 0; vy = -vy; }
    if ( x > document.documentElement.clientWidth - 20 ) { x = document.documentElement.clientWidth-20; vx = -vx; }
    if ( y>document.documentElement.clientHeight - 20 ) { y = document.documentElement.clientHeight-20; vy = -vy; }
}

function startGame() {
    modalStart.style.display = 'none';
    modalStop.style.display = 'none';
    resetGame();

    setTimeout(function () {
        stop = false;
        stopwatch.reset();
        stopwatch.start();
    }, 1000);
}

function stopGame(type) {
    stop = true;
    stopwatch.stop();

    if( type === 'success') {
        modalStop.getElementsByTagName("h1")[0].innerHTML = 'Felicitari!<br>Timpul efectuat este de ' + time.innerHTML;
    } else if ( type === 'fail') {
        modalStop.getElementsByTagName("h1")[0].innerHTML = 'Ai pierdut!<br>Incearca din nou!'
    }
    modalStop.style.display = 'flex';
}

function resetGame() {
    sphere.style.top = 0;
    sphere.style.left = 0;
    x = 0; y = 0;
    vx = 0; vy = 0;
    ax = 0; ay = 0;
}


buttonStart.addEventListener('click', startGame);
buttonRestart.addEventListener('click', startGame);