let mongoose = require("mongoose");
let publicationschema = mongoose.Schema({
    id: Number,
    name: String,
    books : [String],
})
let modelpublications = mongoose.model("publications",publicationschema );
module.exports = modelpublications;