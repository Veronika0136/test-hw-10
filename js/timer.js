const refs = {
  btn: document.querySelector("[data-start]"),
  input: document.querySelector("#datetime-picker"),
  day: document.querySelector("span[data-days]"),
  hour: document.querySelector("span[data-hours]"),
  minute: document.querySelector("span[data-minutes]"),
  second: document.querySelector("span[data-seconds]"),
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
      userSelectedDate = selectedDates[0];

      refs.btn.classList.add("active");
      refs.btn.disabled = false;
    } else {
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        position: "topRight",
        backgroundColor: "#EF4040",
        titleColor: "white",
        messageColor: "white",
      });
      // window.alert("Please choose a date in the future");
    }
  },
};

flatpickr("#datetime-picker", options);

const timer = {
  intervalId: null,
  initTime: null,

  start() {
    this.initTime = userSelectedDate;
    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);

    refs.btn.disabled = true;
    refs.input.disabled = true;
  },

  stop() {
    clearInterval(this.intervalId);
    refs.input.disabled = false;
  },

  tick() {
    const currentTime = Date.now();
    const diff = this.initTime - currentTime;
    const time = convertMs(diff);
    refs.day.textContent = time.days;
    refs.hour.textContent = time.hours;
    refs.minute.textContent = time.minutes;
    refs.second.textContent = time.seconds;
    refs.btn.disabled = true;
    if (diff < 1000) {
      this.stop();
    }
  },
};

refs.btn.addEventListener("click", () => {
  timer.start();
  refs.btn.classList.remove("active");
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  value = value.toString().padStart(2, "0");

  return `${value}`;
}
