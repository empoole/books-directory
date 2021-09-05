var express = require('express');
var router = express.Router();

// Require controller modules.
var book_controller = require('../controllers/bookController');

/// ROUTES ///

// GET catalog home page.
router.get('/', book_controller.index);

// GET request for list of all Book items.
router.get('/books', book_controller.book_list);

// GET request for adding a Book.
router.get('/book/add', book_controller.book_add_get);

// POST request for adding Book.
router.post('/book/add', book_controller.book_add_post);

// GET request to delete Book.
router.get('/book/:id/delete', book_controller.book_delete_get);

// POST request to delete Book.
router.post('/book/:id/delete', book_controller.book_delete_post);

// GET request to update Book.
router.get('/book/:id/update', book_controller.book_update_get);

// POST request to update Book.
router.post('/book/:id/update', book_controller.book_update_post);

// GET request for one Book.
router.get('/book/:id', book_controller.book_detail);

module.exports = router;
