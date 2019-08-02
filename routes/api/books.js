const router = require("express").Router();
const booksController = require("../../controllers/booksController");
const API_KEY =`${process.env.REACT_APP_API_KEY_YT}`
// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);


module.exports = router;
