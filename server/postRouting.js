const express = require("express");
const client = require("./db");

const postRoute = express.Router();

// Creating post
const createPostData = async (req, res) => {
  const { post, username } = req.body;

  if (!post || post.charAt(0) === " ") {
    return res.status(404).json({ msg: "Please enter something valid" });
  }
  try {
    const info = await client.query(
      "INSERT INTO post (post_description, username) VALUES ($1, $2)",
      [post, username]
    );
    res.json({ status: "ok" });
  } catch (error) {
    console.error(error.message);
    return res.json({ status: "error", error: "Internal server error" });
  }
};

// Edit post
const editPostData = async (req, res) => {
  const { id } = req.params;
  const { post_description } = req.body;

  if (!post_description || post_description.charAt(0) === " ") {
    return res.status(404).json({ msg: "Please enter something valid" });
  }
  try {
    const editPost = await client.query(
      "UPDATE post SET post_description = $1 WHERE post_id = $2",
      [post_description, id]
    );
    res.json({ status: "ok", msg: "Post was updated" });
  } catch (error) {
    console.error(error.message);
    return res.json({ status: "error", error: "Internal server error" });
  }
};

// Delete post
const deletePostData = async (req, res) => {
  const { id } = req.params;

  try {
    const deletePost = await client.query(
      "DELETE FROM post WHERE post_id = $1",
      [id]
    );
    res.json({ status: "ok", msg: "Post was deleted" });
  } catch (error) {
    console.error(error.message);
    return res.json({ status: "error", error: "Internal server error" });
  }
};

// Get all posts
const getPostsData = async (req, res) => {
  try {
    const allposts = await client.query("SELECT * FROM post");
    res.json({ status: "ok", posts: allposts.rows });
  } catch (error) {
    console.error(error.message);
    return res.json({ status: "error", error: "Internal server error" });
  }
};

postRoute.post("/createPost", createPostData);
postRoute.put("/post/:id", editPostData);
postRoute.delete("/post/:id", deletePostData);
postRoute.get("/getPosts", getPostsData);

module.exports = postRoute;
