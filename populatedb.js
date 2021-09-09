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
var Genre = require('./models/genre')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var books = []
var genres = []

function genreCreate(name, cb) {
    var genre = new Genre({ name: name });
         
    genre.save(function (err) {
      if (err) {
        cb(err, null);
        return;
      }
      console.log('New Genre: ' + genre);
      genres.push(genre)
      cb(null, genre);
    }   );
  }

function bookCreate(title, author, genre, read, cb) {
  bookdetail = { 
    title: title,
    author: author,
    read: read
  }
  if (genre != false) bookdetail.genre = genre

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


function createGenreAuthors(cb) {
    async.series([
        // function(callback) {
        //   authorCreate('Patrick', 'Rothfuss', '1973-06-06', false, callback);
        // },
        // function(callback) {
        //   authorCreate('Ben', 'Bova', '1932-11-8', false, callback);
        // },
        // function(callback) {
        //   authorCreate('Isaac', 'Asimov', '1920-01-02', '1992-04-06', callback);
        // },
        // function(callback) {
        //   authorCreate('Bob', 'Billings', false, false, callback);
        // },
        // function(callback) {
        //   authorCreate('Jim', 'Jones', '1971-12-16', false, callback);
        // },
        function(callback) {
          genreCreate("Fantasy", callback);
        },
        function(callback) {
          genreCreate("Science Fiction", callback);
        },
        function(callback) {
          genreCreate("Horror", callback);
        },
        ],
        // optional callback
        cb);
}

function createBooks(cb) {
    async.parallel([
        function(callback) {
            bookCreate('Good Omens', 'Neil Gaiman & Terry Pratchett', [genres[0],], true, callback);
        },  
        function(callback) {
            bookCreate('Neverwhere', 'Neil Gaiman', [genres[0],], true, callback);
        },
        function(callback) {
            bookCreate('American Gods', 'Neil Gaiman', [genres[0],], true, callback);
        },
        function(callback) {
            bookCreate('The Lord of the Rings: The Fellowship of the Ring', 'JRR Tolkein', [genres[0],], true, callback);
        },
        function(callback) {
            bookCreate('The Lord of the Rings: The Two Towers', 'JRR Tolkein', [genres[0],], true, callback);
        },
        function(callback) {
            bookCreate('The Lord of the Rings: The Return of the King', 'JRR Tolkein', [genres[0],], true, callback);
        },
        function(callback) {
            bookCreate('Area X', 'Jeff Vandermeer', [genres[1],genres[2],], false, callback);
        },
        function(callback) {
            bookCreate('A Wizard of Earthsea', 'Ursula K. LeGuin', [genres[1],], false, callback);
        },
        function(callback) {
            bookCreate('Eisenhorn', 'Dan Abnett', [genres[1],], true, callback);
        },
        function(callback) {
            bookCreate('Alone with the Horrors', 'Ramsey Campbell', [genres[2],], true, callback);
        }
        ],
        // optional callback
        cb);
}

async.series([
    createBooks,
    createGenreAuthors
],

// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



