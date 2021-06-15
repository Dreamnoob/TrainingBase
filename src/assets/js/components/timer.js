const deadline = '2021-06-18'; // день события

function getTimeRemaining(endtime) {

    const total = Date.parse(endtime) - Date.parse(new Date()); // оставшееся количество миллисекунд до события 

    const days = Math.floor(total / (1000 * 3600 * 24)); // оставшееся количество дней до события ( в 1 секунде 1000    милисекунд, 1 час - 3600 секунд, в сутках 24 часа)

    const hours = Math.floor((total / (1000 * 3600)) % 24); // оставшееся количество часов ( получаем оставшееся время в часах, вычитаем оттуда дни и остаються часи)

    const minutes = Math.floor((total / (1000 * 60)) % 60); // минуты 
    const seconds = Math.floor((total / 1000) % 60); // секунды

    return {
        'total': total,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
    };
}

function addZero(num) { // добавляет ноль к числу, если второе меньше 10
    if(num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timerId = setInterval(updateClock, 1000); // вызывает функцию каждую 1 секунду

    updateClock(); // вызов функции для избежания скачка, появления стандартных данних указанных в верстке(смотреть таймер на странице, отключив эту функцию)

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = addZero(t.days);
        hours.innerHTML = addZero(t.hours);
        minutes.innerHTML = addZero(t.minutes);
        seconds.innerHTML = addZero(t.seconds);

        if(t.total <= 0) {
            clearInterval(timerId);

            days.innerHTML = 0;
            hours.innerHTML = 0;
            minutes.innerHTML = 0;
            seconds.innerHTML = 0;

            console.log("Событие началось или уже прошло!!");
        }
    }
}

setClock('.timer', deadline);

