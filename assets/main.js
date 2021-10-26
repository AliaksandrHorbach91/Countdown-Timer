const daysEl = document.querySelector("#days");
const hoursEl = document.querySelector("#hours");
const minsEl = document.querySelector("#mins");
const secondsEl = document.querySelector("#seconds");
const btnChangeBg = document.querySelector('.btn-img')

const newYears = `1 Jan ${(new Date).getFullYear() + 1}`;
const currentDate = new Date();

function countdown() {
    const newYearsDate = new Date(newYears);

    const totalSeconds = (newYearsDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.textContent = days;
    hoursEl.textContent = formatTime(hours);
    minsEl.textContent = formatTime(mins);
    secondsEl.textContent = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function closePreloader() {
    const preloader = document.querySelector('.preloder');
    preloader.classList.add('disable')
}



let countBg = 1;
function changeBg() {
    const body = document.querySelector('body');
    const imgWay = './assets/img/'
    let hrs = currentDate.getHours();

    bgObj = {
        morning:[`${imgWay}morning/0.jpg`, `${imgWay}morning/1.jpg`, `${imgWay}morning/2.jpg`,
                `${imgWay}morning/3.jpg`,`${imgWay}morning/4.jpg`,`${imgWay}morning/5.jpg`],
                
        afternoon:[`${imgWay}afternoon/0.jpg`, `${imgWay}afternoon/1.jpg`, `${imgWay}afternoon/2.jpg`,
                `${imgWay}afternoon/3.jpg`,`${imgWay}afternoon/4.jpg`,`${imgWay}afternoon/5.jpg`],

        evening:[`${imgWay}evening/0.jpg`, `${imgWay}evening/1.jpg`, `${imgWay}evening/2.jpg`,
                `${imgWay}evening/3.jpg`,`${imgWay}evening/4.jpg`,`${imgWay}evening/5.jpg`],
                
        night:[`${imgWay}night/0.jpg`, `${imgWay}night/1.jpg`, `${imgWay}night/2.jpg`,
                `${imgWay}night/3.jpg`,`${imgWay}night/4.jpg`,`${imgWay}night/5.jpg`],
    }

    if( countBg >= 6) {
        countBg = 0;
    }

    if (hrs >= 6 && hrs < 12) {
        body.style.backgroundImage=`url(${bgObj.morning[countBg]})`;
    }
    if (hrs >= 12 && hrs < 18) {
        body.style.backgroundImage=`url(${bgObj.afternoon[countBg]})`;
    }
    if (hrs >= 18 && hrs < 0) {
        body.style.backgroundImage=`url(${bgObj.evening[countBg]})`;
    }
    if (hrs >= 0 && hrs < 6) {
        body.style.backgroundImage=`url(${bgObj.night[countBg]})`;
    }

    countBg++;

}

btnChangeBg.addEventListener('click', changeBg);

changeBg();
countdown();
setInterval(countdown, 1000);
setTimeout(closePreloader, 3000);


