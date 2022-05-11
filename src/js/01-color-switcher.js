const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let idInterval = null;

btnStart.addEventListener('click', onBtnStart);
btnStop.addEventListener('click', onBtnStop);

btnStop.setAttribute('disabled', true);

function onBtnStart() {
  document.body.style.backgroundColor = `${getRandomHexColor()}`;

  idInterval = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);

  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
}

function onBtnStop() {
  clearInterval(idInterval);

  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
