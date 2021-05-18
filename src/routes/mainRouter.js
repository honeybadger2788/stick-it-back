const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController')

router.get('/', mainController.notesList);

router.get('/search', mainController.search);

router.post('/create', mainController.createNote);

router.get('/delete/:idNote', mainController.deleteNote);

router.patch('/update/:idNote', mainController.updateNote);

router.get('/:idNote', mainController.getNote);

module.exports = router;