const express = require("express");

const {
  createNewComment,
  getCommentsByProductId,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

const commentsRouter = express.Router();

const authentication = require("../middleware/authentication");

commentsRouter.post("/", authentication, createNewComment);
commentsRouter.get("/:id", getCommentsByProductId);
commentsRouter.put("/:id", updateComment);
commentsRouter.delete("/:id", deleteComment);


module.exports = commentsRouter;
