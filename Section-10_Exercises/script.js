'use strict';

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
