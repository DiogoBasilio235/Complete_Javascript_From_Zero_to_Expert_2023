'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function(data, className = ""){
    const html =`
    <article class="country ${className}">
    <img class="country__img" src=${data.flags.png} />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.continents[0]}</h4>
      <p class="country__row"><span>📍</span>${data.capital[0]}</p>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
      <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
}

// FIRST REQUEST
// Old school way
/*
const getCountryData = function(country){
    const request = new XMLHttpRequest();
    request.open("GET", countriesURL + country);
    //request.setRequestHeader("Authorization", "Bearer " + token);
    request.send();
    
    // We add an eventListener to wait for the "load" event
    request.addEventListener("load", function(){
        // The this keyword inside of the function is the request
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        const html =`
        <article class="country">
        <img class="country__img" src=${data.flags.png} />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.continents[0]}</h4>
          <p class="country__row"><span>📍</span>${data.capital[0]}</p>
          <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
          <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
        </div>
      </article>`;
      countriesContainer.insertAdjacentHTML("beforeend", html);
      countriesContainer.style.opacity = 1;
    });
}

getCountryData("portugal");
*/

// SHOWING A CALLBACK HELL
/**
const getCountryAndNeighbourData = function(country){
    // Ajax call country 1
    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
    request.send();
    
    // We add an eventListener to wait for the "load" event
    request.addEventListener("load", function(){
        // The this keyword inside of the function is the request
        const [data] = JSON.parse(this.responseText);

        // Render country 1
        renderCountry(data);

        // Render country 2
        const neighbour = data.borders?.[0];

        if(!neighbour) return; 
        const request2 = new XMLHttpRequest();
        request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
        request2.send();

        // request2 is a callback inside a callback. If we keep this road, we would create a callback hell.
        // Callback hell is a lot of nested callbacks in order to execute asynchronous tasks in sequence
        request2.addEventListener("load", function(){
            const [data2] = JSON.parse(this.responseText);
            console.log(data2);
            renderCountry(data2, "neighbour")
        });

    });
}
getCountryAndNeighbourData("us");
 */

// MODERN WAY USING FETCH API WITH PROMISES
// A Promise is and object that is used as a placeholder for the future result of an asynchronous operation. A container for a future value.

// Promise lifecycle:
// 1. Pending: Before the future value is available. The Async task keeps doing it's work and when it finishes moves on to the state of...
// 2. Settled: When the Async task has finished. We have 2 states here: FULFILLED and REJECTED promises.
// 2a. Fulfilled: Success! The value is now available.
// 2b. Rejected: An error has happened. For example, when the user is offline.

// Consuming a Promise
/*
const getCountryData = function(country){
    // Within the then(), we need to pass a function to be executed as soon as the promisse is fulfilled.
    fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response){

        // The json() is available on all the response objects that is coming from the fetch function.
        return response.json(); 

    }).then(function(data){ // The json() is also an Async function. So to read the data we call again another then()
        renderCountry(data[0]);
    })
};

getCountryData("portugal");
*/

// CHAINING PROMISES
// Using arrow functions
const getCountryData = function(country){
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => response.json())
        .then(data => {
            renderCountry(data[0]);

            //Getting just one neighbour
            const neighbour = data[0].borders?.[0];
            if (!neighbour) return;

            //Flat chain of promises
            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
            .then(response => response.json())
            .then(data => renderCountry(data[0], "neighbour"));

            // Getting all neighours
            // const neighbours = data[0].borders;
            // if (!neighbours) return;

            // neighbours.forEach(ctr => {
            //     return fetch(`https://restcountries.com/v3.1/alpha/${ctr}`)
            //     .then(response => response.json())
            //     .then(data => renderCountry(data[0], "neighbour"));
            // });
        })
};
getCountryData("germany");