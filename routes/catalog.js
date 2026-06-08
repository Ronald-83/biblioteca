const express = require("express");

// Require our controllers.
const book_controller = require("../controllers/tutorial/bookController");
const author_controller = require("../controllers/tutorial/authorController");
const genre_controller = require("../controllers/tutorial/genreController");
const book_instance_controller = require("../controllers/tutorial/bookinstanceController");
const playlist_controller = require("../controllers/playlistController");

const router = express.Router();

/// BOOK ROUTES ///

// GET catalog home page.
router.get("/", book_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/book/create", book_controller.book_create_get);

// POST request for creating Book.
router.post("/book/create", book_controller.book_create_post);

// GET request to delete Book.
router.get("/book/:id/delete", book_controller.book_delete_get);

// POST request to delete Book.
router.post("/book/:id/delete", book_controller.book_delete_post);

// GET request to update Book.
router.get("/book/:id/update", book_controller.book_update_get);

// POST request to update Book.
router.post("/book/:id/update", book_controller.book_update_post);

// GET request for one Book.
router.get("/book/:id", book_controller.book_detail);

// GET request for list of all Book.
router.get("/books", book_controller.book_list);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/author/create", author_controller.author_create_get);

// POST request for creating Author.
router.post("/author/create", author_controller.author_create_post);

// GET request to delete Author.
router.get("/author/:id/delete", author_controller.author_delete_get);

// POST request to delete Author
router.post("/author/:id/delete", author_controller.author_delete_post);

// GET request to update Author.
router.get("/author/:id/update", author_controller.author_update_get);

// POST request to update Author.
router.post("/author/:id/update", author_controller.author_update_post);

// GET request for one Author.
router.get("/author/:id", author_controller.author_detail);

// GET request for list of all Authors.
router.get("/authors", author_controller.author_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", genre_controller.genre_create_get);

// POST request for creating Genre.
router.post("/genre/create", genre_controller.genre_create_post);

// GET request to delete Genre.
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

// GET request to update Genre.
router.get("/genre/:id/update", genre_controller.genre_update_get);

// POST request to update Genre.
router.post("/genre/:id/update", genre_controller.genre_update_post);

// GET request for one Genre.
router.get("/genre/:id", genre_controller.genre_detail);

// GET request for list of all Genre.
router.get("/genres", genre_controller.genre_list);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get(
  "/bookinstance/create",
  book_instance_controller.bookinstance_create_get
);

// POST request for creating BookInstance.
router.post(
  "/bookinstance/create",
  book_instance_controller.bookinstance_create_post
);

// GET request to delete BookInstance.
router.get(
  "/bookinstance/:id/delete",
  book_instance_controller.bookinstance_delete_get
);

// POST request to delete BookInstance.
router.post(
  "/bookinstance/:id/delete",
  book_instance_controller.bookinstance_delete_post
);

// GET request to update BookInstance.
router.get(
  "/bookinstance/:id/update",
  book_instance_controller.bookinstance_update_get
);

// POST request to update BookInstance.
router.post(
  "/bookinstance/:id/update",
  book_instance_controller.bookinstance_update_post
);

// GET request for one BookInstance.
router.get("/bookinstance/:id", book_instance_controller.bookinstance_detail);

// GET request for list of all BookInstance.
router.get("/bookinstances", book_instance_controller.bookinstance_list);

/// JOGADOR ROUTES ///

// GET request for list of all Jogadores.
router.get("/jogadores", playlist_controller.jogador_list);

// GET request for creating a Jogador. NOTE This must come before route that displays Jogador (uses id).
router.get("/jogador/create", playlist_controller.jogador_create_get);

// POST request for creating Jogador.
router.post("/jogador/create", playlist_controller.jogador_create_post);

// GET request to delete Jogador.
router.get("/jogador/:id/delete", playlist_controller.jogador_delete_get);

// POST request to delete Jogador.
router.post("/jogador/:id/delete", playlist_controller.jogador_delete_post);

// GET request to update Jogador.
router.get("/jogador/:id/update", playlist_controller.jogador_update_get);

// POST request to update Jogador.
router.post("/jogador/:id/update", playlist_controller.jogador_update_post);

// GET request for one Jogador.
router.get("/jogador/:id", playlist_controller.jogador_detail);

/// CLUBE ROUTES (nested under jogador) ///

// GET request for creating a Clube in a Jogador.
router.get(
  "/jogador/:id/clube/create",
  playlist_controller.clube_create_get
);

// POST request for creating Clube in a Jogador.
router.post(
  "/jogador/:id/clube/create",
  playlist_controller.clube_create_post
);

// GET request to delete Clube from Jogador.
router.get(
  "/jogador/:id/clube/:clubeId/delete",
  playlist_controller.clube_delete_get
);

// POST request to delete Clube from Jogador.
router.post(
  "/jogador/:id/clube/:clubeId/delete",
  playlist_controller.clube_delete_post
);

// GET request to update Clube in Jogador.
router.get(
  "/jogador/:id/clube/:clubeId/update",
  playlist_controller.clube_update_get
);

// POST request to update Clube in Jogador.
router.post(
  "/jogador/:id/clube/:clubeId/update",
  playlist_controller.clube_update_post
);

module.exports = router;
