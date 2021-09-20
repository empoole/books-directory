var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

var BookSchema = new Schema(
    {
        title: {type: String, required: true},
        author: {type: String, required: true},
        genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
        read: {type: Boolean, required: true}
    }, opts
);

// Virtual for book's URL
BookSchema
.virtual('url')
.get(function () {
    return '/book/' + this._id;
});

//Export model
module.exports = mongoose.model('Book', BookSchema);