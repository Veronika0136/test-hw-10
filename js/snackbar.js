const refs = {
  form: document.querySelector(".form"),
  delay: document.querySelector('input[name="delay"]'),
  inputFulfilled: document.querySelector("input[value=fulfilled]"),
  inputRejected: document.querySelector("input[value=rejected]"),
  btnSubmit: document.querySelector('button[type="submit"]'),
};
// console.dir(refs.inputFulfilled.checked);
// console.dir(refs.inputRejected.checked);

// let delayValue = Number(refs.delay.value);

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();
  let delayValue = Number(refs.delay.value);
  console.log(delayValue);
  console.dir(refs.inputFulfilled.checked);
  console.dir(refs.inputRejected.checked);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (refs.inputFulfilled.checked = true) {
        resolve(delayValue);
      } else {
        reject(delayValue);
      } 
    }, delayValue);
  });

  promise
    .then((delayValue) => {
      console.log(`✅ Fulfilled promise in ${delayValue} ms`);
    })
    .catch((delayValue) => {
      console.log(`❌ Rejected promise in ${delayValue} ms`);
    });

  e.target.reset();
});
