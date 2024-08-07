// Exporting module
console.log("Exporting module");

// Blocking code for top-level await
// console.log("Start fetching users")
// await fetch("https://jsonplaceholder.typicode.com/users");
// console.log("Finish fetching users")

// All these variables are private to this scope. We can only use it here.
const shippingCost = 10;
export const cart = [];

// To use it outside of this module, we need to export them.
export const addToCart = function(product, quantity){
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart.`);
}

// We can also export multiple things at the same time.
const totalPrice = 237;
const totalQuantity = 23;
export {totalPrice, totalQuantity as tq};

// Default Exports
export default function (product, quantity){
    cart.push({product, quantity});
    console.log(`${product} ${quantity} added to cart`)
}