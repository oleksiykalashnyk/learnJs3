'use strict';

//Learn Fetch API

//Easy type request for server vs fetch
fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(ax => ax.json())
    .then(d => console.log(d));

//But if need POST "data" or other type requests need use this
fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        body: JSON.stringify({
            id: "1"
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(json => console.log(json));