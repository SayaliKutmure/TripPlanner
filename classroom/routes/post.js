const express = require("express");
const router = express.Router();

// Index route - show all posts
router.get("/", (req, res) => {
  res.send("GET: show all posts");
});

// Show route - show one post by ID
router.get("/:id", (req, res) => {
  res.send(`GET: show post with ID ${req.params.id}`);
});

// Create route - add a new post
router.post("/", (req, res) => {
  res.send("POST: create a new post");
});

// Delete route - delete post by ID
router.delete("/:id", (req, res) => {
  res.send(`DELETE: delete post with ID ${req.params.id}`);
});

module.exports = router;
