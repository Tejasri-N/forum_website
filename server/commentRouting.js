const express = require("express");
const client = require("./db");

const commentRoute = express.Router();

// Create comment
const createComment = async (req, res) => {
  const { postId, comment, username } = req.body;
  try {
    const newComment = await client.query(
      "INSERT INTO comments (post_id, comment_description, username) VALUES ($1, $2, $3) RETURNING *",
      [postId, comment, username]
    );
    res.status(200).json({ status: "ok", comment: newComment.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", error: "Error creating comment" });
  }
};

// Get all comments for a post
const getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await client.query(
      "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC",
      [postId]
    );
    res.status(200).json({ status: "ok", comments: comments.rows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", error: "Error fetching comments" });
  }
};

// Update comment
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { comment_description } = req.body;

  if (!comment_description || comment_description.trim().length === 0) {
    return res
      .status(400)
      .json({ status: "error", error: "Comment should not be empty" });
  }

  try {
    const updatedComment = await client.query(
      "UPDATE comments SET comment_description = $1 WHERE comment_id = $2 RETURNING *",
      [comment_description, id]
    );
    if (updatedComment.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", error: "Comment not found" });
    }
    res.status(200).json({ status: "ok", comment: updatedComment.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", error: "Error updating comment" });
  }
};

// Delete comment
const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await client.query(
      "DELETE FROM comments WHERE comment_id = $1 RETURNING *",
      [id]
    );
    if (deletedComment.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", error: "Comment not found" });
    }
    res.status(200).json({ status: "ok", msg: "Comment deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", error: "Error deleting comment" });
  }
};

commentRoute.post("/createComment", createComment);
commentRoute.get("/getComments/:postId", getComments);
commentRoute.put("/updateComment/:id", updateComment);
commentRoute.delete("/deleteComment/:id", deleteComment);

module.exports = commentRoute;
