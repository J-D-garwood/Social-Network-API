//importing express, connection to database, and routes
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

//establishing port and app
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware for JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//listening
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`)
    })
})