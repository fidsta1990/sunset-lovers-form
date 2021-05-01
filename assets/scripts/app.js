// SELECTORS
const body = document.body;
const slides = document.querySelectorAll(".slide");
const arrow = document.getElementById("arrow");
const dots = document.querySelectorAll(".dot");
const form = document.getElementById("form");
const loginBtn = document.querySelector(".login");
const error = document.getElementById("error");
let activeSlide = 0;
let activeDot = 0;
let store = [];

// FUNCTIONS
body.style.background = "#444";
// background change
const setBodyBackground = () => {
  let windowWidth = window.innerWidth;
  let widthUp = 768;
  let widthDown = 767;



  if (windowWidth >= widthUp) {
    body.style.background = slides[activeSlide].style.backgroundImage;
  }

  if (window.innerWidth <= widthDown) {
    body.style.background = "#444";
  }
};

// set active slide
const setActiveSlide = () => {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[activeSlide].classList.add("active");
};

const setActiveDot = () => {
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[activeDot].classList.add("active");
};

const nextSlide = () => {
  activeSlide++;
  let slidesLength = slides.length;

  if (activeSlide > slidesLength - 1) {
    activeSlide = 0;
  }

  setBodyBackground();
  setActiveSlide();
};

const nextDot = () => {
  activeDot++;
  let dotLength = dots.length;

  if (activeDot > dotLength - 1) {
    activeDot = 0;
  }

  setActiveDot();
};

const validate = (value1, value2) => {
  let val1 = value1.value;
  let val2 = value2.value;

  if (
    (!val1.includes("@") && !val1.includes(".com")) ||
    (!val1.includes(".co") && !val1.includes("uk"))
  ) {
    error.textContent = "Invalid email, try again";
    const timer = setTimeout(() => {
      error.textContent = "";
    }, 3000);

    return () => clearTimeout(timer);
  } else if (!val2) {
    error.textContent = "Please enter a password.";

    const timer = setTimeout(() => {
      error.textContent = "";
    }, 3000);

    return () => clearTimeout(timer);
  } else {
    error.style.color = "limegreen";
    error.textContent = "All done";
    const timer = setTimeout(() => {
      error.textContent = "";
    }, 3000);

    return () => clearTimeout(timer);
  }
};

const handleChange = (e) => {
  let value1 = e.target.elements.email;
  let value2 = e.target.elements.password;
  validate(value1, value2);

  if (value1.value && value2.value) {
    store.push({ value1: value1, value2: value2 });

    value1.value = "";
    value2.value = "";
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  handleChange(e);
};

// EVENT LISTENERS

// window background change
window.addEventListener("resize", setBodyBackground);

// button click event to start slide
arrow.addEventListener("click", () => {
  nextSlide();
  nextDot();
});

form.addEventListener("submit", handleSubmit);
