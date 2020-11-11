'use strict';

//Learn AJAX

const
    inputRub = document.querySelector("#rub"),
    inputUsd = document.querySelector("#usd");

inputRub.addEventListener("input", () => {

    const request = new XMLHttpRequest();

    request.open("GET", "js/current.json");
    request.setRequestHeader('Content-type', "application/json", "charset=utf-8");
    request.send();


    //First type add event for request "rearystatechange"
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            const data = JSON.parse(request.response);
            inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
        } else {
            inputUsd.value = "Problem in server";
        }
    });

    //Second type listen event for request => "load"
    request.addEventListener("load", () => {
        if (request.readyState === 4) {
            const data = JSON.parse(request.response);
            inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
        } else {
            inputUsd.value = "Problem in server";
        }
    });
});