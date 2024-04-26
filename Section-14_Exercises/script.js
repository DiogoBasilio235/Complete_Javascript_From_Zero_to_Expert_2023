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

// Class expression 
//const PersonCl = class {}

// Class declaration
// class PersonCl {
//   // We pass the arguments we want the class to have
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   // For the methods, we can write them after the constructor.
//   // These methods will be on the prototype of the object and NOT on the object themselves.
//   calcAge() {
//     console.log(2024 - this.birthYear);
//   }

//   get age(){
//     return 2024 - this.birthYear;
//   }
//   set fullName(name){
//     // The convention _fullName is used because the constructor and the setter are in conflict when we create a new person, because the property already exists.
//     // We then use the "get fullName" to give this property value, instead of just keeping it in the _fullName
//     if(name.includes(" "))this._fullName = name;
//     else alert(`${name} is not a full name`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static method. All the others are Instance methods
//   static hey() {
//     console.log(`Hey there 👍`);
//   }
// }

//const jessica = new PersonCl("Jessica Davies", 1996);
// console.log(jessica);
// jessica.calcAge(); //28
// console.log(jessica.__proto__ === PersonCl.prototype); // true

// We can also add manually a method to the prototype of PersonCl, as we have done before.
// PersonCl.prototype.greet = function() {
//   console.log(`Hey ${this.firstName}`);
// }
// jessica.greet();

// SOME THINGS TO KEEP IN MIND
// 1. Classes are NOT hoisted. 
//    We can use functions before they are declared, the same doesn't happen with classes.
//
// 2. Classes are also first-class citizens.
//    Meaning we can pass them into functions and also return them from functions,
//
// 3. The body of a class is always executed in strict mode
//    Meaning it will change the behavior and enforce stricter rules and throw more errors in certain situations.
//    When in strict mode, JavaScript will perform additional checks and restrictions to help you write cleaner and more reliable code.


// SETTERS && GETTERS
// const account = {
//   owner: "jonas",
//   movements: [200, 530, 120, 300],

//   // To create a getter inside an object, we just need to prepend "get" on the function:
//   get latest(){
//     return this.movements.slice(-1).pop();
//   },
//   // We can do the same for the setter. Any setter needs to have one parameter.
//   set latest(movement) {
//     this.movements.push(movement);
//   }
// };

// We call it as if it was a property of the object. No need for the parenthesis.
// This is useful when we need to read something as a property but we need a small calculation first.
// console.log(account.latest); // 300

// // To use the setter
// account.latest = 50;
// console.log(account.latest); // 50


// STATIC METHODS
// To add a static method we just need to add:
// Person.hey = function(){
//   console.log(`Hey there 👍`);
// }
// But this is not inherited by all Person Objects. It is not on the prototype of Person
// Static methods are NOT available on the instances
// Person.hey(); 
// //jonas.hey(); // ERROR
// PersonCl.hey();
// //jessica.hey(); // ERROR


// OBJECT.CREATE
// On our PersonProto, this is the only method we want to be inherited by all instances of PersonProto
// const PersonProto = {
//   calcAge() {
//     console.log(2024 - this.birthYear);
//   },
//   init(firstName, birthYear){
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }
// };

// const steven = Object.create(PersonProto);
// steven.name = "Steven";
// steven.birthYear = 1988;
// steven.calcAge();

// const sarah = Object.create(PersonProto);
// sarah.init("Sarah", 1979);
// sarah.calcAge(); 

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀


// My solution
class CarCl {

  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS(){
    return this.speed / 1.6;
  }

  set speedUS(speedInKmH){
    this.speed = speedInKmH * 1.6;
  }

  accelarate = function(){
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake = function(){
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
}
const ford = new CarCl("Ford", 120);
console.log(ford);
console.log(ford.speedUS);
ford.accelarate();
console.log(ford.speedUS);
ford.brake();
console.log(ford.speedUS);

/////////////////////////////////////////////////////
// Teachers Solution

class CarClt {

  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelarate(){
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake(){
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  
  get speedUS(){
    return this.speed / 1.6;
  }

  set speedUS(speed){
    this.speed = speed * 1.6;
  }
}
const fordT = new CarClt("Ford", 120);
console.log(fordT.speedUS);
*/

// INHERITANCE BETWEEN CLASSES

// For this lecture we will use the Person object as a reference.
// Right now we have created a Student which only differs from the Person object in the "course" property.
// Duplicate code is never a good idea.
// const Student = function(firstName, birthYear, course){
//   this.firstName = firstName;
//   this.birthYear = birthYear;
//   this.course = course;
// }

// This way we avoid duplicate code and in the case of the Person object changes in the future,
// the changes can be reflected also in the Student object.
// Using the call function with the "this" keyword, we are saying to JS that the "this" in the Person object,
// will be the same "this" in the Student object. 
// const Student = function(firstName, birthYear, course){
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// }


// Linking here the objects allows the Student object to have access to all the methods of the Person object through the Prototype Chain as we have discussed before.
// From this moment onwards, Student inherits from the Person.prototype.
// We need to set this Object.create before inserting any more methods on the Student prototype.
// Student.prototype = Object.create(Person.prototype);


// Student.prototype.introduce = function (){
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// }

// const mike = new Student("Mike", 2000, "Computer Science"); 
// mike.introduce()
// mike.calcAge();

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀

// My solution
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
  
const EV = function(make, speed, charge){
  Car.call(this, make, speed);
  this.charge = charge;
}

// Link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function(chargeTo) {
  this.charge = chargeTo;
}

EV.prototype.accelerate = function(){
  this.speed += 20;
  this.charge -= 1
  console.log(`${this.make} going at ${this.speed}km/h with a charge of ${this.charge}%`);
}


const tesla = new EV("Tesla", 120, 23);
console.log(tesla);
tesla.chargeBattery(26);
console.log(`Current battery level: ${tesla.charge} %`);

tesla.accelerate();
tesla.brake();

// Teachers solution

const EV = function(make, speed, charge){
  Car.call(this, make, speed);
  this.charge = charge;
}

// Link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function(chargeTo) {
  this.charge = chargeTo;
}

EV.prototype.accelerate = function(){
  this.speed += 20;
  this.charge -= 1
  console.log(`${this.make} going at ${this.speed}km/h with a charge of ${this.charge}%`);
}

const tesla = new EV("Tesla", 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();
*/


// INHERITANCE BETWEEN CLASSES
// Using the PersonCl example 
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2024 - this.birthYear);
  }
  
  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age(){
    return 2024 - this.birthYear;
  }

  set fullName(name){
    if(name.includes(" "))this._fullName = name;
    else alert(`${name} is not a full name`);
  }
  
  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log(`Hey there 👍`);
  }
}

// With classes, we just need the extends keyword to inherit all methods from PersonCl.
class StudentCl extends PersonCl{
  constructor(fullName, birthYear, course){
    // super() is the constructor function of the parent class, but here happens automatically.
    // Always needs to happen first. The super() is responsible of creating the "this" keyword in the StudentCl class
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge(){
    console.log(`I'm ${2024 - this.birthYear} years old but as a student I feel more like ${2024 - this.birthYear + 10}`);
  }
}

const martha = new StudentCl("Martha Jones", 2001, "Data Science");
martha.introduce();
martha.calcAge();


// INHERITANCE BETWEEN CLASSES WITH OBJECT.CREATE