class Stopwatch {

    constructor(display) {
        this.display = display;
        this.minutes = 0;
        this.seconds = 0;
        this.miliseconds = 0;
        this.interval = undefined;
    }

    start() {
        var that = this;

        that.interval = setInterval(function () {

            that.miliseconds++;
            if( that.miliseconds === 100 ) {
                that.miliseconds = 0;

                that.seconds++;
                if( that.seconds === 60 ) {
                    that.seconds = 0;

                    that.minutes++;
                }
            }

            that.display.innerHTML = that.minutes + ':' + that.seconds + ':' + that.miliseconds;

        }, 10);
    }

    stop() {
        clearInterval(this.interval);
    }

    reset() {
        this.minutes = 0;
        this.seconds = 0;
        this.miliseconds = 0;
        this.interval = undefined;
    }

}