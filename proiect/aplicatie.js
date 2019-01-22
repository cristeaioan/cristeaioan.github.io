var x = 0, y = 0,
    vx = 0, vy = 0,
    ax = 0, ay = 0,
    stop = false;

var sphere = document.getElementById("sphere"),
    home = document.getElementById("home"),
    obstacle1 = document.getElementById("obstacle1"),
    obstacle2 = document.getElementById("obstacle2"),
    obstacle3 = document.getElementById("obstacle3");


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
        y = parseInt(y + vy / 400);
        x = parseInt(x + vx / 400);

        boundingBoxCheck();

        detectCollision(home,sphere);

        detectCollision(obstacle1,sphere);
        detectCollision(obstacle2,sphere);
        detectCollision(obstacle3,sphere);

        sphere.style.top = y + "px";
        sphere.style.left = x + "px";
    }
}

function detectCollision(a, b){
    var aX = a.offsetLeft,
        aY = a.offsetTop,
        aWidth = a.clientWidth,
        aHeight = a.clientHeight,

        bX = b.offsetLeft,
        bY = b.offsetTop,
        bWidth = b.clientWidth,
        bHeight = b.clientHeight;

    if( !( ((aY + aHeight) < bY) ||
        (aY > (bY + bHeight)) ||
        ((aX + aWidth) < bX) ||
        (aX > (bX + bWidth))) ) {
        stop = true;
    }
}

function boundingBoxCheck(){
    if ( x < 0 ) { x = 0; vx = -vx; }
    if ( y < 0 ) { y = 0; vy = -vy; }
    if ( x > document.documentElement.clientWidth - 20 ) { x = document.documentElement.clientWidth-20; vx = -vx; }
    if ( y>document.documentElement.clientHeight - 20 ) { y = document.documentElement.clientHeight-20; vy = -vy; }
}