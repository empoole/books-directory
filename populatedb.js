#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Book = require('./models/book')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var books = []

function bookCreate(title, author, genre, read, cb) {
  bookdetail = { 
    title: title,
    author: author,
    genre: genre,
    read: read
  }
    
  var book = new Book(bookdetail);    
  book.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Book: ' + book);
    books.push(book)
    cb(null, book)
  }  );
}

function createBooks(cb) {
    async.parallel([
        function(callback) {
            bookCreate('Good Omens', 'Neil Gaiman & Terry Pratchett', 'Fantasy', true, callback);
        },  
        function(callback) {
            bookCreate('Neverwhere', 'Neil Gaiman', 'Fantasy', true, callback);
        },
        function(callback) {
            bookCreate('American Gods', 'Neil Gaiman', 'Fantasy', true, callback);
        },
        function(callback) {
            bookCreate('The Lord of the Rings: The Fellowship of the Ring', 'JRR Tolkein', 'Fantasy', true, callback);
        },
        function(callback) {
            bookCreate('The Lord of the Rings: The Two Towers', 'JRR Tolkein', 'Fantasy', true, callback);
        },
        function(callback) {
            bookCreate('The Lord of the Rings: The Return of the Kind', 'JRR Tolkein', 'Fantasy', true, callback);
        },
        function(callback) {
            bookCreate('Area X', 'Jeff Vandermeer', 'SciFi', false, callback);
        },
        function(callback) {
            bookCreate('A Wizard of Earthsea', 'Ursula K. LeGuin', 'SciFi', false, callback);
        },
        function(callback) {
            bookCreate('Eisenhorn', 'Dan Abnett', 'SciFi', false, callback);
        },
        function(callback) {
            bookCreate('Alone with the Horrors', 'Ramsey Campbell', 'Horror', true, callback);
        }
        ],
        // optional callback
        cb);
}

async.series([
    createBooks,
],

// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



