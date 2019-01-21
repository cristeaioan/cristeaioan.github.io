var x = 0, y = 0,
    vx = 0, vy = 0,
    ax = 0, ay = 0,
    stop = false;

var sphere = document.getElementById("sphere"),
    home = document.getElementById("home");

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
        y = parseInt(y + vy / 50);
        x = parseInt(x + vx / 50);

        boundingBoxCheck();

        reachedHome();

        sphere.style.top = y + "px";
        sphere.style.left = x + "px";
    }

}

function reachedHome(){
    var x1,x2,x3,x4;
    x1 = home.offsetLeft;
    x2 = home.offsetLeft + 60;
    x3 = home.offsetTop;
    x4 = home.offsetTop + 60;
    console.log(x1+ " " + x2 + " " + x3 + " " + x4 );

    var A = [x1,x3],
        B = [x2,x3],
        C = [x2,x4],
        D = [x1,x4];

    if( (x === A[0] && y === A[1]) ||
        (x === B[0] && y === B[1]) ||
        (x === C[0] && y === C[1]) ||
        (x === D[0] && y === D[1])){
        stop = true;
    }

}

function boundingBoxCheck(){
    if ( x < 0 ) { x = 0; vx = -vx; }
    if ( y < 0 ) { y = 0; vy = -vy; }
    if ( x > document.documentElement.clientWidth - 20 ) { x = document.documentElement.clientWidth-20; vx = -vx; }
    if ( y>document.documentElement.clientHeight - 20 ) { y = document.documentElement.clientHeight-20; vy = -vy; }
}