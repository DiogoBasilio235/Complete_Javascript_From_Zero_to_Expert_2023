/* 'use strict';

const greet = (greeting) => {
    return (name) => {
        console.log(`${greeting} ${name}`);
    }
}

// OR
const greet2 = greeting => name => console.log(`${greeting} ${name}`);

greet("Hello")("Andre");
greet2("Hello")("Diogo");

const addTax = rate => value => console.log(value + value * rate);
addTax(0.23)(100);

// OR
const addTaxRate = function(rate){
    return function(value){
        return value + value * rate
    }
}
const addTaxRate23 = addTaxRate(0.23);
console.log(addTaxRate23(100));
/////////////////////////////////
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

// My solution
/*
const poll = {
    question: "What is your favourite programming language?",
    options: ["0: Javascript","1: Python", "2: Rust", "3: C++"],
    answers: new Array(4).fill(0),
    displayResults: function(type){
        if (type== "string"){
            console.log(`The poll results are ${this.answers[0]}, ${this.answers[1]}, ${this.answers[2]}, ${this.answers[3]}.`);
        } else if (type == "array"){
            console.log(this.answers);
        }else{
            console.log("The type is not valid");
        }
    },
    registerNewAnswer: function(input){
        switch(input){
            case 0:
                this.answers[0] += 1; 
                break;
            case 1: 
                this.answers[1] += 1; 
                break;
            case 2: 
                this.answers[2] += 1; 
                break;
            case 3: 
                this.answers[3] += 1; 
                break;
            default:
                console.log("Your input is not valid.");
                break;
        }
    }
};

var pollButton = document.getElementsByClassName("poll")[0];

pollButton.addEventListener("click", function() {
    var userInput = prompt(poll.question + "\n " + poll.options[0]
    + "\n " + poll.options[1]
    + "\n " + poll.options[2]
    + "\n " + poll.options[3]);
    poll.registerNewAnswer(parseInt(userInput));
    poll.displayResults("string");
    poll.displayResults("array");
});
*/
//Teacher Solution
const poll = {
    question: "What is your favourite programming language?",
    options: ["0: Javascript","1: Python", "2: Rust", "3: C++"],
    answers: new Array(4).fill(0),
    displayResults: function(type){
        if (type.toLowerCase() == "string"){
            console.log(`The poll results are ${this.answers[0]}, ${this.answers[1]}, ${this.answers[2]}, ${this.answers[3]}.`);
        } else if (type.toLowerCase() == "array"){
            console.log(this.answers);
        }else{
            console.log("The type is not valid");
        }
    },
    registerNewAnswer() 
    {
        const answer = Number(
            prompt(
                `${poll.question}\n${this.options.join("\n")}`
                )
        );
        typeof answer === "number" && answer < this.answers.length &&this.answers[answer]++;
        this.displayResults();
        this.displayResults("string");    
    },
    displayResults(type="array")
    {
        if (type === "array"){
            console.log(this.answers);
        } else if (type === "string"){
            console.log(`Poll results are ${this.answers.join(", ")}`)
        }
    }
};
//As the registerNewAnswer function uses the "this" keyword in it's implementation, 
//it is being binded to the "join" function. So, we need to use the "bind" method 
//to bind it to the object "poll "
document.querySelector(".poll")
.addEventListener("click", poll.registerNewAnswer.bind(poll));
/*
BONUS 
var array1 = [5, 2, 3]
var array2 = [1, 5, 3, 9, 6, 1]

//We need to make our displayResults function to work with our new array.
//We use the call() finction to make the "this" keyword, the given array
poll.displayResults.call({answers:array1}, "string");
poll.displayResults.call({answers:array2});


//Immediatly Invoked Function Expressions

const runOnce = function(){
    console.log("This will never run again");
}
runOnce();

// Wrap the function in an expression and use parenthesis at the end to run it immediatly
(function () {
    console.log("This function runs automatically");
})();

//option 2:
(() => console.log("This function also runs automatically."))();

// In this case, const is private to the block 
// and notPrivate can be accessed because it is declared as a var
{
    const isPrivate = 23;
    var notPrivate = 46;
}
console.log(notPrivate);



// Closures

const secureBooking = function() {
    let passengerCount = 0;

    return function(){
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    }
}

// A Closure is like a backpack that a function carries around wherever it goes.
//This backpack has all the variables that were present in the environment where the function was created
//We do NOT have to manually create closures, this is a JS feature that happens automatically.
//We can't even access closed-over variables explicitly. A closure is NOT a tangible JS object. 
const booker = secureBooking();
booker();
//booker();
//booker();

// example 2
let f;
const g = function() {
    const a = 23;
     f = function() {
        console.log(a * 2);
     }
}
const h = function() {
    const b = 777;
    f = function() {
        console.log(b * 2);
    }
}
g();
f();
// Reassigning f function
h();
f();

// example 3
const boardPassengers = function(n, wait) {
    const perGroup = n / 3;
    setTimeout(function (){
        console.log(`We are now boarding all ${n} passangers.`);
        console.log(`There are 3 groups, each with ${perGroup} passengers.`)
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds`);
}
boardPassengers(100, 3);
*/

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/
//My solution / Teacher solution
(function () {
    const header = document.querySelector("h1");
    header.style.color = "red";
    document.querySelector("body").addEventListener("click", function()
    {
        header.style.color = "blue";
    })
})();

