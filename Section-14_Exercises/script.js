'use strict';

// CONSTRUCTOR FUNCTION
// Constructor functions on JS always start with a capital letter by convection
// Only function declarations and function expressions will work.
// Arrow functions don't have its own "this" keyword, and we need it to return the object.
const Person = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Bad Practise! Never create a method inside of a constructor function.
    // If we create thousands of Person objects, each object would carry the function calcAge(),
    // creating a thousand copies of this function, which is terrible for the performance of our code.
    // this.calcAge = function() {
    //     console.log(2024 - this.birthYear);
    // }
}

// We call the constructor using the "new" keyword. And behind the scenes 4 steps happen
// 1- A new empty Object is created
// 2- Function is called, this = the new empty Object
// 3- The new Object is linked to prototype and its pproperties
// 4- function autmatically returns the new Object
const jonas = new Person("Jonas", 1991);
// console.log(jonas);

// We can create as many different objects as we want.
// JS doesn't have classes in the sense of traditional OOP
// But we have created 3 objects from a constructor function.
// const matilda = new Person("Matilda", 2017);
// const jack = new Person("Jack", 1975);
// console.log(matilda);
// console.log(jack);

// Constructor functions have been used since the begining of JS to simulate classes.
// For this matter, jonas is an instance of Person
// console.log(jonas instanceof Person); // true

// PROTOTYPES
// Each and every function in JS automatically has a property called prototype, including constructor functions.
// Every object created by a constructor function, will get acceess to all the methods and properties
// that we define on the constructors prototype property. On our case it would be:
Person.prototype.calcAge = function() {
    console.log(2024 - this.birthYear);
}

// We have access to the method calcAge() because of prototypal inheritance. 
// The method exists on the Person object but not on the instance of jonas, although we have access to it
// jonas.calcAge(); // 33

// We can also set properties on the prototype. The property "species" won't be shown on the jonas object but,
// it will be present on the "__proto__" property, which jonas object will inherit from the Person object.
Person.prototype.species = "Homo Sapiens";
// console.log(jonas.species);

// There is a way to check if an object has it's own property.
// In this case, jonas has the own property of firstName and birthYear but
// the property of species are not his own
// console.log(jonas.hasOwnProperty("firstName")); // true

// Species is not present in the jonas object but we have access to it because of its prototype.
// console.log(jonas.hasOwnProperty("species")); // false

// PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS

//console.log(jonas);
/* 
birthYear : 1991
firstName : "Jonas"
*/

// This works because of the prototype chain
//console.log(jonas.__proto__);
/* Prototype property of Person
calcAge : ƒ ()
species : "Homo Sapiens"
*/

//console.log(jonas.__proto__.__proto__);
/* Prototype property of Object. This is the top of the chain
constructor : ƒ Object()
hasOwnProperty : ƒ hasOwnProperty()
isPrototypeOf : ƒ isPrototypeOf()
toString : ƒ toString()
valueOf : ƒ valueOf()
etc...
*/

// the null happens because the Object.prototype above, is usually the top of the scope chain.
//console.log(jonas.__proto__.__proto__.__proto__);
/*
null
*/

// We can inspect the constructor of an object calling the constructor property and using console.dir()
//console.dir(Person.prototype.constructor);

// On the prototype of array we have all the array methods like fill(), push(), reverse(), etc..
// Prototypal inheritance is the reason why all the arrays have access to these methods
const arr = [3, 6, 9, 5, 1, 8, 7, 1, 3, 5]; // new Array === []
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype); // true

// But is not the end. We can still climb one more ladder on the prototype chain and find the Object.prototype
// console.log(arr.__proto__.__proto__);

// We can extend this a bit further and add extra functionalities to all arrays usung the Array.prototype
// We will add a method to return all unique values of an array using the spread operator and Set.
// This is just for learning purposes, generlly not a good idea.
// Array.prototype.unique = function() {
//     return [...new Set(this)];
// };
// console.log(arr.unique());// [3, 6, 9, 5, 1, 8, 7]



/////////////////////////////////////////////////////
// CODING CHALLENGE #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀

// My solution
// 1.
const Car = function(make, speed){
    this.make = make;
    this.speed = speed;
}

// 2.
Car.prototype.accelerate = function(){
    this.speed += 10;
    console.log(this.speed);
};

// 3. 
Car.prototype.brake = function(){
    this.speed -= 5;
    console.log(this.speed);
}

// 4.
const car1 = new Car("BMW", 120);
const car2 = new Car("Mercedes", 95);

car1.accelerate();
car2.brake();

/////////////////////////////////////////////////////
// Teachers Solution
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};
  
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};
  
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();
*/


// ES6 CLASSES