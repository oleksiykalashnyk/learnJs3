'use strict';

//Learn Array methods


// 1. filter
const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemart'];

const shortNames = names.filter((item) => {
    return item.length < 5;
});

console.log(shortNames);


// 2. map
let answers = ['IvSDn', 'AFAsfn', 'KsAFia', 'VFASFAGAasfaft'];

answers = answers.map((item) => {
    return item.toLocaleLowerCase();
});

console.log(answers);


// 3. every / some 
const num = [1, 3, '2'];

console.log(num.some((item) => {
    return typeof (item) === 'number';
}));

console.log(num.every((item) => {
    return typeof (item) === 'number';
}));


// 4. reduce

// 4.1 reduce for numbers
const arr = [3, 4, 45, 9, 4];

const res = arr.reduce((sum, item) => {
    return sum + item;
});
console.log(res); //65

// 4.2 reduce for strings
const strings = ["Apple", "Kiwi", "Banannaa!!!"];

const arrToString = strings.reduce((sum, item) => {
    return `${sum}, ${item}`;
});
console.log(arrToString);

// 4.3 NEW argument in reduce //add 3
const arr2 = [3, 4, 45, 9, 4];

const res2 = arr2.reduce((sum, item) => {
    return sum + item;
}, 3);
console.log(res2); //68


// Practice
const obj = {
    ivan: "persone",
    ann: "persone",
    dog: "animal",
    cat: "animal"
};

const
    newArr = Object.entries(obj)
    .filter(item => {
        return item[1] === "persone";
    })
    .map(item =>{
        return item[0];
    });
console.log(newArr); //return matrix (array(array))