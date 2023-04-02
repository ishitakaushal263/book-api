require('dotenv').config();
let db = require("./database/index.js");
let bookmodel = require("./database/books.js");
let authormodel = require("./database/authors.js");
let publicationmodel = require("./database/publications.js");

// console.log(db.books);
// console.log(db);

let express = require("express");
let app = express();

app.use(express.json());


let mongoose = require("mongoose");
let mongodb = process.env.mongodb;
mongoose.connect(mongodb,{useNewUrlParser: true , useUnifiedTopology: true}).then(()=>{
  console.log("connection established");
})




// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://ishita_kaushal:g3oCkVPnXMwL9uiM@cluster0.cxou3uq.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("book-company").collection("books").findOne({ISBN:"12345three"});
//   // perform actions on the collection object
//   collection.then((value)=>{
//       console.log(value);
//   }).catch((error)=>{
//     console.log(error);
//   })
// });
// client.close();

console.log("hiii");




app.get("/",(request,response)=>{
  return response.json({"welcome": "the book library management app"})
})

app.get("/books", async (request,response)=>{
       let books = await bookmodel.find();
       response.json(books);
})

app.get("/booksisbn/:isbn", async (request,response)=>{
      let {isbn} = request.params;
      let getspecificbook = await bookmodel.findOne({ISBN : isbn})
        
        if(getspecificbook===null){
            return response.json({ "error" : `no book found of isbn : ${isbn}`});
        }
        return response.json(getspecificbook);
});

app.get("/bookscategory/:category",async (request,response)=>{
      let {category} = request.params;
      let bookcategory = await bookmodel.find({category:category});
      if(bookcategory.length===0){
        return response.json({"error":`no category ${category} for book is found`})
      }
      return response.json(bookcategory);
});


app.get("/authors", async(request,response)=>{
  let allauthors = await authormodel.find()
     return response.json(allauthors);
})



app.get("/authors/:id",async (request,response)=>{
  let {id} = request.params;
  id = Number(id);
  let bookauthor = await authormodel.findOne({id:id});
  if(bookauthor===null){
    return response.json({"error":"no book found of this author"})
  }
  return response.json(bookauthor);
})



app.get("/authorsisbn/:isbn",async (request,response)=>{
  let {isbn}  = request.params;
  let bookforauthorisbn = await authormodel.find({books:isbn});
   if(bookforauthorisbn.length==0){
     return response.json({"error": "no author found"})
   }
   return response.json(bookforauthorisbn);
});


app.get("/publications",async (request,response)=>{
      let allpublications = await publicationmodel.find();
      return response.json(allpublications);
});

app.get("/publicationsisbn/:isbn",async (request,response)=>{
    let {isbn} = request.params;
    let publicationisbn = await publicationmodel.find({books:isbn});
    if(publicationisbn.length===0){
      return response.json({"error":"no publication found for this isbn"});
    }
    return response.json(publicationisbn);
});


//post

app.post("/book",async (request,response)=>{
     let addbook = await bookmodel.create(request.body);
     return response.json({
       book: addbook,
       message: "added successfully!"
     });
})

app.post("/author", async (request,response)=>{
  let addauthor = await authormodel.create(request.body);
  return response.json({author: addauthor, message:"author added succesfully!"});
})

app.post("/publication", async(request,response)=>{
  let publications = await publicationmodel.create(request.body);
  return response.json({publication: publications, message : "added"});
})

//put

app.put("/book-update/:isbn",async (request,response)=>{
  let {isbn} = request.params;
  let updatebook = await bookmodel.findOneAndUpdate({ISBN:isbn},request.body,{new:true});
  return response.json({updatedbook : updatebook , message: "updated succesfully!"});
 })





app.delete("/books-delete/:isbn", async(request,response)=>{
    let {isbn} = request.params;
    let deletebook = await bookmodel.deleteOne({ISBN:isbn});
    return response.json({deletebook: deletebook , message:"deleted succesfully!"});
})





app.delete("/book-author-delete/:isbn/:id", async (request,response)=>{
    let {isbn,id} = request.params;
    let deleteupdatebook = await bookmodel.findOne({ISBN:isbn});
    if (deleteupdatebook===null){
      return response.json({"error":"no book found"})
    }
    else{
      deleteupdatebook.authors.remove(id);
      let updatebook = await bookmodel.findOneAndUpdate({ISBN:isbn},deleteupdatebook,{new:true});
      return  response.json({delete:updatebook, message:"done"});
    }
});





app.listen(3000,()=>{
    console.log("express is running......");
});