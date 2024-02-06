'use strict';

// Live demo at: https://bankist.netlify.app/

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data for Section 11
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];


// DIFFERENT DATA for Section 12! Contains movement dates, currency and locale

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
    '2024-01-31T23:36:17.929Z',
    '2024-02-05T10:51:36.790Z',
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

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovementDate = function(date, locale){

  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0)
    return "Today";
  if (daysPassed === 1)
    return "Yesterday";
  if(daysPassed <= 7)
    return `${daysPassed} days ago`

  return new Intl.DateTimeFormat(locale).format(date);
}

const formatCurrency = function(value, locale, currency) {
  return new Intl.NumberFormat(locale, {style: "currency", currency: currency}).format(value);
}

const displayMovements = function(acc, sort = false) { // sort is an optional parameter, defaulted to false
  containerMovements.innerHTML = "";

  // We create a copy of the movements array with slice() so we dont modify the original array
  const movs = sort ? acc.movements.slice().sort((a,b) => a - b) : acc.movements;

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date (acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formatedMovement = formatCurrency(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formatedMovement}</div>
    </div>`;
    //This method accepts 2 parameter (position relative to the selected element, text). Check documentation
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

const calcDisplayBalance = function(account){
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurrency(account.balance, account.locale, account.currency);
}

const calcDisplaySummary = function(account){
  const incomes = account.movements.filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, account.locale, account.currency);

  const expenses = account.movements.filter(mov => mov < 0)
  .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(Math.abs(expenses), account.locale, account.currency);

  const interest = account.movements.filter(mov => mov > 0)
  .map(deposit => deposit * account.interestRate / 100)
  .filter(int => int >= 1) // in th case the bank only pays interest when is above 1 euro
  .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(interest, account.locale, account.currency);
}

const createUserNames = function (accs) {
  accs.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(" ").map(name => name[0]).join("");
  });
};
createUserNames(accounts);

const updateUI = function(account){
      //Display movements
      displayMovements(account);

      //Display balance
      calcDisplayBalance(account);
  
      //Display summary
      calcDisplaySummary(account);
}

let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

const startLogOutTimer = function() {

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);;

    // print the remaining time to the UI ein each call
    labelTimer.textContent = `${min}:${sec}`;

    // When 0, stop timer and logout user
    if (time === 0){
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
    // Decrease 1 second
    time--;
  };

  // Set the time in seconds
  let time = 120;

  // call the timer every second
  tick();

  const timer = setInterval(tick, 1000);
  return timer;
};


btnLogin.addEventListener("click", function(event){
  // The default behaviour in an HTML form is the page reloads when clicked the submit button.
  // With preventDefault() we can prevent the reload
  event.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if (currentAccount?.pin === +inputLoginPin.value) {
    //Display UI and Message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;

    // Current Date
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }
      
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Check if there is a timer running already
    if(timer)
      clearInterval(timer);

    timer = startLogOutTimer();

    //update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function(event) {
  event.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  // We can only request a loan if there is a movement that is higher or equal to 10% of the loan
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)){

    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
      
      //Reset the timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);

    }
  inputLoanAmount.value = "";
  
});

btnTransfer.addEventListener("click", function(event){
  event.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(acc => acc.username ===  inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = "";

  if(amount > 0 && receiverAccount && 
    currentAccount.balance >= amount && 
    receiverAccount?.username !== currentAccount.username) 
  {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    //Reset the timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnClose.addEventListener("click", function(event){
  event.preventDefault();

  if(currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value)
    {
      const index = accounts.findIndex(acc => acc.username === currentAccount.username);

      accounts.splice(index, 1);
      containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = "";
    labelWelcome.textContent = "Log in to get started";
});

let sorted = false;
btnSort.addEventListener("click", function(event){
  event.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});


// labelBalance.addEventListener('click', function(event){
//   const movementsUI = Array.from(document.querySelectorAll(".movements__value"), 
//   elem => +elem.textContent.replace("€", ""));
//   console.log(movementsUI);
// });

// labelBalance.addEventListener('click', function(){
//   [...document.querySelectorAll(".movements__row")].forEach(function(row, i){
//     if (i % 2 === 0)
//       row.style.backgroundColor = "orangered";
    
//     if (i % 3 === 0)
//       row.style.backgroundColor = "blue";
//   })
// });



