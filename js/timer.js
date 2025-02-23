const refs = {
  btn: document.querySelector("[data-start]"),
  input: document.querySelector('#datetime-picker'),
  day: document.querySelector('span[data-days]'),
  hour: document.querySelector('span[data-hours]'),
  minute: document.querySelector('span[data-minutes]'),
  second: document.querySelector('span[data-seconds]'),
};

refs.btn.disabled = true;
let userSelectedDate = "";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      userSelectedDate = selectedDates[0]
      console.log(userSelectedDate);
      refs.btn.classList.add("active");
      refs.btn.disabled = false;
      
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor:'#EF4040',
        titleColor:'white',
        messageColor:'white',
    });
      // window.alert("Please choose a date in the future");
    };
  },
};

flatpickr("#datetime-picker", options);

const timer = {
  intervalId: null,
  initTime: null,

  start() {
    console.log("start");
    this.initTime = userSelectedDate;
    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);

    refs.btn.disabled = true;
    refs.input.disabled = true;
  },

  stop() {
    console.log("stop");
    clearInterval(this.intervalId);
    refs.btn.disabled = false;
    refs.input.disabled = false;
    
  },

  tick() {
    const currentTime = Date.now();
    const diff = this.initTime - currentTime;
    const time = convertMs(diff);
    const resultTime = timeToStr(time);
    let arrTime = resultTime.split(' ');
    console.log(resultTime);
    console.log(arrTime);
    refs.day.textContent = arrTime[0];
    refs.hour.textContent = arrTime[1];
    refs.minute.textContent = arrTime[2];
    refs.second.textContent = arrTime [3];
    
    

    if (diff < 1000) {
      this.stop();
    }
  },
};

refs.btn.addEventListener("click", () => {
  timer.start();
  refs.btn.classList.remove("active");
  refs.btn.disabled = true;
  

});

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

function timeToStr({days, hours, minutes, seconds }){
  days = days.toString().padStart(2,"0");
  hours = hours.toString().padStart(2,"0");
  minutes = minutes.toString().padStart(2,"0");
  seconds = seconds.toString().padStart(2,"0");

  return `${days} ${hours} ${minutes} ${seconds}`;
}

