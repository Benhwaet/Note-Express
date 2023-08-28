//Setup reference taken from from Activity 1, Module 11.

const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');
const { readAndAppend, readFromFile, writeToFile } = require('./helpers/fsUtils');

//const { clog } = require('./middleware/clog');

const app = express();

const PORT = 3001; //default PORT

// Import custom middleware, "cLog"
//app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));//always include as a common standard - to access public repository/folder

// to homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html')));
// to notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/pages/notes.html')));

// Wildcard route to 404.html
// app.get('*', (req, res) =>
// res.sendFile(path.join(__dirname, 'public/pages/404.html')));

// GET Route for retrieving all the notes
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

//POST route for new notes
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
   const { title, text } = req.body 
if (title && text) {
    const newNote = {
        title,
        text, 
        id: uuid(),
    };
readAndAppend(newNote, './db/notes.json');
    res.json(response);
    } else {
    res.json('Error in parsing note');
    }
});

app.get('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((notes) => notes.id !== noteId);
        writeToFile('./db/notes.json', result);
        res.json(`Item ${noteId} has been deleted`);
    });
});

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () => {console.log(`App listening at http://localhost:${PORT}`)}); 

