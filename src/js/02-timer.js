import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
let idInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] - Date.now() < 0) {
      Notify.failure('Please choose a date in the future', {
        timeout: 2000,
      });
    } else {
      selectedDate = selectedDates[0];
      refs.btnStart.removeAttribute('disabled');
    }
  },
};

refs.btnStart.setAttribute('disabled', true);

flatpickr(refs.datetimePicker, options);

refs.btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  refs.datetimePicker.setAttribute('disabled', true);
  refs.btnStart.setAttribute('disabled', true);
  idInterval = setInterval(updateDatetime, 1000);
}

function updateDatetime() {
  const deltaMs = selectedDate - Date.now();

  if (deltaMs <= 0) {
    clearInterval(idInterval);
    return;
  }

  const remainingTime = convertMs(deltaMs);

  refs.days.textContent = addLeadingZero(remainingTime.days);
  refs.hours.textContent = addLeadingZero(remainingTime.hours);
  refs.minutes.textContent = addLeadingZero(remainingTime.minutes);
  refs.seconds.textContent = addLeadingZero(remainingTime.seconds);
}

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

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}
