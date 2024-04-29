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
           
            console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
        },
        // Error calback 
        function() {
        alert("Could not get your position.")
    });
}

// DISPLAYING A MAP USING LEAFLET LIBRARY





