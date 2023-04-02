let mongoose = require("mongoose");
let authorsschema = mongoose.Schema({
  id: Number,
  name: String,
  books: [String],
});
let modelauthor = mongoose.model("authors", authorsschema);
module.exports = modelauthor;
