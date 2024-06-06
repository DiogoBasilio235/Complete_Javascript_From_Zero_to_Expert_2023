 // Importing module
 import {addToCart, totalPrice, totalQuantity} from"./shoppingCart.js";

  // All the code on the importing modules is executed first and then it is exucuted this script
 console.log("Importing module");

 addToCart("bread", 5);

 console.log(totalPrice);
 console.log(totalQuantity);