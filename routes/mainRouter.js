const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController')

router.get('/', mainController.notesList);

router.post('/', mainController.createNote);

router.get('/:idNote', mainController.getNote);

router.delete('/:idNote', mainController.deleteNote);

router.patch('/:idNote', mainController.updateNote);


module.exports = router;