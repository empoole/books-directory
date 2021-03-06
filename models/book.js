var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
    {
        title: {type: String, required: true},
        author: {type: String, required: true},
        genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
        read: {type: Boolean, required: true}
    }
);

// Virtual for book's URL
BookSchema
.virtual('url')
.get(function () {
    return '/catalog/book/' + this._id;
});

//Export model
module.exports = mongoose.model('Book', BookSchema);