'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


//let arr = ["a", "b", "c", "d", "e"];

// SLICE (begin parameter, end parameter ) - returns new array. Does not mutate the original;
//console.log(arr.slice(2, 4));
//console.log(arr.slice(-2)); // gets the lat 2 elements of the array.

// SPLICE (begin parameter, deleteCount, item1) - mutates the original array
//console.log(arr.splice(2)) // ["c", "d", "e"]
//console.log(arr); // ["a", "b"] 

// REVERSE . mutates the original array
//let arr2 = ["j", "i", "h", "g", "f"];
//console.log(arr2.reverse());

// CONCAT - does not mutate the old arrays
//const letters = arr.concat(arr2);
//console.log(letters);
//console.log([...arr, ...arr2]); // new array with spread operator and concat method produce the same result

// JOIN 
//console.log(letters.join(" - "));

// AT() METHOD VS. Bracket notation
//const arr = [23, 11, 64];
//console.log(arr[0]);
//console.log(arr.at(0))

//console.log(arr[arr.length - 1]);
//console.log(arr.slice(-1)[0]);
//console.log(arr.at(-1));  // getting the last element is easier with at()
//console.log("Diogo".at(-1)); // works also with strings

// FOR OF && FOR EACH LOOPS
// Fundamental difference is you CANNOT break out of a forEach Loop
// for(const movement of movements) {
//   if (movement > 0){
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }

// Just in case you need an index of the movement
// for(const [i, movement] of movements.entries()) {
//   if (movement > 0){
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// Higher order function required as a callback to let the loop know what to do
// movements.forEach(function(movement){
//   if (movement > 0){
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// });

// If we need the index of the movement.
// movements.forEach(function(movement, index, array){
//   if (movement > 0){
//     console.log(`Movement ${index + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// });

// FOREACH WITH MAPS AND SETS
// currencies is a Map
// currencies.forEach(function(value, key, map){
//   console.log(`${key}: ${value}`);
// });

// Set (only unique values)
// const currenciesUnique= new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
// console.log(currenciesUnique); // {'USD', 'GBP', 'EUR'}

// currenciesUnique.forEach(function(value, key, map){
//   console.log(`${key}: ${value}`);
// });
// OUTPUT:
// USD: USD
// GBP: GBP
// EUR: EUR
// Why? A Set doesn't have keys or indexes. so the "key" is replaced by the "value" parameter.


// CODE CHALLENGE #1
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

//My solution
// function checkDogs(dogsJulia, dogsKate){

//   const jointAges = [...dogsJulia].slice(1, -2).concat(dogsKate);

//   jointAges.forEach(function(age, i){
//     age < 3 ? console.log(`Dog number ${i + 1} is still a puppy 🐶`) : console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
//   });
// }

//Teacher solution
// const checkDogs = function(dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);

//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   dogs.forEach(function(dog, i) {
//     if (dog >= 3){
//       console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`)
//     }
//   });
// }
//checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3] );
//checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);


/////////////////////////////////////////////////
// MAP, FILTER, REDUCE
// MAP returns a new array containing the results of applying an operation on all original array elements.
 const eurToUsd = 1.1;
// const movementsUSD = movements.map(function(mov){
//   return mov * eurToUsd;
// });

// const movementsUSDOneLiner = movements.map(mov => mov * eurToUsd);
// console.log(movementsUSD);

// const movementsDescription = movements.map((mov, i) => // The map function will callback this function for each element of the array
//   mov > 0 ? `Movement ${i + 1}: You deposited ${mov}` : `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`
// );
// console.log(movementsDescription);


// FILTER returns a new array containing the array elememts that passed a specific test condition.
// const deposits = movements.filter(function(mov){
//   return mov > 0;
// });
// console.log(deposits);

// const depositsOneLiner =  movements.filter(mov => mov > 0);
// console.log(depositsOneLiner);

// Same as filter but with FOR OF loop
// const depositsFor = [];
// for (const mov of deposits){
//   if (mov > 0){
//     depositsFor.push(mov);
//   }
// }
// console.log(depositsFor);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// REDUCE boils ("reduces") all array elements down to one single value (ex: adding all elements together).
//acc = accumulator, keeps accumulating the value / cur = current element of the array / i = current index / arr = entire array
// const balance= movements.reduce(function(acc, cur, i, arr){
//   console.log(`Iteration ${i}: ${acc}`)
//   return acc + cur
// }, 0); // 0 is the initial value of the accumulator
// console.log(balance);

// const balanceOnLiner = movements.reduce((acc, cur) => acc + cur, 0); // 0 is the initial value of the accumulator
// console.log(balanceOnLiner);

// let balanceFor = 0;
// for (const mov of movements) balanceFor += mov;
// console.log(balanceFor);

//Get Max value of movements
// const maxValue = movements.reduce(function(acc, mov) {
//   if (acc > mov)
//     return acc;
//   else
//     return mov;
// }, movements[0]); // it is better to start with the first movement
// console.log(maxValue);


///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
//My solution. Teacher solution not copied as it was the same
// const calcAverageHumanAge = function(dogAges){
//   let humanAges = dogAges.map(function(dogAge) {
//     if (dogAge <= 2){
//       return 2 * dogAge
//     } else {
//       return 16 + dogAge * 4
//     }
//   })

//   const adults = humanAges.filter(function(age){
//     return age >= 18;
//   });

//   const averageAge = adults.reduce(function(acc, age){
//     return acc + age
//   }, 0) / adults.length;

//   return averageAge;
// }

// const calcAverageHumanAgeOneLiner = function(dogAges) {
//   return dogAges.map(dogAge => dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4)
//     .filter(age => age >= 18)
//     .reduce((acc, age, _, arr) => acc + age / arr.length, 0);
// }

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAgeOneLiner([16, 6, 10, 5, 6, 1, 4]));

// CHAINING OPERATIONS
// const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc, cur) => acc + cur, 0);
// console.log(totalDepositsUSD);

// When chaining operations, it can become dificult to know where a bug was made
// const totalDepositsUSDBug = movements
// .filter(mov => mov < 0) // Bug here where we only take the negative numbers. Withdrawals instead of Deposits
//.map(mov => mov * eurToUsd) // Original
// .map((mov, i, arr) => {
//   console.log(arr); // This is one of the use cases where it is usefull to have access to the arr parameter 
//   return mov * eurToUsd
// })
// .reduce((acc, cur) => acc + cur, 0);

// console.log(totalDepositsUSDBug);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

//My solution
// const calcAverageHumanAgeChained = dogAges => 
//   dogAges.map(dogAge => dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4)
//     .filter(age => age >= 18)
//     .reduce((acc, age, _, arr) => acc + age / arr.length, 0);

// console.log(calcAverageHumanAgeChained([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAgeChained([16, 6, 10, 5, 6, 1, 4]));


// FIND
// filter() retuns all the elements that satisfy a condition in a new array,
// find() only returns the first occurrence.

// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(firstWithdrawal);

// const account = accounts.find(acc => acc.owner === "Jessica Davis")
// console.log(account);

// INCLUDES / SOME / EVERY
//Includes() tests for equality
// console.log(movements.includes(-130)); // true

// Some() tests for a condition
// console.log(movements.some(mov => mov > 1500)); // true

// If every element passes a condition, it returns true
// console.log(movements.every(mov => mov > 0)); // false
// console.log(account4.movements.every(mov => mov > 0)); // true

// Separate callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit)); // true
// console.log(movements.every(deposit)); // false
// console.log(movements.filter(deposit)); // [200, 450, 3000, 70, 1300]

// FLAT && FLATMAP
// It flatens the inner arrays into a single array
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

// We can adjust the level of how deep we want the flat to go.
// const arrDeeper = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeeper.flat(2)); //[1, 2, 3, 4, 5, 6, 7, 8]

// We can also get the overall balance of the bank, this time without chaining
// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const bankOverallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(bankOverallBalance); // 17840

// Using a map() and a flat() together as shown above is a very common procedure.
// That is why the method flatMap() was created. This time we use chaining operators.
// flatMap() only goes one level deep. For futher levels, use the flat(*).
// const overalBalanceChained = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalanceChained); // 17840


// SORTING ARRAYS
// sort() mutates the original array
const owners = ["Jonas", "Zack", "Adam", "Martha"];
console.log(owners.sort());

// sort() works differently with numbers because it converts everything to strings
// and then it does the sorting itself
console.log(movements.sort()); // [-130, -400, -650, 1300, 200, 3000, 450, 70]

// We can pass a compare callback function with 2 arguments for it to work properly with numbers
// The sort() keeps looping through the array and applying the callback function until everything is in ascending order
console.log(
  movements.sort((currentValue, nextValue) => {
  if (currentValue > nextValue) return 1; // the number here just needs to be bigger than 0.(keep order)
  if (currentValue < nextValue) return -1; // The number here just needs to be smaller than 0.(switch order)
})
);

// Simplified
console.log(
  movements.sort((a, b) => a - b)
);

// We can also do it in a descending order this way:
console.log(
  movements.sort((currentValue, nextValue) => {
  if (currentValue > nextValue) return -1;
  if (currentValue < nextValue) return 1;
})
);

// Simplified
console.log(
  movements.sort((a, b) => b - a)
);


