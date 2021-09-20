var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

var GenreSchema = new Schema(
    {
        name: {type: String, required: true, maxlength: 100, minlength: 3},
    }, opts
);

// Virtual for book's URL
GenreSchema
.virtual('url')
.get(function () {
    return '/genre/' + this._id;
});

//Export model
module.exports = mongoose.model('Genre', GenreSchema);