document.addEventListener("DOMContentLoaded", function() {
    let startstop = document.getElementById("start");
    let reset = document.getElementById("reset");
    let lap = document.getElementById("lap");
    let time = document.getElementById("time");
    let running = false;


    let startTime =0;
    let elapsedTime = 0;
    let interval;

    startstop.addEventListener("click", startStop);
    reset.addEventListener("click",resetTimer);
    lap.addEventListener("click",lapFunction);

    function startStop() {
        if (running == false) {
            start();
        } else {
            stop();
        }
    }

    function start() {
        startTime= Date.now() - elapsedTime;
        interval = setInterval(updateDisplay,10);
        startstop.textContent = 'Stop';
        running = true;
    }

    function stop() {
        clearInterval(interval);
        startstop.textContent = 'Start';
        running = false;
    }
    function resetTimer(){
        clearInterval(interval);
        time.textContent = "00:00:00.00";
        elapsedTime = 0;
        running= false;
        startstop.textContent = "Start";

        document.querySelector(".laps-list").innerHTML = "";
    }
    function updateDisplay(){
        elapsedTime = Date.now() - startTime;
        const ms = Math.floor((elapsedTime%1000)/10);
        const totalseconds = Math.floor(elapsedTime/1000);
        const hours = Math.floor(totalseconds/3600);
        const min = Math.floor((totalseconds%3600)/60);
        const seconds = Math.floor((totalseconds%3600)%60);

        time.textContent = `${pad(hours)}:${pad(min)}:${pad(seconds)}.${pad(ms)}`;

        return `${pad(hours)}:${pad(min)}:${pad(seconds)}.${pad(ms)}` ;
    }
    function pad(number) {
        return number.toString().padStart(2,'0');
    }
    function lapFunction(){

        if(!running){
            return;
        }
        document.querySelector(".laps").style.display = "block";
        let x= document.createElement("li");
        x.textContent = updateDisplay();
        document.querySelector(".laps-list").appendChild(x);
    }
});
