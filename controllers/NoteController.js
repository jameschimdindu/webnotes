const path = require('path');
const NoteManager = require(path.join(process.cwd(), './NoteManager.js'));

class NoteController {
    constructor() {
        this.noteManager = new NoteManager('notes.json');
    }

    getIndex = (req, res)=> {
        try {
            const allNotes = this.noteManager.loadNotes();
            
            // set the context objects property 'notes' with 'allNotes'
            // it is the property 'notes' that the handlebar view noteIndex uses
            res.render('notes/noteIndex', {notes: allNotes});
            
        } catch (error) {
            console.log(error);
            res.render('notes/noteIndex', {notes: []});
        }
    }

    getCreate = (req, res, next) => {
        try {
            // tell the helper that we are doing an Create => humans has selected Add
            // so the mode is 'Add'
            // and no note given => ==null
            const info = { mode: 'Add'};
            this.renderForm(res, info, null);
        } catch(error) {
            console.log(error);
            res.redirect('back');
        }
    }

    getDelete = (req, res, next) => {
        try {
            // the req ALWAYS contain the unique instance app so all data that we put there is accessable
            // here we just check that a user is inlogged and of 'type' admin. Simulated 
            if(req.app.locals.user && req.app.locals.user.username == 'admin') {
                const title = req.params.title;
                
                const selectedNote = this.noteManager.getNoteByTitle(title);
                if(selectedNote) {
                    const info = { mode: 'Remove'};
                    // have made a separate form for removal
                    res.render('notes/noteDeleteForm', {  mode: info.mode, title : selectedNote.title, body: selectedNote.body});
                }
                else
                    res.redirect('back');
            } else {
                res.redirect('back');
            }
        } catch(error) {
            console.log(error);
            res.redirect('back');
        }
    }

    postDelete = (req, res) => {
        // in this specific case, with action="" in the form, it will post to the same path as the get,
        // this means that we also get the title in reg.params.title. Could be used for verify that the params and body contain the same value!
        
        // the req ALWAYS contain the unique instance app so all data that we put there is accessable
        // here we just check that a user is inlogged and of 'type' admin. Simulated 
        if(req.app.locals.user && req.app.locals.user.username == 'admin') {
            
            // pick out the data from the form sent
            // form send its data in the body!
            const {
                title,
            }  = req.body;
            
            if(title) {  
                this.noteManager.removeNote( title);
                res.redirect('/notes/index');
            } else {
                // there are errors with the entered values. Render the form again.
                res.redirect('back');
            } 
        } else {
            // the user is not the admin
            res.redirect('back');
        }      
    }

    postCreate = (req, res) => {
        // pick out the data from the form sent
        // form send its data in the body!
        const {
            title,
            body,
        }  = req.body;
        
        if(title && body ) {  
            const storedNote = this.noteManager.addNote( title, body);
            if(storedNote)
                res.redirect('/notes/index');
            else
                res.redirect('back');
        } else {
            // there are errors with the entered values. Render the form again.
            res.redirect('back');
        }      
    }
    
    getUpdate = (req, res, next) => {
        try {
            // the :title parameter from the route : app.get('/notes/update/:title', theNoteController.getUpdate);
            // is stored in req.params. title. IE :title => title and so on
            const title = req.params.title;

            const selectedNote = this.noteManager.getNoteByTitle(title);
            if(selectedNote) {
                // tell the helper that we are doing an Update => humans has selected Edit
                // so the mode is 'Edit'
                // and the selected note => == selectedNote
                const info = { mode: 'Edit'};
                this.renderForm(res, info, selectedNote);
            }
            else
                res.redirect('back');
        } catch(error) {
            console.log(error);
            res.redirect('back');
        }
    }

    postUpdate = (req, res) => {
        // in this specific case, with action="" in the form, it will post to the same path as the get,
        // this means that we also get the title in reg.params.title. Could be used for verify that the params and body contain the same value!
        
        // pick out the data from the form sent
        // form send its data in the body!
        const {
            title,
            body,
        }  = req.body;
        
        if(title && body ) {  
            const updatedNote = this.noteManager.changeNote(title, body);
            if(updatedNote)
                res.redirect('/notes/index');
            else
                res.redirect('back');
        } else {
            // there are errors with the entered values. Render the form again.
            res.redirect('back');
        }      
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // helpers
    renderForm = (res, info, note ) => {
        if( note )
            res.render('notes/noteForm', { mode: info.mode, title: note.title, body: note.body } );
        else 
            res.render('notes/noteForm', {  mode: info.mode, title : '', body: ''});
    
        return;   
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////
}

module.exports = NoteController;