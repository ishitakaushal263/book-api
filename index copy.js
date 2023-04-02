let db = require("./database/index.js");

// console.log(db.books);
// console.log(db);

let express = require("express");
let app = express();

app.use(express.json());


let mongoose = require("mongoose");
let mongodb = "mongodb+srv://ishita_kaushal:g3oCkVPnXMwL9uiM@cluster0.cxou3uq.mongodb.net/book-company?retryWrites=true&w=majority"
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

app.get("/books",(request,response)=>{
    //    let books = db.books;
       response.json(db.books);
})

app.get("/booksisbn/:isbn",(request,response)=>{
      let {isbn} = request.params;
      let getspecificbook = db.books.filter((book)=>{
        if(book.ISBN===isbn){
            return book;
        }
      }); 
        if(getspecificbook.length===0){
            return response.json({ "error" : `no book found of isbn : ${isbn}`});
        }
        return response.json(getspecificbook);
});

app.get("/bookscategory/:category",(request,response)=>{
      let {category} = request.params;
      let bookcategory = db.books.filter((book)=>{
            if(book.category.includes(category)){
                return book;
            }
      })
      if(bookcategory.length===0){
        return response.json({"error":`no category ${category} for book is found`})
      }
      return response.json(bookcategory);
});


app.get("/authors",(request,response)=>{
     return response.json(db.authors)
})



app.get("/authors/:id",(request,response)=>{
  let {id} = request.params;
  id = Number(id);
  let bookauthor = db.books.filter((author)=>{
    if(author.authors.includes(id)){
      return author;
    }
  })
  if(bookauthor.length===0){
    return response.json({"error":"no book found of this author"})
  }
  return response.json(bookauthor);
})



app.get("/authorsisbn/:isbn",(request,response)=>{
  let {isbn}  = request.params;
   let bookforauthorisbn = db.authors.filter((author)=>{
        if (author.books.includes(isbn)){
              return author;
        }
   })
   if(bookforauthorisbn.length==0){
     return response.json({"error": "no author found"})
   }
   return response.json(bookforauthorisbn);
});


app.get("/publications",(request,response)=>{
      return response.json(db.publications);
});

app.get("/publicationsisbn/:isbn",(request,response)=>{
    let {isbn} = request.params;
    let publicationisbn = db.publications.filter((pub)=>{
      if(pub.books.includes(isbn)){
        return pub;
      }
    })
    if(publicationisbn.length===0){
      return response.json({"error":"no publication found for this isbn"});
    }
    return response.json(publicationisbn);
});


//post

app.post("/book",(request,response)=>{
     db.books.push(request.body);
     return response.json(db.books);
})

app.post("/author",(request,response)=>{
  db.authors.push(request.body);
  return response.json(db.authors);
})

app.post("/publication",(request,response)=>{
  db.publications.push(request.body);
  return response.json(db.publications);
})

app.put("/book-update/:isbn",(request,response)=>{
  let {isbn} = request.params;
  let updatebook = db.books.forEach((book)=>{
    if(book.ISBN === isbn ){
      return {...book,...request.body}
    }
    return book;
  })
  return response.json(db.books);
})




app.delete("/books-delete/:isbn",(request,response)=>{
    let {isbn} = request.params;
    let deletebook = db.books.filter((book)=>{
         if (book.ISBN!==isbn){
              return book;
         }
    })
    db.books = deletebook;
    console.log(deletebook);
    return response.json(db.books);
})





app.delete("/book-author-delete/:isbn/:id",(request,response)=>{
    let {isbn,id} = request.params;
    id = Number(id);
    let foreachbooks = db.books.forEach((book)=>{
         if(book.ISBN===isbn){
           if(!book.authors.includes(id)){
            return;
           }
           book.authors = book.authors.filter((idd)=>{
                if(idd!==id){
                   return;
                }
           });
           return book;
         }
         return book;
    })
    return response.json(db.books);
})





app.listen(3000,()=>{
    console.log("express is running......");
});