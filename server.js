//Setup and most comments from Activity 1, Module 11.


const express = require('express');
const path = require('path');
const noteData = require('./db/db.json')

const app = express();

const PORT = process.env.PORT || 3005; //default PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));//always include as a common standard - to access public repository/folder

// to HTML
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/pages/notes.html')));

// // API routes
// app.get('/api/notes', (req, res) => {
//     res.json(dbData);
//       // Coerce the specific search term to lowercase
//     const requestedNote = req.params.noteId.toLowerCase();
//  // Iterate through the notes name to check if it matches `req.params.notes`
//  for (let i = 0; i < noteData.length; i++) {
//     if (requestedNote === noteData[i].note.toLowerCase()) {
//       return res.json(noteData[i]);
//     }
//   }
 
//   // Return a message if the term doesn't exist in our DB
//   return res.json('No match found');
//  });

// app.post('/api/notes', (req, res) => 
//     res.send('POST request to API/Notes'));

// app.delete('/api/notes/:id', (req, res) => {
//     res.send('DELETE request to API/Notes/:id');


//  // Iterate through the terms name to check if it matches `req.params.term`
//  for (let i = 0; i < noteData.length; i++) {
//    if (requestedNote === noteData[i].note.toLowerCase()) {
//      return res.json(noteData[i]);
//    }
//  }

//  // Return a message if the term doesn't exist in our DB
//  return res.json('No match found');
// });

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () => {console.log(`App listening at http://localhost:${PORT}`)}); 

