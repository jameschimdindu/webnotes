const path= require('path');
const express = require('express')
const notesRouter = express.Router()

const controllersDirectoryPath = path.join(process.cwd(), './controllers');
const NoteController = require(path.join(controllersDirectoryPath, './NoteController'));

const theNoteController = new NoteController();

// GET methods /////////////////////////////////////
notesRouter.get('/index', theNoteController.getIndex);
// this route fetches the form to fill in
notesRouter.get('/create', theNoteController.getCreate);
// this route fetches the form with the selected title to edit
notesRouter.get('/update/:title', theNoteController.getUpdate);
// this route fetches the form with the selected title to remove
notesRouter.get('/delete/:title', theNoteController.getDelete);

// POST methods /////////////////////////////////////
// this route sends back the form to the server
notesRouter.post('/create', theNoteController.postCreate);
// this route sends back the form with the selected title to the server
notesRouter.post('/update/:title', theNoteController.postUpdate);
// this route also sends back the form with the selected title to the server for removal
notesRouter.post('/delete/:title', theNoteController.postDelete);

module.exports = notesRouter;