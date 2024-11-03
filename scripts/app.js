let statusPomodoro = {
    count: 0,
    work: true,
};

window.addEventListener('load', () => {
    // получаем элементы и объявляем таймер ID
    const info = document.querySelector('.info');
    const time = document.querySelector('.time');
    const timer = document.querySelector('.timer');
    const start = document.querySelector('.start-time');
    const restart = document.querySelector('.restart');
    const skip = document.querySelector('.skip');
    time.innerText = '25:00';
    info.innerText = `ПОМИДОР ${statusPomodoro.count + 1}`;
    let intervalID;
    let milliseconds;
    let hiddenAnimation;

    let audio = new Audio('../source/alert.mp3');

    let stateTimer = {
        work: function() {
            document.body.classList.remove("rest");
            timer.classList.remove("timer-rest");
            info.innerText = `ПОМИДОР ${statusPomodoro.count + 1}`;
            time.innerText = '25:00';
            updateClock(1500000);
        },
        rest: function() {
            document.body.classList.add("rest");
            timer.classList.add("timer-rest");
            statusPomodoro.work = false;
            statusPomodoro.count += 1;
            if (statusPomodoro.count % 4 === 0) {
                info.innerText = 'СДЕЛАЙТЕ ДЛИННЫЙ ПЕРЕРЫВ';
                time.innerText = '15:00';
                updateClock(900000);
            } else {
                info.innerText = 'СДЕЛАЙТЕ КОРОТКИЙ ПЕРЕРЫВ';
                time.innerText = '5:00';
                updateClock(300000);
            }
        }
    }

    function updateClock(value) {
        milliseconds = value;

        intervalID = setInterval(() => {
            milliseconds -= 1000;
            let sec = (milliseconds / 1000) % 60;
            let min = Math.floor(milliseconds / 1000 / 60);

            if (sec < 10) {
                sec = '0' + sec;
            }

            if (min < 10) {
                min = '0' + min;
            }

            time.innerText = `${min}:${sec}`;

            if (milliseconds <= 0) {
                audio.play()
                clearInterval(intervalID);
                if (statusPomodoro.work) {
                    // при отдыхе
                    stateTimer.rest();
                   
                } else if (!statusPomodoro.work) {
                    statusPomodoro.work = true;
                    // при работе
                    stateTimer.work();
                }
            };
        }, 1000)
    }

    start.addEventListener('click', (event) => {
        // при клике на START
        if (event.target.innerText === 'START') {
            start.innerHTML = '<i class="fa-solid fa-pause"></i>PAUSE';
            updateClock(1500000);

            // при клике на PAUSE
        } else if (event.target.innerText === 'PAUSE') {
            start.innerHTML = '<i class="fa-solid fa-play"></i>RESUME';
            clearInterval(intervalID);
            hiddenAnimation = setInterval(() => {
                time.classList.toggle('hidden');
            }, 600)
            

            // при клике на RESUME
        } else if (event.target.innerText === 'RESUME') {
            start.innerHTML = '<i class="fa-solid fa-pause"></i>PAUSE';
            clearInterval(hiddenAnimation);
            time.classList.remove('hidden');
            updateClock(milliseconds);
           
        }
    });

    restart.onclick = () => {
        start.innerHTML = '<i class="fa-solid fa-play"></i>START';
        time.innerText = '25:00';
        statusPomodoro.count = 0;
        statusPomodoro.work = true;
        document.body.classList.remove('rest');
        timer.classList.remove('timer-rest');
        info.innerText = `ПОМИДОР ${statusPomodoro.count + 1}`;
        time.classList.remove('hidden');
        clearInterval(intervalID);
        clearInterval(hiddenAnimation);
    };

    skip.onclick = () => {
        milliseconds = 0;
    }

});
