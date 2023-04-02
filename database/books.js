let mongoose = require("mongoose");

let booksschema = mongoose.Schema({
    ISBN: String,
    title: String,
    authors: [Number],
    language: String,
    pubdate: String,
    numofpage: Number,
    category: [String],
    publication: Number,
});

let modelbook = mongoose.model("books", booksschema);
module.exports = modelbook;