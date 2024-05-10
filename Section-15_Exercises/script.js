'use strict';

// prettier-ignore

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

class Workout {

   date = new Date();
   // The ID will be a Date timestamp turned into a string and then we take the last 10 digits.
   // Generally a bad idea on the real world
   id = (Date.now() + "").slice(-10);

   constructor(coords, distance, duration){
      this.coords = coords; // [lat, lng]
      this.distance = distance; // in km
      this.duration = duration; // in minutes
      
   }

   _setDescription(){
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on 
      ${months[this.date.getMonth()]} ${this.date.getDate()}`
   }
}

class Running extends Workout{
   type = "running";
   constructor(coords, distance, duration, cadence){
      super(coords, distance, duration);
      this.cadence = cadence;
      this.calcPace();
      this._setDescription();
   }

   calcPace(){
      // min per km
      this.pace = this.duration / this.distance;
      return this.pace;
   }
}

class Cycling extends Workout{
   type = "cycling";
   constructor(coords, distance, duration, elevationGain){
      super(coords, distance, duration);
      this.elevationGain = elevationGain;
      this.calcSpeed();
      this._setDescription();
   }

   calcSpeed(){
      // Km/h
      this.speed = this.distance / (this.duration / 60);
      return this.pace;
   }
}

/////////////////////////////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let map, mapEvent;


class App{
   #map;
   #mapEvent;
   #workouts = [];
   #mapZoomLevel = 13;

   constructor(){
      // As soon as the object is created, the constructor is executed, making it 
      //a really suitable place to initiate all the methods needed for the app to work.
      this._getPosition();
      
      // Get data from local storage
      this._getLocalStorage();

      // Using again the bind(this) so it doesn't point to the form but to the object itself.
      form.addEventListener("submit", this._newWorkout.bind(this));

      inputType.addEventListener("change", this._toggleElevationField);
      containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
   
   }

   _getPosition(){
      if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(
            // Success callback. Using the bind(this) to bind the object to this.
            this._loadMap.bind(this),
             // Error calback 
             function() {
             alert("Could not get your position.")
         });
     }
   }

   _loadMap(position){
      
      // Destructuring to create a variable latitude out of the latitude property of "coords" object
      const {latitude} = position.coords;
      const {longitude} = position.coords;
      const coords = [latitude, longitude ]

      // DISPLAYING A MAP USING LEAFLET LIBRARY
      // We always need to pass an id of a div. In this case "map".
      // "L" is the namespace of Leaflet. It takes the coords and the zoom of the map (13)
      this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

      // Here it shows the appearance of the map. We can change around and try different layouts
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.#map);

      this.#map.on("click", this._showForm.bind(this));

      // Render the markers of the workouts on local storage AFTER the map is loaded!! 
      this.#workouts.forEach(work => {
         this._renderWorkoutMarker(work);
      });
   }

   _showForm(mapE){
      // DISPLAYING A MAP MARKER
      // mapEvent is a special event triggered by Leaflet.
      // Handling clicks on map
      // We give value to the global variable "mapEvent", to be used on all the events that happen on the map.
      this.#mapEvent = mapE;
      form.classList.remove("hidden");
      inputDistance.focus();
   }

   _hideForm() {
      //Empty inputs
      inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value 
         = "";
      form.style.display = "none";
      form.classList.add("hidden");
      setTimeout(() => (form.style.display = "grid"), 1000);
   }

   _toggleElevationField(){
      inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
      inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
   }

   _newWorkout(event){
      // Takes an undetermined number of inputs and checks if every input is a number
      const validInputs = (...inputs) => inputs.every(ipt => Number.isFinite(ipt));
      const allPositive = (...inputs) => inputs.every(ipt => ipt > 0);

      // Again, prevent the default behaviour of disapearing the form
      event.preventDefault();

      // Get data from form
      const type = inputType.value;
      const distance = +inputDistance.value;
      const duration = +inputDuration.value;
      const {lat, lng} = this.#mapEvent.latlng;
      let workout;

      // It workout is Running, create Running object
      if (type === "running") {
         // Check if data is valid
         const cadence = +inputCadence.value;

         console.log(distance > 0);
         console.log(duration > 0);
         console.log(cadence > 0);
         if (!validInputs(distance, duration, cadence) || 
            !allPositive(distance, duration, cadence)
         ) 
            return alert("Inputs have to be positive numbers!");

         workout = new Running([lat, lng], distance, duration, cadence);
      }

      // It workout is Cycling, create Cycling object
      if (type === "cycling") {
         // Check if data is valid
         const elevation = +inputElevation.value;

         if (!validInputs(distance, duration, elevation) || 
            !allPositive(distance, duration)
         ) 
            return alert("Inputs have to be positive numbers!");

         workout = new Cycling([lat, lng], distance, duration, elevation);
      }

      // Add new object to workout array
      this.#workouts.push(workout);

      // Render workout on map as marker
      this._renderWorkoutMarker(workout);

      // Render workout on list
      this._renderWorkout(workout);

      // Hide form + clear input fields
      this._hideForm();

      // Set local storage to all workouts
      this._setLocalStorage();
   }

   _renderWorkoutMarker(workout){
      L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
         L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`,
         })
      )
      .setPopupContent(`${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️" } ${workout.description}`)
      .openPopup();
   }

   _renderWorkout(workout){
      let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
         workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️" }
         </span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
      `;

      if (workout.type === "running"){
         html += `<div class="workout__details">
         <span class="workout__icon">⚡️</span>
         <span class="workout__value">${workout.pace.toFixed(1)}</span>
         <span class="workout__unit">min/km</span>
       </div>
       <div class="workout__details">
         <span class="workout__icon">🦶🏼</span>
         <span class="workout__value">${workout.cadence}</span>
         <span class="workout__unit">spm</span>
       </div>
     </li>
     `;
      }

      if (workout.type === "cycling"){
         html += `
      <div class="workout__details">
         <span class="workout__icon">⚡️</span>
         <span class="workout__value">${workout.speed.toFixed(1)}</span>
         <span class="workout__unit">km/h</span>
       </div>
       <div class="workout__details">
         <span class="workout__icon">⛰</span>
         <span class="workout__value">${workout.elevationGain}</span>
         <span class="workout__unit">m</span>
       </div>
     </li>
     `;
      }

      form.insertAdjacentHTML("afterend", html);
   }

   _moveToPopup(event){
      // We search for an event on the closest class called "workout"
      const workoutElement = event.target.closest(".workout");
      if (!workoutElement) return;

      // We then compare the details present on the html with the workouts we have stored on our code
      // to be used in building the setView()
      const workout = this.#workouts.find(workout => workout.id === workoutElement.dataset.id);
      
      // setView() is a special function of Leaflet Library
      this.#map.setView(workout.coords, this.#mapZoomLevel, {
         animate: true,
         pan: {
            duration: 1
         },
      });
   }

   _setLocalStorage(){
      // This method will get all the workouts from the "#workouts" property.
      // Next we can find how to use the localStorage API, provided by the browser.
      // We need a key for what we will save and a string with the object we want to save, 
      // thus the stringify method being used. localStorage is advised to use only for small amounts of data
      localStorage.setItem("workouts", JSON.stringify(this.#workouts));
   }

   _getLocalStorage(){
      // Use JSON.parse to bring it back from a string
      const data = JSON.parse(localStorage.getItem("workouts"));
      
      if (!data) return;

      this.#workouts = data;

      this.#workouts.forEach(work => {
         this._renderWorkout(work);
      });  
   }

   // Remove all items from local storage.
   reset() {
      localStorage.removeItem("workouts");
      location.reload();
   }
}

const app = new App();
