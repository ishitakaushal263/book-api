let books = [
  {
    ISBN: "12345one",
    title: "getting started with mern",
    authors: [1, 2],
    language: "en",
    pubdate: "2023-03-27",
    numofpage: 230,
    category: ["fiction", "programming", "tech", "webdev"],
    publication: 1,
  },
  {
    ISBN: "12345two",
    title: "getting started with python",
    authors: [1, 2],
    language: "en",
    pubdate: "2023-03-25",
    numofpage: 239,
    category: ["fiction","tech", "webdev"],
    publication: 1,
  }
];

let authors = [
    {
        id: 1,
        name : "ishita",
        books : ["12345one","12345two"],
    },
    {
        id: 2,
        name : "kaushal",
        books : ["12345one","12345two"],
    }
];

let publications =[
    {
        id: 1,
        name: "kaushal publication",
        books : ["12345one", "12345two"],
    },
    {
        id: 2,
        name: "sharma publication",
        books : [],
    },

];

module.exports = {books , authors , publications};