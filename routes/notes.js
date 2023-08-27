//Used module 11, mini-project as template
const notes = require('express').Router();
const { v4: uuid } = require('../helpers/uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');


// GET Route for retrieving all the notes
notes.get('/api/notes', (req, res) => {
readFromFile('/db/db.json').then((data) => res.json(JSON.parse(data)))
});

notes.get('/api/notes/:id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('../db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.note_id === noteId);
        return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

notes.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('/db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((notes) => notes.note_id !== noteId);
        writeToFile('/db/db.json', result);
        res.json(`Item ${noteId} has been deleted`);
    });
});

//POST route for new notes
notes.post('/api/notes', (req, res) => {
    console.log(req.params.note)
   const { title, text } = req.params.note 
if (req.params.note) {
    const newNote = {
        title,
        text, 
        note_id: uuid(),
    };

readAndAppend(newNote, '/db/db.json');
    res.json(response);
    } else {
    res.json('Error in parsing note');
    }
});

module.exports = notes;