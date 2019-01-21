var x = 0, y = 0,
    vx = 0, vy = 0,
    ax = 0, ay = 0;

var sphere = document.getElementById("sphere");

window.addEventListener("devicemotion", on_device_motion);

function on_device_motion(event) {
    ax = -event.accelerationIncludingGravity.x * 5;
    ay = -event.accelerationIncludingGravity.y * 5;

    var landscapeOrientation = window.innerWidth / window.innerHeight > 1;
    if ( landscapeOrientation) {
        vx = vx + ay;
        vy = vy + ax;
    } else {
        vx = vx + ax;
        vy = vy - ay;
    }
    vx = vx * 0.98;
    vy = vy * 0.98;
    y = parseInt(y + vy / 50);
    x = parseInt(x + vx / 50);

    boundingBoxCheck();

    sphere.style.top = y + "px";
    sphere.style.left = x + "px";
}


function boundingBoxCheck(){
    if ( x < 0 ) { x = 0; vx = -vx; }
    if ( y < 0 ) { y = 0; vy = -vy; }
    if ( x > document.documentElement.clientWidth - 20 ) { x = document.documentElement.clientWidth-20; vx = -vx; }
    if ( y>document.documentElement.clientHeight - 20 ) { y = document.documentElement.clientHeight-20; vy = -vy; }
}