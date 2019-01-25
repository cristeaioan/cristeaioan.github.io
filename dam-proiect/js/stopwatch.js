class Stopwatch {

    constructor(display) {
        this.display = display;
        this.minutes = 0;
        this.seconds = 0;
        this.miliseconds = 0;
        this.interval = undefined;
    }

    start() {
        var that = this,
            displayMinutes,
            displaySeconds,
            displayMiliseconds;

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

            displayMinutes = that.minutes < 10 ? '0' + that.minutes : that.minutes;
            displaySeconds = that.seconds < 10 ? '0' + that.seconds : that.seconds;
            displayMiliseconds = that.miliseconds < 10 ? '00' + that.miliseconds : that.miliseconds;
            if( that.miliseconds > 9 && that.miliseconds < 100 ) {
                displayMiliseconds = '0' + that.miliseconds;
            }

            that.display.innerHTML = displayMinutes + ':' + displaySeconds + ':' + displayMiliseconds;

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