'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// HOW TO PLAN A WEB PROJECT
/**
   PLANNING STEP
 * 1 - User Stories: Description of the application's functionality form the user's
    prespective. All user stories put together describe the entire application.
    Common Format: As a [type of user], I want [an action] so that [a benefit].

 * 2 - Features: When we merge all user stories it will allow developers to determine the
    exact features that we need to implement to make the user stories work as intended.

 * 3 - Flow chart: To visualize the different actions that a user can take and how the program
    reacts to these actions, we put all these features into a nice flow chart.

 * 4 - Architecture: When we know what we are going to build, we start to think about how we 
    are going to build it. In this context, it simply means how we will organize our code, and 
    what JS features we will use. It is what holds the project together, it giving as a structure
    which we can then develop the application's functionality.
  
   DEVELOPMENT STEP 
 * 5 - Implementation of our plan using code.
 */

// USING THE GEOLOCATION API.
// It takes 2 arguments, the success callback function and the error callback function.

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        // Success callback
        function(position){
            // Destructuring to create a variable latitude out of the latitude property of "coords" object
           const {latitude} = position.coords;
           const {longitude} = position.coords;
           const coords = [latitude, longitude ]

           // DISPLAYING A MAP USING LEAFLET LIBRARY
           // We always need to pass an id of a div. In this case "map".
           // "L" is the namespace of Leaflet. It takes the coords and the zoom of the map (13)
           const map = L.map('map').setView(coords, 13);

           // Here it shows the appearance of the map. We can change around and try different layouts
           L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
           }).addTo(map);


           // DISPLAYING A MAP MARKER
           // mapEvent is a special event triggered by Leaflet
           map.on("click", function(mapEvent) {
            const {lat, lng} = mapEvent.latlng;

            L.marker([lat, lng])
            .addTo(map)
            .bindPopup(L.popup({
               maxWidth: 250,
               minWidth: 100,
               autoClose: false,
               closeOnClick: false,
               className: "running-popup",
               
            }))
            .setPopupContent("Workout")
            .openPopup();

           });
         },
        // Error calback 
        function() {
        alert("Could not get your position.")
    });
}

// DISPLAYING A MAP MARKER





