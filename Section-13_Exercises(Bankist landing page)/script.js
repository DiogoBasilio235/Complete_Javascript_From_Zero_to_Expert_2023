'use strict';

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
const randomInt = (min, max) => Math.floor(Math.random() * (max-min+1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// Clicking on the Child, all 3 elements change color because the target in all 3 elements is the same.
// As it is the same, it "bubbles" form the nav__link element until the nav element, 
// making us being able to handle the event in all elements
document.querySelector(".nav__link").addEventListener("click", function(event) {
  this.style.backgroundColor = randomColor();
  console.log("Link:", event.target);
});

// Clicking on Parent, only this and the Grandparent change color
document.querySelector(".nav__links").addEventListener("click", function(event) {
  this.style.backgroundColor = randomColor();
  console.log("Container:", event.target);

  // Stop propagation, generaly not a good idea
  // event.stopPropagation();
});

// Clicking on Grandparent, only this element changes color
document.querySelector(".nav").addEventListener("click", function(event) {
  this.style.backgroundColor = randomColor();
  console.log("Nav:", event.target);
// Changing the "use capture" parameter to true, the event handler 
// won't listen to bubbling events, but instead to capturing events.
}, true);
