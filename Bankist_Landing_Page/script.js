'use strict';
// Force window to always reload on top
window.onbeforeunload = function () {
  window.scrollTo(0,0);
};

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// PAGE NAVIGATION
btnScrollTo.addEventListener("click", function(){
  section1.scrollIntoView({behavior: "smooth"});
})

document.querySelector(".nav__links").addEventListener("click", function (event){
  event.preventDefault();
  if(event.target.classList.contains("nav__link")){
    const id = event.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({behavior:"smooth"});
  }
}); 


// TABBED COMPONENT
tabsContainer.addEventListener("click", function(event){
  event.preventDefault();
  const clicked = event.target.closest(".operations__tab");

 if (!clicked) return;
  tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach(content => content.classList.remove("operations__content--active"));
  clicked.classList.add("operations__tab--active");

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// MENU FADE ANIMATION
const handleHover = function(event) {
  if(event.target.classList.contains("nav__link")) {
    const link = event.target;
    // select all children elements that are in list
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(elem => {
      if (elem !== link)
        elem.style.opacity = this;
      logo.style.opacity = this;
    })
  }
}

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));


// STICKY NAVIGATION
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
  const [entry] = entries; // == entries[0]
  if(!entry.isIntersecting) 
    nav.classList.add("sticky");
  else 
    nav.classList.remove("sticky");
}

const headerObserver = new IntersectionObserver(stickyNav,
  {
    root:null, 
    threshold: 0,
    rootMargin : `-${navHeight}px`
  }); 
headerObserver.observe(header);

// REVEAL SECTIONS
const allSections = document.querySelectorAll('.section'); 

const revealSection = function(entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(
  revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
})

//LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll("img[data-src]"); 


const loadImg = function(entries, observer){
  const [entry] = entries; 

  if(!entry.isIntersecting) return; 

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function() {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "+200px"
});

imgTargets.forEach(img => imgObserver.observe(img))

// SLIDER
const slides = document.querySelectorAll(".slide");

// Slider buttons
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
let currentSlide = 0;
const maxSlide = slides.length; 
const dotContainer = document.querySelector(".dots");

const nextSlide = function(){
  if (currentSlide === maxSlide - 1){
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = function(){
  if (currentSlide === 0){
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

// Event handlers
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener('keydown', function(event){
  if(event.key === 'ArrowLeft') prevSlide();
  event.key === "ArrowRight" && nextSlide()
});

const goToSlide = function(slide) {
  slides.forEach((sld, index) => sld.style.transform = `translateX(
    ${100 * (index - slide)}%
    )`)
}

const createDots = function(){
  slides.forEach(function(_, index) {
    dotContainer.insertAdjacentHTML("beforeend", 
    `<button class="dots__dot" data-slide="${index}"></button>`
    );

  })
}

dotContainer.addEventListener("click", function(event){
  if(event.target.classList.contains("dots__dot")) {
    const {slide} = event.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

const activateDot = function (slide){
  document.querySelectorAll(".dots__dot").forEach(dot => dot.classList.remove("dots__dot--active"));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
};

// Init function
const init = function(){
goToSlide(0);
createDots();
activateDot(0);
}
init();

