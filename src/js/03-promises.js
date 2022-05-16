import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onBtnCreateClick);

function onBtnCreateClick(e) {
  e.preventDefault();

  const data = {
    delay: Number(e.currentTarget.elements.delay.value),
    step: Number(e.currentTarget.elements.step.value),
    amount: Number(e.currentTarget.elements.amount.value),
  };

  let nextDelay = data.delay;

  for (let i = 1; i <= data.amount; i++) {
    createPromise(i, nextDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          timeout: 2000,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          timeout: 2000,
        });
      });

    nextDelay += data.step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
