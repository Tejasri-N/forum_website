import React, { useState, useEffect, useRef } from "react";
import Avatar from "react-avatar";
import ManageComments from "./ManageComments";

function ManagePosts({ user }) {
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [editPostContent, setEditPostContent] = useState("");
  const [menuOpenPostId, setMenuOpenPostId] = useState(null);
  const [postData, setPostData] = useState({
    post: "",
  });
  const [showMessage, setShowMessage] = useState({
    message: "",
    success: false,
  });

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/postApi/getPosts");
      const data = await response.json();
      if (data.status === "ok") {
        setPosts(data.posts);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPostData({
      post: value,
    });
  };

  const submitPost = async (e) => {
    e.preventDefault();
    if (!postData.post) {
      setShowMessage({ message: "Post should not be empty", success: false });
      return;
    }
    try {
      const post = postData.post;
      await fetch("http://localhost:3000/postApi/createPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: post, username: user.username }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            alert("Post created Successfully");
            setPosts((prevPosts) => [
              ...prevPosts,
              {
                post_id: data.post_id,
                post_description: post,
                username: user.username,
                posted_at: new Date().toISOString(),
              },
            ]);
            setPostData({ post: "" });
          } else {
            alert("Please enter something valid!");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleEditClick = (id, currentContent) => {
    setEditPostId(id);
    setEditPostContent(currentContent);
    setMenuOpenPostId(null);
  };

  const editPost = async () => {
    try {
      await fetch(`http://localhost:3000/postApi/post/${editPostId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_description: editPostContent }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            alert("Post updated successfully");
            setPosts((prevPosts) =>
              prevPosts.map((post) =>
                post.post_id === editPostId
                  ? { ...post, post_description: editPostContent }
                  : post
              )
            );
            setEditPostId(null);
            setEditPostContent("");
          } else {
            alert("Please enter something valid!");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error updating post", error);
    }
  };

  const cancelEdit = () => {
    setEditPostId(null);
    setEditPostContent("");
  };

  const deletePost = async (id) => {
    try {
      await fetch(`http://localhost:3000/postApi/post/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            alert("Post deleted Successfully");
            setPosts((prevPosts) =>
              prevPosts.filter((post) => post.post_id !== id)
            );
            setMenuOpenPostId(null);
          } else {
            alert("Error deleting post!");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const toggleMenu = (id) => {
    setMenuOpenPostId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full mr-6">
      <div className="w-full mx-4 p-2 border border-gray-300 rounded bg-white mb-4">
        <div className="flex items-center">
          <Avatar
            name={user.username}
            size="25"
            round={true}
            className="mr-2"
          />
          <input
            type="text"
            placeholder="Create post here..."
            className="w-full p-2 border border-gray-300 rounded"
            value={postData.post}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 border border-blue-700 rounded mt-2 ml-8"
          onClick={submitPost}
        >
          Post
        </button>
      </div>
      <div className="w-full mx-4 p-4 border border-gray-300 rounded bg-white">
        <h2 className="text-lg font-bold mb-2">Other Posts</h2>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.post_id}
              className="mb-4 p-4 border border-gray-200 rounded bg-gray-50 relative"
            >
              {editPostId === post.post_id ? (
                <div className="flex flex-col">
                  <input
                    type="text"
                    value={editPostContent}
                    onChange={(e) => setEditPostContent(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-2"
                  />
                  <div className="flex">
                    <button
                      onClick={editPost}
                      className="bg-blue-500 text-white px-4 py-2 border border-blue-700 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-red-500 text-white px-4 py-2 border border-red-700 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center border rounded-lg bg-white mb-2 mr-7">
                    <Avatar
                      name={post.username}
                      size="25"
                      round={true}
                      className="mr-2"
                    />
                    <p className="text-gray-500">{post.username}</p>
                  </div>
                  <p className="text-gray-700 m-2 font-semibold">
                    {post.post_description}
                  </p>
                  <p className="text-gray-400 text-sm m-2">
                    Posted on: {new Date(post.posted_at).toLocaleString()}
                  </p>
                  {post.username === user.username && (
                    <div className="absolute top-4 right-2">
                      <div className="hover:bg-gray-200 border-2 border-gray-400">
                        <button
                          className="flex flex-col justify-center items-center w-7 h-6 bg-transparent border-none cursor-pointer"
                          onClick={() => toggleMenu(post.post_id)}
                        >
                          <div className="w-4 h-[2px] bg-gray-500 mb-1"></div>
                          <div className="w-4 h-[2px] bg-gray-500 mb-1"></div>
                          <div className="w-4 h-[2px] bg-gray-500"></div>
                        </button>
                      </div>
                      {menuOpenPostId === post.post_id && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg z-10">
                          <button
                            onClick={() =>
                              handleEditClick(
                                post.post_id,
                                post.post_description
                              )
                            }
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deletePost(post.post_id)}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              <ManageComments postId={post.post_id} user={user} />
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}

export default ManagePosts;
