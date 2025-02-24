const refs = {
  form: document.querySelector(".form"),
  delay: document.querySelector('input[name="delay"]'),
};

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();
  let delayValue = Number(refs.delay.value);
  const btnState = document.querySelector('input[name="state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (btnState === "fulfilled") {
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    }, delayValue);
  });

  promise
    .then((delayValue) => {
      iziToast.success({
        message: `Fulfilled promise in ${delayValue} ms`,
        position: "topRight",
        backgroundColor: "#59A10D",
        messageColor: "white",
      });
    })
    .catch((delayValue) => {
      iziToast.error({
        message: `Rejected promise in ${delayValue} ms`,
        position: "topRight",
        backgroundColor: "#EF4040",
        messageColor: "white",
      });
    });

  e.target.reset();
});
