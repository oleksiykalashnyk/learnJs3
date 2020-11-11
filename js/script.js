'use strict';

//Learn PROMISE



//1. New promise
const req = new Promise((resolve, reject) => {

    //simulate server request and w8 response
    setTimeout(() => {
        console.log("Create new object response");

        const product = {
            name: "2. TV",
            price: 2000
        };

        resolve(product);

    }, 2000);
});

//if  "resolve", show console message
req.then(() => {
    console.log("First request send.");
});


req.then((product) => {

    new Promise((resolve, reject) => {

            //simulate server request and w8 response
            setTimeout(() => {
                product.status = "order";
                resolve(product);
            }, 3000);

        })

        .then(data => {
            data.modify = true;
            return data;
        })

        .then(data => {
            console.log(data);
        })

        .catch(() => {
            console.error("Error");
        })

        .finally(() => {
            console.log("OK");
        });

});


//2. Promise  .all() and .race() 

const test = time => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), time);
    });
};

test(1000).then(()=>{
    console.log("1000 ms");
});

test(2000).then(()=>{
    console.log("2000 ms");
});

Promise.all([test(1000),test(2000)]).then(()=>{
    console.log("ALL - ready !!!");
});

Promise.race([test(1000),test(2000)]).then(()=>{
    console.log("RACE - work !!!");
});