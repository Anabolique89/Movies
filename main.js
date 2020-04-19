import { endpoint, apiKey } from "./modules/settings";

const form = document.querySelector("form");
window.form = form;
const elements = form.elements;
window.elements = elements;
elements.rating.value = 5;
console.log(elements);

//elements.genre.setAttribute("disabled", true);

elements.unknown.addEventListener("click", (e) => {
  elements.tagline.disabled = !elements.tagline.disabled;
});
window.addEventListener("load", (e) => {
  elements.title.focus();
});
elements.title.addEventListener("keyup", (e) => {
  document.querySelector("h2").textContent = e.target.value;
});
form.setAttribute("novalidate", true);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //test
  let validForm = true;
  const formElements = form.querySelectorAll("input");
  formElements.forEach((el) => {
    el.classList.remove("invalid");
  });
  const cbs = [...form.querySelectorAll(`[title=rating]`)];
  const checked = cbs.filter((el) => el.checked);
  if (checked.length === 0) {
    validForm = false;
  } else {
  }
  if (form.checkValidity() && validForm) {
    //send to rest db
    console.log("submit rdy");
  } else {
    formElements.forEach((el) => {
      if (!el.checkValidity()) {
        el.classList.add("invalid");
      }
    });
  }

  console.log("submitted");
});

//1.remove all error messages
//2.loop through
//3.show error messages
//4. create with js /
//5. have them in the dom hide/show
