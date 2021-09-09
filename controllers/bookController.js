var Book = require('../models/book');
var Genre = require('../models/genre');

var async = require('async');

const { body,validationResult } = require('express-validator');

// Home Page
exports.index = function(req, res) {
    async.parallel({
        book_count: function(callback) {
            Book.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Books Directory', error: err, data: results });
    });
};

// Display list of all books.
exports.book_list = function(req, res) {
    Book.find({}, 'title author genre read')
        // .populate('author')
        .populate('genre')
        .exec(function (err, list_books) {
            if (err) { return next(err); }
            res.render('book_list', { title: 'Book List', book_list: list_books });
        });
};

// Display detail page for a specific book.
exports.book_detail = function(req, res) {
    async.parallel({
        book: function(callback) {
            Book.findById(req.params.id).populate('genre').exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.book==null) { // No results.
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('book_detail', { title: results.book.title, book: results.book } );
    });
};

// Display book add form on GET.
exports.book_add_get = function(req, res, next) {

    // Get all authors and genres, which we can use for adding to our book.
    async.parallel({
    //     authors: function(callback) {
    //         Author.find(callback);
    //     },
        genres: function(callback) {
            Genre.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // res.render('book_form', { title: 'Add Book', authors: results.authors, genres: results.genres, book: {}, errors:[]  });
        res.render('book_form', { title: 'Add Book', genres: results.genres, book: {}, errors:[]  });
    });

};
// Handle book add on POST.
exports.book_add_post = function(req, res) {
    // Convert the genre to an array.
    (req, res, next) => {
        if(!(req.body.genre instanceof Array)){
            if(typeof req.body.genre ==='undefined')
            req.body.genre = [];
            else
            req.body.genre = new Array(req.body.genre);
        }
        next();
    },

    // Validate and sanitise fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('genre.*').escape(),
    body('read', 'Read is required.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var book = new Book(
          { title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            read: req.body.read
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            // res.render('book_form', { title: 'Add Book', book: book, errors: errors.array() });
            // Get all authors and genres for form.
            async.parallel({
            //     authors: function(callback) {
            //         Author.find(callback);
            //     },
                genres: function(callback) {
                    Genre.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                // Mark our selected genres as checked.
                for (let i = 0; i < results.genres.length; i++) {
                    if (book.genre.indexOf(results.genres[i]._id) > -1) {
                        results.genres[i].checked='true';
                    }
                }
                // res.render('book_form', { title: 'Create Book',authors:results.authors, genres:results.genres, book: book, errors: errors.array() });
                res.render('book_form', { title: 'Create Book', genres:results.genres, book: book, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save book.
            book.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to new book record.
                   res.redirect(book.url);
                });
        }
    }
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};