'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// NUMBERS in JS are always decimal 
// console.log (23 === 23.0);

// Numbers in JS are represented internally in a 64 base 2 format
// Numbers are stored in a binary form
// This is a running joke in JS
//console.log(0.2 + 0.1); // 0.30000000000000004

// Convert string to number
//console.log(Number("23"));
//console.log(+"23");

// Parsing - The string needs to start with a number
//console.log(Number.parseInt("30px")); // 30

// Check if a value is NotaNumber
//console.log(Number.isNaN("20"));

// Check if a value is number
//console.log(Number.isFinite(+"20x"));

// Square Root
// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2));

// Cubic Root
//console.log(8 ** (1 / 3));

// Get Max Value
//console.log(Math.max(5, 18, 23, 11, 2));

// Get Min Value
//console.log(Math.min(5, 18, 23, 11, 2));

// Constants on the Math namespace
//console.log(Math.PI);

// RANDOM NUMBERS
//console.log(Math.trunc(Math.random() * 6) + 1);
//const randomInt = (min , max) => Math.trunc(Math.random() * (max - min) + 1) + min;

// ROUNDING NUMBERS
// console.log(Math.trunc(23.3));

// console.log(Math.round(23.3)); // 23
// console.log(Math.round(23.9)); // 24

// console.log(Math.ceil(23.3)); // round up: 24
// console.log(Math.floor(23.3)); // round down: 23

//With negative integers, works the other way around
// console.log(Math.ceil(-23.3)); // round up - 23
// console.log(Math.floor(-23.3)); // round down - 24

// ROUNDING DECIMALS
// toFixed() will always return a string, the parameter will let you specify many decimal cases you want
// console.log((2.7).toFixed(0)); // 3
// console.log((2.7).toFixed(3)); // 2.700
// console.log(+(2.345).toFixed(2)); // 2.35 already in a number

// REMINDER OPERATOR
// console.log(5 % 2); // 1 (5 == 2 + 2 + 1), being 1 the remainder of the operation
// console.log(8 % 3); // 2 (8 == 3 + 3 + 2), being 2 the remainder of the operation
// console.log(6 / 2); // 0: Remainder 0 because is a pair number

// const isEven = n => n % 2 === 0;
// console.log(isEven(8));
// console.log(isEven(23));
// console.log(isEven(514));

// NUMERIC SEPARATORS are "_" hat we can place on numbers to help the developer to read better
// const diameterSolarSystem = 287_460_000_000;
// The underscore doesn't show up in the code. We can only place it in between numbers
// console.log(diameterSolarSystem); // 287460000000

// This result in a NaN, because it won't be able to parse to a number
// console.log(Number("230_000"));

// BIG INTS
// What is the biggest number that JS can represent safely?
// console.log(2 ** 53 - 1); // 9007199254740991
// console.log(Number.MAX_SAFE_INTEGER);

// Starting from ES 2020, the primitive BigInt was added. We just need to add an "n" at the end of the number
// console.log(561651654198498498498409804654687918408408n);
// console.log(BigInt(5616516541984));

// Operations with Big Ints work just the same as other ints
// console.log(6846185468465168146n * 10000000n);
// const huge = 1686846868468496284684168464n;
// const num = 23;
// ERROR: cannot mix BigIntswith normal ints, but can be surpassed with the BigInt constructor
// console.log(huge + num); 

// We can use the BigInt contructor to mitigate this
// console.log(huge + BigInt(num)); 

// But there are exceptions
// console.log(20n > 15); // true
// console.log(20n === 20); // false
// console.log(typeof 20n); // bigint
// console.log(20n == '20'); // true

// DATES AND TIME
// Create a date
// const now = new Date();
// console.log(now);
// console.log(new Date("Dec 24 2011 11:15:23"));
// console.log(new Date(account1.movementsDates[0]));

// Although we have 10 as a month and the date is November,
// in JS the month is 0 based
// console.log(new Date(2037, 10, 19, 15, 23, 5)); 

// Initial Unix time
// console.log(new Date(0)); // Thu Jan 01 1970 01:00:00 GMT+0100 

// This is how we calculate the miliseconds for 3 days later since the creation of the initial Unix time
// 3 days * 24 hours * 60 minutes * 60 seconds * 1000 miliseconds. 
// The result of this operations (259200000) is called a Timestamp of that day
// console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Sun Jan 04 1970 01:00:00 GMT+0100

// WORKING WTH DATES
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear()), // Always use the getFullYear()!!
// console.log(future.getMonth()); // Don't forget that Months are zero based!
// console.log(future.getDate()); // Gets te Day
// console.log(future.getDay()); // Gets the day of the week. (4 - Thursday) since it starts on Sunday and is 0 based as well 
// console.log(future.getHours()); // Self explanatory
// console.log(future.getMinutes()); // Self explanatory
// console.log(future.getSeconds()); // Self explanatory
// console.log(future.toISOString());

// Timestamps are the miliseconds passed since the initial Unix time (Thu Jan 01 1970 01:00:00 GMT+0100 )
// console.log(future.getTime()); // 2142253380000
// we can reverse these miliseconds to create a date as well
// console.log(new Date (2142253380000));
// console.log(Date.now());
// We also have all the Set's versions of the Get's
// future.setFullYear(2040);
// console.log(future);

// CALCULATIONS ON DATES
const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future));

// We get the abslute difference, even if the difference is negative, and divide it by the timestamp creation value.
const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (24 * 60 * 60 * 1000);

console.log(calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4)));