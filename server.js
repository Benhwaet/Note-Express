//Setup reference taken from from Activity 1, Module 11.

const express = require('express');
const path = require('path');
const api = require('./routes/index')
const app = express();

const PORT = process.env.PORT || 3006; //default PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api)

app.use(express.static('public'));//always include as a common standard - to access public repository/folder

// to homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html')));
// to notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/pages/notes.html')));
// Wildcard route to 404.html
// app.get('*', (req, res) =>
// res.sendFile(path.join(__dirname, 'public/pages/404.html')));

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () => {console.log(`App listening at http://localhost:${PORT}`)}); 

