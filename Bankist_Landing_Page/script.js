'use strict';

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

// Page Navigation

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


// Tabbed component
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

// Menu fade animation
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


// Sticky navigation
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

