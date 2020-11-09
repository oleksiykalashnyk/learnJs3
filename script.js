'use strict';

//Learn JSON format


//1. JSON stringify()
//   obj =>  json
const persone = {
    name: "Alexey",
    tel: "+48 123 456 789",
    parents: {
        mom: "Olga",
        dad: "Ivan"
    }
};

const jsonPersone = JSON.stringify(persone);
console.log(jsonPersone);


//2. JSON parse()
//   json =>  obj
const newPersone = JSON.parse(jsonPersone);
console.log(newPersone);

console.log("/////////////");

//3. Clone object
const cloneUser = JSON.parse(JSON.stringify(persone));

console.log(persone);
console.log(cloneUser);

//edis cloneUser.parents.mom
cloneUser.parents.mom = false;

console.log("/////////////");

console.log(persone.parents.mom);
console.log(cloneUser.parents.mom);
