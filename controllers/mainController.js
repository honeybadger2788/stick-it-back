const { v4: uuidv4 } = require('uuid');
let notes = []

module.exports = {
    notesList :  (req,res) => {
        res.json(notes)
    },
    createNote: (req,res) => {
        const note = req.body
        const id = uuidv4();
    
        const newNote = {
            ...note, id:id
        }
    
        notes.push(newNote)
        res.send(req.body)
    },
    getNote: (req,res) => {
        const idNote = req.params.idNote
        const note = notes.find((note) => note.id === idNote)
        res.json(note)
    },
    deleteNote: (req,res) => {
        const idNote = req.params.idNote
        notes = notes.filter((note) => note.id !== idNote)
        res.json(notes)
    },
    updateNote: (req,res) => {
        const idNote = req.params.idNote
        const {title, text} = req.body
        const note = notes.find((note) => note.id === idNote)
    
        if(title) note.title = title
        if(text) note.text = text
    
        res.json(note)
    },
}