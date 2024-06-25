//  // Importing module
//  // We can also rename the the imported variables or export them with a different name
//  //import {addToCart, totalPrice as price, tq} from"./shoppingCart.js";

//   // All the code on the importing modules is executed first and then it is exucuted this script
//  console.log("Importing module");

//  addToCart("bread", 5);

// //  console.log(totalPrice);
// //  console.log(totalQuantity);

//  console.log(price);
//  console.log(tq);


// Another way of importing and using he elements from other class.
console.log("Importing module.")
//  import * as ShoppingCart from "./shoppingCart.js";
// ShoppingCart.addToCart("bread", 5);
// console.log(ShoppingCart.totalPrice);

// With default import, we can give the name we want to the code that was imported because the default will always be the same.
// We can use a combination of normal and default imports, although it is not advisible.
import add, {cart} from "./shoppingCart.js";
add("pizzas", 2);
add("bread", 5);
add("apples", 4);

// By the time we exported the cart array it was empty, but the import is a live connection, not simply a copy.
// They are the same and are pointing to the same place in momory
console.log(cart);


// TOP LEVEL AWAIT
// With ECMA Script update 2022 (ES2022), we can now use an "await" keyword outside of an async function.
// This only works in modules. The code you see is executed in order. The "Something" log will only be shown after the data from the API arrives
// console.log("Start fetching")
// const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// const data = await res.json();
// console.log(data);
// console.log("Something")


// const getLastPost = async function (){
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const data = await res.json();
//     return {title: data.at(-1).title, text: data.at(-1).body}
// }
// const lastPost = getLastPost();
// As we know, this won't log the actual data but instead a Promisse because the data has yet not arrived.
//console.log(lastPost);

// With the then method, we have access to the data. It doesn't look very clean but it works
// lastPost.then(last => console.log(last));

// This way we have access to the data straight away. 
// NOTE: If one module imports a module that has a top-level await, then the importing module will wait for the importing module to finish the blocking code.
// const lastPost2 = await getLastPost();
// console.log(lastPost2);


// THE MODULE PATTERN
// Example of a Module pattern in JS. 
// const ShoppingCart2 = (function(){
//     const cart = [];
//     const shippingCost = 10;
//     const totalPrice = 237;
//     const totalQuantity = 23;
//     const addToCart = function(product, quantity){
//         cart.push({product, quantity});
//         console.log(`${quantity} ${product} added to cart. Shipping cost is ${shippingCost}.`);
//     };

//     const orderStock = function(product, quantity){
//         cart.push({product, quantity});
//         console.log(`${quantity} ${product} ordered from supplier.`);
//     };

//     return {addToCart, cart, totalPrice, totalQuantity};
// })();

// ShoppingCart2.addToCart("apple", 4);
// ShoppingCart2.addToCart("pizza", 2);
// console.log(ShoppingCart2);
// // The property "shippingCost" is undefined
// console.log(ShoppingCart2.shippingCost);


// INTRODUCTION TO NPM
// Why do we need Node Package Manager? Because we used to include external libraries right into our HTML usingthe script tag.
// To initialize npm in our terminal, we need to write : npm init
// Then keep pressing enter or entering the details you want.
// After all these questions, we end up with a file called "package.json". This file stores the entire configuration of our poject.

// Now let's install the leaflet library, previously used on our MaptyApp, using npm. Write "npm isntall leaflet".
// It will create a "node_modules" folder and a new "dependencies" field was created on the package.json file

// Let's now install Lodash. Lodash is a library of funcions that should be coming with JS by default but aren't.
// We need to install the lodash-es version.
// We will use the cloneDeep function because of the inherent difficulty of creating a nested object
import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";


const state = {
    cart: [
        {product: "bread", quantity: 5},
        {product: "pizza", quantity: 5},
    ],
    user: { loggedIn: true }
}

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

// But what happens if we change one of the nested object? 
//Although we changed the state.user.loggedIn to false, this change was also done to the stateClone object.
state.user.loggedIn = false;
console.log(stateClone);

// Using the cloneDeep function, the original properties of the state object are maintained. The loggedIn property is still true
console.log(stateDeepClone);

// When sharing the project with another developer or sending it to git, YOU SHOULD NEVER INCLUDE THE node-modules FOLDER!!!
// The node-modules folder will be huge in a real project. So, even if you delete the folder, using "npm install", you can get back
// all the modules you need to run your project. On the package.json file, all the versions needed are specified there.


// BUNDLING WITH PARCEL AND NPM SCRIPTS
// Parcel is just like Webpack used on React but for this course is way too complex to use. We should use it in our command line
// Let's install it with "npm install parcel --save-dev" on the folder "Section-17_Exercises", as we have done so far.
// To use Parcel in this project we have 2 options:
// 1: Writtig "npx parcel index.html". The index.html is the entry point because it is where we include our script.js. 
// The objective is to bundle everything together. Parcel has started a new development server on an url specified on our command line.
// The "dist" folder will be the folder to be sent to production. It is the code in that folder that will be sent to our final users.

// 2: NPM Scripts
// NPM scripts are another way of running locally installed packages in the command line. 
// Useful also to automate repetitive tasks. We have modified the property "scripts" on our package.json file
// and now we just need to write "npm run start" on our command line, being "start" the name of the npm script that we have defined on package.json

// To build the final bundle there is another command that we need to run: "npm run build".
// If we go to the npm scripts, you will see a new added script by us called "build" that will build the application.


// CONFIGURING BABEL AND POLYFILLING
// Babel is useful when we need to transpile our code back to ES5 if we want our applications to work in older computers or browsers.
// Parcel automatically uses Babel. And we can configure Babel to the point of which browsers should be supported.
// Instead of choosing what kind of elements you want transpiled to ES5, Babel has some presets to be used.

// Polifilling
// In JavaScript, a polyfill is a piece of code (usually a function or a script) that provides functionality that is not natively supported 
// by a browser or runtime environment. Polyfills are used to implement features that are defined in modern JavaScript standards but 
// are not yet available in older browsers or environments.
// Things might be different sometime in the future.

// Library for polifilling find() methods and Promises
// npm install core-js
import 'core-js/stable';

// Library for polifilling async functions
// npm install regenerator-runtime
import 'regenerator-runtime/runtime' 