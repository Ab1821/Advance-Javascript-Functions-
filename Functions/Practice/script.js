'use strict';
const bookings = [];
const createBooking = function (flightNum, numPassangers, price) {

    const booking = {
        flightNum, numPassangers, price


    }
    console.log(booking);
    bookings.push(booking);

}
createBooking('Lh123');
createBooking('xy234', 2, 50);

const flight = 'Lh234';
const abhi = {
    fname: 'Abhishek',
    passport: 123456789

}
const checkIn = function (flightNum, passenger) {
    flightNum = '909';
    passenger.fname = ' Mr. ' + passenger.fname;
    if (passenger.passport === 123456789) {
        alert('Checked In');
    } else {
        alert('wrong passport');
    }

};
// checkIn(flight, abhi);
// console.log(abhi);
// console.log(flight);

const newpassport = function (person) {
    person.passport = Math.trunc(Math.random() * 100000000);
};
newpassport(abhi);
checkIn(flight, abhi);

// ------Higher order function------//

const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
}

const UpperFirst = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
}

const transformer = function (str, fn) {
    console.log(`Original string :${str}`);
    console.log(`Transformed String : ${fn(str)}`);

}
// JS uses Callback functions all the time 

transformer('javaScript is the BEST language', UpperFirst);
transformer('javaScript is the BEST language', oneWord);

// -----function calling another function-----//

// const greet = function (greeting) {
//     return function (name) {
//         console.log(`${greeting} ${name}`);
//     }
// }
const GreetMe = greet('Hello, Good morning !!');
GreetMe('Abhishek');

// --- using arrow function---//

const greet = greeting => myname => console.log(`${greeting} ${myname}`);
greet('hey')('abhi');

const lufthansa = {

    airline: 'Lufthansa',
    code: 'LH',
    booking: [],
    // book : function {} // ----enhanced object literals
    book(flightNum, pName) {

        console.log(`${pName} booked a seat on ${this.airline} flight ${this.code}${flightNum}`);
        this.booking.push(`${flightNum}: ${pName}`);
    }
}
lufthansa.book(234, 'abhishek');
lufthansa.book(145, 'deep');
console.log(lufthansa);

const eurowings = {

    airline: 'Eurowings',
    code: 'EW',
    booking: [],
}
const book = lufthansa.book;

// -----------------call method---------------//

// book(456, 'pillu'); // <--- does  not work
book.call(eurowings, 456, 'Pillu');
book.call(lufthansa, 678, 'gotyo');
console.log(lufthansa);

//---------appply method-----------------------//


const flightData = [567, 'shiva'];

book.apply(eurowings, flightData);
console.log(eurowings, flightData);

// apply method is  no more used in moderJS//instead

book.call(eurowings, ...flightdataa);


//-----Bind method-----//  



const bookEW = book.bind(eurowings);
bookEW(777, 'bablu pandit');

const bookLZ = book.bind(lufthansa);
bookLZ(909, 'Chota chetan');

//-----with event listener -----//


lufthansa.planes = 300;
lufthansa.buyPlanes = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
};
// lufthansa.buyPlanes();

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlanes.bind(lufthansa));

// --partial application---//

// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23); // no need for "this keyword", so "Null "
// console.log(addVAT(200));


// example fucntion calling function

const addTaxRate = function (rate) {
    return function (Value) {
        return Value + Value * rate;
    }
}
const addVAT = addTaxRate(0.23);
console.log(addVAT(100));


// ----------------Challenge 1--------------//


// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),

    registerNewAnswer() {

        //to get the answer         
        const answer = Number(
            prompt(`${this.question} \n${this.options.join(' \n')} \n(Write option number)`)
        );
        console.log(answer);

        //to Update the array with answer

        typeof answer === 'number' && answer < this.answers.length && this.answers[answer]++;
        // console.log(this.answers);
        // this.displayResults();
        this.displayResults('string');
    },

    displayResults(type = 'array') {

        if (type === 'array') {
            console.log(this.answers);
        }
        else {
            console.log(`Poll results are : ${this.answers.join(', ')}`);
        }

    }
};
// poll.registerNewAnswer();

//document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

//Bonus// BONUS TEST DATA 1: [5, 2, 3]

// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');



// ------immediately invoked function expression------//


const runOnce = function () { console.log('This will not run once') };
runOnce();


// this is function expression --- we wraped it inside () to make it statement and call it using '()' only

(function () {
    console.log('This will run once (using function expression)');
})();

//same for arrow function
(() => {
    console.log('This will run once (using Arrow function)');
})();



// -----------Closure---------//

const passengerBooking = function () {
    let passengerCount = 0;

    return function () {
        passengerCount++;
        console.log(`${passengerCount} Passenger`);
    };
};
const booker = passengerBooking(); // after this call, passengerBooking is no longer in VE,
booker();                          //but booker has its instance, bcz there is where is as created 
booker();


// MORE example of CLOSURE//


let f;
const g = function () {
    const a = 23;
    f = function () {
        console.log(a * 2);
    }

}
g();               // after this VE of 'g function' is no longer there,but f is closed over that VE,
f();                // therefor able to access 'a' variable
// ('a' variable is inside the backpack of 'f' function)

// Example  2 for closure//

const boaredPassengers = function (n, wait) {
    const pergroup = n / 3;


    setTimeout(function () {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${pergroup} passengers`);
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds`);
};
const pergroup = 1000;
boaredPassengers(180, 3);

// ------------challenege 2---------------//

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';

    document.body.addEventListener('click', function () { //how this function uses the "header" variable
        header.style.color = 'blue'                             // bcz of "closure" 
    });

})();