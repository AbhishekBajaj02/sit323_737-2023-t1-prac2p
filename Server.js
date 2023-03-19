const { json } = require( 'express');
const express = require('express');
const app = express();

//Need to import Express libraries to read POST body data (e.g. req.body)
app.use(express.json());
app.use(express.urlencoded());

//Our Users

let users = [
    { id: 1, name: 'Abhi' },
    { id: 2, name: 'Rohit' },
    { id: 3, name: 'Bob' }
];

//Start an instance of our Express server, listening on port 3000
app.listen(3000, () => {
    console.log('Note: My Server is now listening on port 3000');
})

//Home page request
//curl http://localhost:3000/
app.get( '/', (req, res) => {
    res.send("Hello mate, thats my server for SIT323 Task 2.1P!!!");
});

app.get( '/users', (req, res) => {
    res.json(users);
});