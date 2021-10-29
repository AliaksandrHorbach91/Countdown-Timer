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
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('disable')
}



let countBg = 0;
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
        body.style.color='#000';
        document.querySelector('.weather__icon').classList.remove('inversion');
        btnChangeBg.classList.add('inversion');
    }
    if (hrs >= 12 && hrs < 18) {
        body.style.backgroundImage=`url(${bgObj.afternoon[countBg]})`;
        body.style.color='#000';
        document.querySelector('.weather__icon').classList.remove('inversion');
        btnChangeBg.classList.add('inversion');
    }
    if (hrs >= 18 && hrs < 24) {
        body.style.backgroundImage=`url(${bgObj.evening[countBg]})`;
        body.style.color='#fff';
        document.querySelector('.weather__icon').classList.add('inversion');
        btnChangeBg.classList.remove('inversion');
    }
    if (hrs >= 24 && hrs < 6) {
        body.style.backgroundImage=`url(${bgObj.night[countBg]})`;
        body.style.color='#fff';
        document.querySelector('.weather__icon').classList.add('inversion');
        btnChangeBg.classList.remove('inversion');
    }

    countBg++;
}

btnChangeBg.addEventListener('click', changeBg);

changeBg();
countdown();
setInterval(countdown, 1000);
setInterval(changeBg, 600000);
setTimeout(closePreloader, 3000);




fetch('http://api.openweathermap.org/data/2.5/weather?id=3081368&lang=en&appid=c43016557ce6a48d27caa09c7ba1557e')
.then(function (resp) {return resp.json() })
.then(function (data) {
    console.log(data)
    console.log(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    //добавляем название города
    document.querySelector('.weather__title').textContent = `${data.name}`;
    //Добавляем иконку погоды
    document.querySelector('.weather__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="ico">`;
    //data.main.temp содержит значение в Кельвинах, отнимаем от  273, чтобы получить значение в градусах Цельсия
    document.querySelector('.weather__temp').innerHTML = Math.round(data.main.temp - 273) + '&deg;C';
    //document.querySelector('.weather__temp-max').innerHTML = Math.round(data.main.temp_max - 273) + '&deg;C';
    //document.querySelector('.weather__temp-min').innerHTML = Math.round(data.main.temp_min - 273) + '&deg;C';
    //Добавляем описание погоды
    //document.querySelector('.weather__desc').textContent = data.weather[0]['description'];

    })
    .catch(function () {
        //Обрабатываем ошибки
    });