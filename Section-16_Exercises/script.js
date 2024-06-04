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

const renderError = function(msg){
    countriesContainer.insertAdjacentText("beforeend", msg);
    //countriesContainer.style.opacity = 1;
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

// CHAINING PROMISES &&
// Using arrow functions



// const getCountryData = function(country){
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response =>  // Rejected promise
//         {
//             if (!response.ok)
//                 throw new Error(`Country not found (${response.status}) Try again!`)

//             return response.json()
//         })
//     .then(data => {
//         renderCountry(data[0]);

//         //Getting just one neighbour
//         const neighbour = data[0].borders?.[0];

//         if (!neighbour) return;

//         return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data[0], "neighbour"))
//     .catch(err => {  // error handling
//         console.error(`${err} 💣💣💣`);
//         renderError(`Something went wrong ${err.message}. Try again!`)
//     })
//     .finally(() => { // No matter what it happens in the code, this function is always executed
//         countriesContainer.style.opacity = 1; // This is use in order to show
//     });
// }

// const getCountryData = function(country){
//     getJson(`https://restcountries.com/v3.1/name/${country}`, "Country not found")
//         .then(data => {
//         renderCountry(data[0]);

//         //Getting just one neighbour
//         const neighbour = data[0].borders?.[0];

//         if (!neighbour) throw new Error("No neighbour found.");

//         return getJson(`https://restcountries.com/v3.1/alpha/${neighbour}`, "Country not found");
//     })
//     .then(data => renderCountry(data[0], "neighbour"))
//     .catch(err => {  // error handling
//         renderError(`Something went wrong ${err.message}. Try again!`)
//     })
//     .finally(() => { // No matter what it happens in the code, this function is always executed
//         countriesContainer.style.opacity = 1; // This is use in order to show
//     });
// }


const getJson = function(url, errorMsg = "Something went wrong"){
    return fetch(url)
    .then(response =>  // Rejected promise
    {
        if (!response.ok)
            throw new Error(`${errorMsg} (${response.status})`);

        return response.json()
    })
}

// btn.addEventListener("click",function() {
//     getCountryData("australia");
// })


///////////////////////////////////////
// Coding Challenge #1

/*
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// My solution
// A different approach was taken for the sake of trying something different.
// const renderGeoLocationData = function(data, className = ""){
//     const html =`
//     <article class="country ${className}">
//     <div class="country__data">
//       <h3 class="country__name">Country: ${data.country}</h3>
//       <p class="country__row"><span>📍</span>City: ${data.city}</p>
//       <p class="country__row"><span>🏔️</span>Elevation: ${data.elevation} metres</p>
//       <p class="country__row"><span>🗺️</span>Lat / Long: ${data.latt} /  ${data.longt}</p>
//     </div>
//   </article>`;
//   countriesContainer.insertAdjacentHTML("beforeend", html);
//   //countriesContainer.style.opacity = 1;
// }

// const whereAmI = function(lat, long){
//     fetch(`https://geocode.xyz/${lat},${long}?json=1&auth=239839308822961272590x51664`)
//     .then(response =>
//         {
//             if (!response.ok)
//                 throw new Error(`Coordinates not found (${response.status}) Try again!`)

//             return response.json()
//         })
//     .then(data => {
//         console.log(`You are in ${data.city}, ${data.country}`)
//         renderGeoLocationData(data)
//     })
//     .catch(err => {
//         console.error(`Something went wrong ${err.message}. Try again!`);
//     })
//     .finally(() => {
//             countriesContainer.style.opacity = 1;
//     });
// }

// //whereAmI(52.508, 13.381);
// //whereAmI( 19.037, 72.873);
// whereAmI(-33.933, 18.474);

//Teacher solution
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=239839308822961272590x51664`)
//   .then(res => {
//     if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//     return res.json();
//   })
//   .then(data => {
//     console.log(data);
//     console.log(`You are in ${data.city}, ${data.country}`);

//     return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//   })
//   .then(res => {
//     if (!res.ok) throw new Error(`Country not found (${res.status})`);

//     return res.json();
//   })
//   .then(data => renderCountry(data[0]))
//   .catch(err => console.error(`${err.message} 💥`));
// };
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// THE EVENT LOOP
// JavaScript is single-threaded, meaning it can execute one task at a time. However,
// it can handle asynchronous operations like network requests, timers, and I/O operations efficiently.
// The Event Loop is crucial in managing these asynchronous operations without blocking the main thread.
//
// Components of the Event Loop
// Call Stack: This is where JavaScript keeps track of function calls.
// When a function is called, it's added to the stack. When the function completes, it's removed from the stack.

// Web APIs: These are provided by the browser (or the Node.js runtime) and include functionalities like
// setTimeout, DOM events, fetch, etc. These APIs handle asynchronous tasks.

// Task Queue (Callback Queue): When an asynchronous operation completes,
// its callback function is added to this queue, waiting to be executed.

// Event Loop: This is the mechanism that checks if the call stack is empty and if there are any pending callbacks
// in the task queue. If the stack is empty, it moves the first callback from the task queue to the call stack, executing it.


// console.log("Test start");
// setTimeout(() => console.log("0 second timer"), 0);
// Promise.resolve("Resolved promise 1").then(res => console.log(res));
// console.log("Test end");

// In this example, the console will look like this:
// line 1 -> Test start
// line 2 -> Test end
// line 3 -> Resolved promise 1
// line 4 -> 0 second timer

// The code outside of any callback is executed first. (line 1 & line 2)
// Both the timer and the Promise will finish at the same time. But the timer finishe first
// and it's callback will bu put on the callback queue first.
// But it wont be logged to the console first because of the micro-tasks queue. The call back from the Promise
// will be put in the micro-tasks queue, and it has priority over the callback queue.
// If any of the micro-tasks takes a lot of time to complete, then the timer will be delayed and not run after the zero seconds,
// only when the micro-task is actually done with it's work.


// In this case the Promise 2 is still resolved immediatly but the micro-task that it contains will take longer.
// This will make the callback queue be delayed and not run after the zero seconds
// console.log("Test start");
// setTimeout(() => console.log("0 second timer"), 0);
// Promise.resolve("Resolved promise 1").then(res => console.log(res));
// Promise.resolve("Resolved promise 2").then(res =>
//     {
//         for(let i = 0; i < 1000000000; i++ ){}
//         console.log(res)
//     }
// );
// console.log("Test end");

// line 1 -> Test start
// line 2 -> Test end
// line 3 -> Resolved promise 1
// line 4 -> Resolved promise 2
// line 5 -> 0 second timer


// BUILDING A SIMPLE PROMISE
// The Promise object takes only one argument calle "Executor function".
// This function has the "resolve" and "reject" parameters.
// const lotteryPromise = new Promise(function(resolve, reject){
//     console.log("Lottery draw is happening...");

//     setTimeout(function(){
//         if (Math.random() >= 0.5) {
//             // In order to fulfill the Promise we use the resolve().
//             // Whatever value we pass into the resolve() is gonna be the result of the Promise
//             // that will be available in the then() handler.
//             resolve("You WON the lottery!!! 🤑🤑🤑");
//         } else {
//             reject(
//                 // Creating an error object is the way to go
//                 new Error("You lost your money!💩💩💩")
//             );
//         }
//     }, 2000)
// });

// lotteryPromise.then(res => console.log(res))
// .catch(err => console.error(err));

// Promissifying setTimout
// const wait = function(seconds){
//     return new Promise(function(resolve){
//         setTimeout(resolve, seconds * 1000);
//     });
// }

// wait(2).then(() => {
//     console.log("I've waited for 2 seconds");
//     return wait(1);
// }).then(() => {
//     console.log("I've waited for 1 second");
// });

// Promise.resolve("abc").then(x => console.log(x));
// Promise.reject(new Error("Problem")).catch(x => console.error(x));



// PROMISSIFYING THE GEOLOCATION API
// const getPosition = function(){
//     return new Promise(function(resolve, reject){
//         navigator.geolocation.getCurrentPosition(resolve,reject);
//     });
// }

// const whereAmI = function () {

//   getPosition().then(pos => {
//     const {latitude : lat, longitude : lng} = pos.coords;

//     return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=239839308822961272590x51664`);
//   })
//   .then(res => {
//     if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//     return res.json();
//   })
//   .then(data => {
//     console.log(data);
//     console.log(`You are in ${data.city}, ${data.country}`);

//     return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//   })
//   .then(res => {
//     if (!res.ok) throw new Error(`Country not found (${res.status})`);

//     return res.json();
//   })
//   .then(data => renderCountry(data[0]))
//   .catch(err => console.error(`${err.message} 💥`));
// };

// btn.addEventListener("click", whereAmI);


///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const wait = function (seconds) {
//     return new Promise(function (resolve) {
//       setTimeout(resolve, seconds * 1000);
//     });
//   };
  
//   const imgContainer = document.querySelector('.images');
  
//   const createImage = function (imgPath) {
//     return new Promise(function (resolve, reject) {
//       const img = document.createElement('img');
//       img.src = imgPath;
  
//       img.addEventListener('load', function () {
//         imgContainer.append(img);
//         resolve(img);
//       });
  
//       img.addEventListener('error', function () {
//         reject(new Error('Image not found'));
//       });
//     });
//   };
  
//   let currentImg;
  
//   createImage('img/img-1.jpg')
//     .then(img => {
//       currentImg = img;
//       console.log('Image 1 loaded');
//       return wait(2);
//     })
//     .then(() => {
//       currentImg.style.display = 'none';
//       return createImage('img/img-2.jpg');
//     })
//     .then(img => {
//       currentImg = img;
//       console.log('Image 2 loaded');
//       return wait(2);
//     })
//     .then(() => {
//       currentImg.style.display = 'none';
//     })
//     .catch(err => console.error(err));
  

// CONSUMING PROMISES WITH ASYNC/AWAIT.
// TRY/CATCH STATEMENT

const getPosition = function(){
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve,reject);
    });
}

const whereAmIAsync = async function() {
    
    // This is still using Promises behind. In fact, the then() and teh await coded here are exactly the same way of doing the same thing.
    // fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=239839308822961272590x51664`)
    // .then(res => console.log(res));

    try{
        // The first promise does not need a throw of the error because it is protected by the try/catch block
        const pos = await getPosition();
        const {latitude : lat, longitude:lng} = pos.coords;
    
        const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=239839308822961272590x51664`);
        if (!resGeo.ok) throw new Error("Problem getting location data");
        const dataGeo = await resGeo.json();
    
        const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`);
        if (!res.ok) throw new Error("Problem getting country");
        const data = await res.json();
        renderCountry(data[0]);

        // Returning values from Async Functions
        return `You are in ${dataGeo.city}, ${dataGeo.country}.`;
    } catch(err)
    {
        // console.error(err.message)
        // alert(err.message);

        // Reject a promise returned from async function. This is a correct way to do.
        throw err;
    }
} 
// console.log("1: Will get the location");

// At this point JS has no way of knowing what will be returned from this function
//const city = whereAmIAsync();
//console.log(city); // logs a Promise Object

// In order to see what is the fulfilled value of the promise, we need to go back to the then().
// whereAmIAsync()
//     .then(city => console.log(`2: ${city}`))
//     .catch(err => console.error(`2: ${err.message}`))
//     .finally(() => console.log("3: Finished getting the location"));

// A more convinient way to do this without resorting to then(), catch(), finally(),
// is using a IIFE (Immediatly-Invoked Function Expressions)

// (async function() {
//     try {
//         const city = await whereAmIAsync();
//         console.log(`2: ${city}`);
//     } catch(err){   
//         console.error(`2: ${err.message}`);
//     }
//     console.log("3: Finished getting the location")
// })();


// RUNNING PROMISES IN PARALLEL
const get3Countries = async function(c1, c2, c3){
    try{
        // We can use Promise.all() combinator to fetch the data all at the same time.
        // REMEMBER that if one of the fetches fails, the whole Promise.all() will also fail!
        const data = await Promise.all([
            getJson(`https://restcountries.com/v3.1/name/${c1}`),
            getJson(`https://restcountries.com/v3.1/name/${c2}`),
            getJson(`https://restcountries.com/v3.1/name/${c3}`)
        ]);

        console.log(data.map(d => d[0].capital));
    }catch(err){
        console.error(err.message);
    }
}
// get3Countries("portugal", "canada", "tanzania");

// OTHER PROMISE COMBINATORS

// Promise.race: The first settled promise wins the race. A settled promise is a promise either fulfilled or rejected.

// Example 1
// (async function(){
//     const res = await Promise.race([
//         getJson(`https://restcountries.com/v3.1/name/italy`),
//         getJson(`https://restcountries.com/v3.1/name/egypt`),
//         getJson(`https://restcountries.com/v3.1/name/mexico`)
//     ]);
//     console.log(res[0])
// })();

// Example 2
// const timeout = function(sec){
//     return new Promise(function(_, reject){
//         setTimeout(function(){
//             reject(new Error("Request took too long"));
//         }, sec * 1000)
//     })
// }

// Promise.race([
//     getJson(`https://restcountries.com/v3.1/name/italy`), 
//     timeout(1)
// ]).then(res=> console.log(res[0]))
// .catch(err => console.error(err));

// Promise.allSettled: Takes an array of promises and returns an array of all the settled promises.
// Promise.allSettled([
//     Promise.resolve("Success"),
//     Promise.reject("ERROR"),
//     Promise.resolve("Success again"),
// ]).then(res=> console.log(res));

// Promise.any: Takes an array of promises and returns the first FULFILLED promise and it will IGNORE rejected promises.
// Promise.any([
//     Promise.resolve("Success"),
//     Promise.reject("ERROR"),
//     Promise.resolve("Success again"),
// ]).then(res=> console.log(res));


///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/
const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  };

const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
      const img = document.createElement('img');
      img.src = imgPath;
  
      img.addEventListener('load', function () {
        imgContainer.append(img);
        resolve(img);
      });
  
      img.addEventListener('error', function () {
        reject(new Error('Image not found'));
      });
    });
  };

  // PART 1
  const loadNPause = async function () {
    try {
      // Load image 1
      let img = await createImage('img/img-1.jpg');
      console.log('Image 1 loaded');
      await wait(2);
      img.style.display = 'none';
  
      // Load image 2
      img = await createImage('img/img-2.jpg');
      console.log('Image 2 loaded');
      await wait(2);
      img.style.display = 'none';

      // Load image 3
      img = await createImage('img/img-3.jpg');
      console.log('Image 3 loaded');
      await wait(2);
      img.style.display = 'none';

    } catch (err) {
      console.error(err);
    }
  };
  //loadNPause();
  
  // PART 2
  const loadAll = async function (imgArr) {
    try {
      const imgs = imgArr.map(async img => await createImage(img));
      const imgsEl = await Promise.all(imgs);
      console.log(imgsEl);
      imgsEl.forEach(img => img.classList.add('parallel'));
    } catch (err) {
      console.error(err);
    }
  };
  loadAll(['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg']);