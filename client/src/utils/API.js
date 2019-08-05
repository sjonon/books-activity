import axios from "axios";

export default {
  // Gets books from google api
  getBooks: function(search) {
    console.log(search);
    return axios.get("https://www.googleapis.com/books/v1/volumes?&q="+search);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    console.log(bookData)
    return axios.post("/api/books", bookData);
  },
  // Retrieves saved books
  savedBook: function() {
    return axios.get("/api/books");
  }
};
