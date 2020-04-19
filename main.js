import { endpoint, apiKey } from "./modules/settings";
window.addEventListener("load", init);

function init() {
  setupForm();
  getMovies();
}
function setupForm() {
  const form = document.querySelector("form");
  window.form = form;
  const elements = form.elements;
  window.elements = elements;
  //console.log(elements);

  //elements.genre.setAttribute("disabled", true);

  //elements.unknown.addEventListener("click", (e) => {
  //elements.tagline.disabled = !elements.tagline.disabled;
  //});
  window.addEventListener("load", (e) => {
    elements.title.focus();
  });

  //form.setAttribute("novalidate", true);
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
    const errorContainerRating = form.querySelector("fieldset p");
    if ((checked.length = 0)) {
      validForm = false;
      errorContainerRating.classList.remove("hidden");
    } else {
      errorContainerRating.classList.add("hidden");
    }
    if (form.checkValidity() && validForm) {
      //send to rest db
      postMovie({
        title: form.elements.title.value,
        genre: form.elements.genre.value,
        rating: form.elements.rating.value,
        tagline: checked.map((el) => el.value),
      });
      console.log("submit rdy");
      form.reset();
    } else {
      formElements.forEach((el) => {
        if (!el.checkValidity()) {
          el.classList.add("invalid");
        }
      });
    }

    console.log("submitted");
  });
}
function postMovie(payload) {
  const postData = JSON.stringify(payload);
  fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function getMovies() {
  fetch(endpoint, {
    method: "get",
    headers: {
      accept: "application/json",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then((data) => data.forEach(showMovie));
}
const template = document.querySelector("template").content;
const movieContainer = document.querySelector("#movie-list");
function showMovie(movie) {
  const clone = template.cloneNode(true);
  clone.querySelector("h2").textContent = movie.title;
  clone.querySelector("h3").textContent = movie.genre;
  clone.querySelector("span.template-rating").textContent = movie.rating;
  movieContainer.appendChild(clone);
}
