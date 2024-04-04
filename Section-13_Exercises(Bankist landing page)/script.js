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

const openModal = function (event) {
  // When in the html exists the tag href="#", as it is a link, the page goes up.
  // To avoid this behaviour, we add the preventDefault()
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

// HOW THE DOM REALLY WORKS
/**
 - DOM is the interface between the JS and the browser.
 - It allows us to make JS interact with the browser.
 - We can write JS to create, modify and delete HTML elements; 
    set styles classes and attributes and listen and respond to events.
 - DOM tree is generated from an HTML document, which we can then interact with;
 - Do  is a very complex API that contains a lot of methods 
    and properties to interact with the DOM tree.

// How the DOM API is organized behind the scenes
  - Every single node in the DOM tree is of type, node. And is represented by an object.
  - This object gets special access to special node methods and properties.
  - This Node has child types like an Element, a Text, a Comment and a Document
  - The Element type has an internal HTMLElement child type, making a special type for any element like image, anchor, etc.
  - There is also the EventTarget element, which makes possible "listening" to clicks and presses on the HTML
 */

// SELECTING, CREATING AND DELETING ELEMENTS

// select the entire document
// console.log(document.documentElement);

// select the head
// console.log(document.head);

// select the body
// console.log(document.body);

// returns the first matched element
 const header =  document.querySelector(".header");

// returns all .section elements in a Node list
// const sections = document.querySelectorAll(".section");

// get by element Id
// document.getElementById("section--1");

// get all button elements. This is a live collection, 
// meaning it is updated in case something is added or deleted.
// The same does not happen with a Node list
// const allButtons = document.getElementsByTagName("button");
// console.log(allButtons);

// We dont need the "." selector, simply is the name of the class
// document.getElementsByClassName("btn");

// Creating and inserting elements
// .insertAdacentHTML was used in the Bankist app

// this is an object that we can use but it is NOT yet on the DOM
const message = document.createElement("div");

// We can add classes pre-programmed on the css file, as it is the case
message.classList.add("cookie-message");

// We can also add text to it
// message.textContent("We use cookies for improved functionality and analytics.");
// .innerHtml() can also be used but we would have to write an HTML string
message.innerHTML = "We use cookies for improved functionality and analytics. <button class=\"btn btn--close-cookies\">Got it! </button>";

// prepend() makes it the first child of the header
header.prepend(message);

// append() makes it the last child of the header.
// As the element is a live element, it cant be at 2 places at a time. So, it only exists once in the DOM;
header.append(message);

// we can copy it to several places in the DOM using the cloneNode()
//header.append(message.cloneNode(true));

// We can also insert before() and after() an element
// header.before(message);
// header.after(message);

// Delete elements
document.querySelector(".btn--close-cookies").addEventListener("click", function () {
  message.remove();
  // This was the old methods, using DOM traversing
  // message.parentElement.removeChild(message); 
});

// STYLES ATTRIBUTES AND CLASSES 

// Set the style on an element
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

// We can only read inline styles, styles that we have written
// console.log(message.style.backgroundColor);

// We can gt the styles that are in the CSS file using the getComputedStyle()
// computed styles are the actual styles that exist in the page
// console.log(getComputedStyle(message).color);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// It is also possible to change the CSS variables using the 
// setProperty(css variabe, new value of variable) on the document.documentElement
// document.documentElement.style.setProperty("--color-primary", "orangered");

// Atributes
// src, class, id, etc, are all attributes of an HTML element
// const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.src);

// This won't work as designer is not a classic attribute of an image
// console.log(logo.designer); // undefined
// The workaround is using the getAttribute()
// console.log(logo.getAttribute("designer"));

// As we can read, we can also write on these attributes
// logo.alt = "Beautiful minimalist logo";
// console.log(logo.alt);

// There is also the opportunity of setting an attribute
// logo.setAttribute("company", "Bankist");
// console.log(logo.getAttribute("company"));

//This will give you the absolute location of the file
// console.log(logo.src);
// This will give you the relative location of the file
// console.log(logo.getAttribute("src"));

// Same thing for the links
// const link = document.querySelector(".nav__link--btn");
// console.log(link.href); // absolute
// console.log(link.getAttribute("href")); // relative

// Data Attributes
// console.log(logo.dataset.versionNumber)

// Classes 
// Several available functions for classes, which you can add several classes
// logo.classList.add("c", "k");
// logo.classList.remove("c", "j");
// logo.classList.toggle("c");
// logo.classList.contains("c");

// DONT USE, this will override all classes on the element and we can only put one class
// logo.className = "Diogo";


// IMPLEMENTING SMOOTH SCROLLING

// First we select the button we want to use to scroll to the pretended section
const btnScrollTo = document.querySelector(".btn--scroll-to");

// Then we select the pretended section
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function(event) {

  // This gets the the coordinates on the DOM Rectangle of the element we want to scroll to
  //const s1coords = section1.getBoundingClientRect();

  // We use scrolling with the coordinates of where we want the window to go to
  // These coordinates are relative to the viewport(clients window) and not the DOM.
  // Adding the windowXOffset and the windowYOffset, we can get the total value of the window
  // and when the button is clicked, the page scrolls always to the same section
  //window.scroll(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // Another old school way is to pass directly an object to the scrollTo() 
  // with the needed details plus a behavior property 
  // window.scrollTo({
  //     left: s1coords.left + window.pageXOffset, 
  //     top: s1coords.top + window.pageYOffset,
  //     behavior : "smooth"
  //   });

  // BUT, there is a more modern way to do the same thing, instead of all the lines of code above:
  // We just need to select the section we eant to scroll to, and in the scrollIntoView(),
  // we just define an object with the desired behavior. This only works in modern browsers
  section1.scrollIntoView({behavior: "smooth"});
});


// TYPES OF EVENTS AND EVENT HANDLERS
// An event is a signal that is generated by a certain DOM node. It means something has happened
// For example a click, a mouse move, a key pess, etc
// We can listen to these events in our code with eventListener() and handle them

// const h1 = document.querySelector("h1");
// "mouseenter" is like a hover event with the mouse
// h1.addEventListener("mouseenter", function(event) {
//   alert("addEventListener: Great, you are reading the heading!");
// });

// We an attach an event in another way. This used to be done in the old days.
// This way we cannot add several event listeners in the same element.
// To add more event listeners, addEventListener() is the better way.
// Also, this way we can't emove events from the element in case we don't need it anymore
// h1.onmouseenter = function(event) {
//   alert("addEventListener: Great, you are reading the heading!")
// };

// This process is usefull if we want the alert to be executed just once.
// const alertH1 = function() { 
//   alert("addEventListener: Great, you are reading the heading!");
//   // After it i launched, we can remove the event and it will only execute once we load the page
//   h1.removeEventListener("mouseenter", alertH1);
// };

// h1.addEventListener("mouseenter", alertH1);


// EVENT PROPAGATION: BUBBLIN AND CAPTURING
/**
When we click on a link for exemple, the DOM generates a click event but,
this event is not generated at the target element. The event was generated at the root of the Document.

1- The "capturing phase" happens, where the event travels from the Document root to the target element,
passing through each element in the Document until arrives the "<a>"" element
EX: Document -> <html> -> <body> -> <section> -> <p> -> <a> 

2- The "target phase" begins as soon as it reaches the element.
Event listeners wait for a certain event to happen and as soon as the event occurs, it runs the callback function.

3- The "bubbling phase" happens when the event travels back again to the Document root.
We say the events "Bubble Up" from the target to the document route. And just like in the "Capturing phase",
the event passes through all of its parent elements only.
This is important because it's as if the event also happened in each of the parent elements
Ex: <a> -> <p> -> <section> -> <body> -> <html> -> Document
So, if we click on the <a> and we attach the same event listener to the <section>, the exact same event would happen as well.
We would handle the event twice, once at it's target (<a>)and once at one of its parent elemnts (<section>);

This behaviour will allow us to implement really powerfull pattterns, for MOST events but not all.
By default events can only be handled in the target and in the bubbling phase.
However we can set up event listeners in a way to listen to events in the capturing phase instead.
*/

// In practise
// const randomInt = (min, max) => Math.floor(Math.random() * (max-min+1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// Clicking on the Child, all 3 elements change color because the target in all 3 elements is the same.
// As it is the same, it "bubbles" form the nav__link element until the nav element, 
// making us being able to handle the event in all elements
// document.querySelector(".nav__link").addEventListener("click", function(event) {
//   this.style.backgroundColor = randomColor();
//   console.log("Link:", event.target);
// });

// Clicking on Parent, only this and the Grandparent change color
// document.querySelector(".nav__links").addEventListener("click", function(event) {
//   this.style.backgroundColor = randomColor();
//   console.log("Container:", event.target);

  // Stop propagation, generaly not a good idea
  // event.stopPropagation();
// });

// Clicking on Grandparent, only this element changes color
// document.querySelector(".nav").addEventListener("click", function(event) {
//   this.style.backgroundColor = randomColor();
//   console.log("Nav:", event.target);
// // Changing the "use capture" parameter to true, the event handler 
// // won't listen to bubbling events, but instead to capturing events.
// }, true);

// EVENT DELEGATION works in 2 steps:
// 1. Add event listener to common parent element
// 2. Determine what element originated that event and work with that element
document.querySelector(".nav__links").addEventListener("click", function (event){
  event.preventDefault();
  // We can easily find where the event happened with the "event.target" property
  // Matching strategy
  if(event.target.classList.contains("nav__link")) { // If the target has the class "nav__link"
    const id = event.target.getAttribute("href"); // We get the href attribute
    document.querySelector(id).scrollIntoView({behavior:"smooth"}); // And scroll smoothly to that section
  }
}); 

// DOM TRAVERSING
// const h1 = document.querySelector("h1");

// Going downwards: child
// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.children); // gives us the live collection
// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "black";

// Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// We can use CSS variables like this
// h1.closest(".header").style.background = "var(--gradient-secondary)";
// h1.closest("h1").style.background = "var(--gradient-primary)";

// Going sideways or getting siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// The best way to get all the siblings
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function(el) {
//   if(el !== h1){
//     el.style.transform = "scale(0.5)";
//   }
// })


// BUILDING A TABBED COMPONENT
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
// Tabbed component
tabsContainer.addEventListener("click", function(event){
  event.preventDefault();
  // We can use event delegation through "closest" to get which tab was clicke.
  // Basically finds the closest parent of what was clicked
  const clicked = event.target.closest(".operations__tab");

  // Guard clause. When there is nothing clicked, we finish the function.
  // Just in case we click the tab or the container, it wont find the closest operations__tab
  if (!clicked) return;

  // We first remove the active class from all tabs
  tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
    // We also remove the active contents
  tabsContent.forEach(content => content.classList.remove("operations__content--active"));

  // And add it only for the selected tab
  clicked.classList.add("operations__tab--active");
  
  // Activate content tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// PASSING ARGUMENTS INTO EVENT HANDLERS
const nav = document.querySelector(".nav");
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
// Passing an argument into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// STICKY NAVIGATION
// Using Intersection Observer, it takes 2 parameters(callback function, options object)
//const header = document.querySelector(".header");
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
    // element that the target is intersecting. When null it is the entire viewport
    root:null,
    // percentage of intersection ate which the callback function will be called.
    // In this case, we want the nav-bar to be sticky as soon as it is no longer visible 
    threshold: 0,
    rootMargin : `-${navHeight}px`
  }); 
headerObserver.observe(header);

// REVEAL SECTIONS
const allSections = document.querySelectorAll('.section'); // We get all classes with section on classname

const revealSection = function(entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

// We observe when any of the sections above are crossed over by 15%
const sectionObserver = new IntersectionObserver(
  revealSection, {
  root: null,
  threshold: 0.15,
});

// We observe when any of the sections are uncrossed and add class section--hidden
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//LAZY LOADING IMAGES
// select all images that have the property data-src
const imgTargets = document.querySelectorAll("img[data-src]"); 


const loadImg = function(entries, observer){
  const [entry] = entries; // as we have only 1 thershold, we get it here

  if(!entry.isIntersecting) return; // if it is not intersecting, we return early

  //Replace the src attribute with data-src
  //entry.target is the element currently being intersected
  entry.target.src = entry.target.dataset.src;

  // When JS replaces the image on the src attribute, it does it behind the scenes. 
  // But this replacement when it ends emits a load event and we can listen to
  entry.target.addEventListener("load", function() {
    entry.target.classList.remove("lazy-img");
  });

  // When we are done with our task (loading the images), we can unobserve as we don't need it anymore
  observer.unobserve(entry.target);
};

// Create the image observer
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "+200px"
});

// attach the observer to each of the imgTargets elements, meaning the images
imgTargets.forEach(img => imgObserver.observe(img))


// SLIDER
// For now, all slides are on top of each other. Let's first start to make them side by side
const slides = document.querySelectorAll(".slide");

// We are going to work with percentages on the translateX() which moves them to position 100%.
// The first slide should be at 0% the second at 100%, the third at 200% and the fouth at 300%.
// We can calculate the position by multiplying the side index by 100.
// Kept just as an explanation.
//slides.forEach((slide, index) => slide.style.transform = `translateX(${100 * index})%`);

// Slider buttons
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
let currentSlide = 0;
const maxSlide = slides.length; // property to let JS know what is the last slide
const dotContainer = document.querySelector(".dots"); // Select the dots div

const nextSlide = function(){
    // If we have arrived to the last slide, we start from the begining
    if (currentSlide === maxSlide - 1){
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
};

const prevSlide = function(){
  // If we have arrived to the first slide, we go to the end
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

//On the slider, when right or left keys are pressed, the slide changes as well
document.addEventListener('keydown', function(event){
  // 2 ways of doing the exact same thing
  if(event.key === 'ArrowLeft') prevSlide();
  event.key === "ArrowRight" && nextSlide()
});



const goToSlide = function(slide) {
  // Lets say that the current slide is 1. As we loop over the slides, the first iteration will be 0.
  // So, index = 0 minus currentSlide = 1 times 100 is -100.
  // The next slide will be index = 1 minus currentSlide = 1 times 100 is 0.
  // This way we can say we are on the second slide and the first slide is out of the picture to the left by 100%.
  // The active slide is the one we want to be 0%
  slides.forEach((sld, index) => sld.style.transform = `translateX(
    ${100 * (index - slide)}%
    )`)
}

// On the HTML, we just have an empty div with the class "dots"
// Inside the dots div we insert the same number of buttons as we have slides.
const createDots = function(){
  slides.forEach(function(_, index) {
    dotContainer.insertAdjacentHTML("beforeend", 
    `<button class="dots__dot" data-slide="${index}"></button>`
    );

  })
}

// We attach an event handler not to every dot but to the common parent. (dotContainer) 
dotContainer.addEventListener("click", function(event){
  // If the dotContainer contains any child with the class "dots__dot".
  if(event.target.classList.contains("dots__dot")) {
    // we get the clicked dot by the custom data attribute "slide"(data-slide in the html)
    //const slide = event.target.dataset.slide;
    // OR using destructuring
    const {slide} = event.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

// To change the css of the active dot
const activateDot = function (slide){
  // We first select all the dots and remove the active class from all of them
  document.querySelectorAll(".dots__dot").forEach(dot => dot.classList.remove("dots__dot--active"));
  // Then, select the active dot through the class and data-slide attribute and add the active class
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
};

// Init function
const init = function(){
  // When page loads, the current slide must be always 0
goToSlide(0);
// When page loads, we create the dots on the slider
createDots();
// When the page loads, we activate the dots
activateDot(0);
}
init();


// LIFECYCLE DOM EVENTS
// DOMContentLoaded event is fired as soos as the html is completly downloaded and converted to the DOM tree and we can listen to this event
// Also, all scripts must be dowloaded and executed before the DOMContentLoaded event can happen. Images are not included.
// document.addEventListener("DOMContentLoaded", function(event){
//   console.log("HTML parsed and DOM tree built!", event);
// });

// Load Event is fired by the window. As soon as not only the HTML is parsed but also all the images 
// and external resources like CSS files are also loaded.
// window.addEventListener("load", function(event){
//   console.log("Page fully loaded", event);
// });

// This event is created immediately before a user is about to leave or reload a page. 
// After clicking the close page button on the browser for example, 
// we can ask users if they are 100% sure they want to leave the page.
// window.addEventListener("beforeunload", function(event){
//   // In some browsers to make it work we need to call preventDefault(). Not necessary in chrome
//   event.preventDefault();
//   console.log(event);
//   // In order to display a leaving confirmation, we need to set the return value on the event to an empty string, for historical reasons.
//   e.returnValue = "";
// })

// EFFICIENT SCRIPT LOADING: DEFER AND ASYNC
// We can write the script tag at the head or the body end of the html
/**
 * Regular Way
 <script src="script.js">
 HEAD - Parse the html
      - Pause the parse of html
      - Fetch script and execute
      - Finishing parsing HTML
      - DOMContentLoaded event fired 
  Not ideal because the browser is not doing anything while expecting for the script to be loaded.
  Script will be executed before the DOM is ready. Also not a good idea.
 
 BODY END - Parse the html
          - Fetch script and execute
          - DOMContentLoaded event fired 
  Better but still not perfect.
  Use if you need to support older browsers
 


 * Async Way
 <script async src="script.js">
 HEAD - Parse the html
      - Fetch script
      - Pause the parse of html
      - Execute script
      - Finishing parsing HTML
      - DOMContentLoaded event fired 
  The script is loaded at the same time as the HTML is parsed.
  DOMContentLoaded DOES NOT WAIT for an async script

 BODY END - Makes no sense or difference. It always happens after parsing the HTML


 * Defer Way -- BEST SOLUTION OVERALL
 <script defer src="script.js">
 HEAD - Parse the html
      - Fetch script
      - Execute script
      - DOMContentLoaded event fired 
  The execution of the script is deferred until the end of the HTML parsing.
  The HTML parsing is never interrupted.
  Forces the DOMContentLoaded event to be fired after the whole script has been downloaded and executed.
  Scripts are executed in order they are written.
 
 BODY END - Makes no sense or difference. It always happens after parsing the HTML

 */