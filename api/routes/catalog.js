const express = require('express');
const router = express.Router();

// Require controller modules.
const book_controller = require('../controllers/bookController');
const genre_controller = require('../controllers/genreController');

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

/// GENRE ROUTES ///

// GET request for adding a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/add', genre_controller.genre_add_get);

//POST request for adding Genre.
router.post('/genre/add', genre_controller.genre_add_post);

// GET request to delete Genre.
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// GET request to update Genre.
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', genre_controller.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list of all Genre.
router.get('/genres', genre_controller.genre_list);

module.exports = router;
