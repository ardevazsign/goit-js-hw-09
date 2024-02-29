import { Notify } from "notiflix/build/notiflix-notify-aio";

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

    const form = document.querySelector('.form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const delay = parseInt(formData.get('delay'), 10);
      const step = parseInt(formData.get('step'), 10);
      const amount = parseInt(formData.get('amount'), 10);

      for (let i = 1; i <= amount; i++) {
        const currentDelay = delay + (step * (i - 1));
        createPromise(i, currentDelay)
          .then(({ position, delay }) => {
             Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
            Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          });
      }
    });





