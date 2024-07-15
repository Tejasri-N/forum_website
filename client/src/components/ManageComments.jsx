import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";

function ManageComments({ postId, user }) {
  const [comments, setComments] = useState([]);
  const [commentData, setCommentData] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState("");
  const [menuOpenCommentId, setMenuOpenCommentId] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/commentApi/getComments/${postId}`
      );
      const data = await response.json();
      if (data.status === "ok") {
        setComments(data.comments);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching comments", error);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentData) {
      alert("Comment should not be empty");
      return;
    }
    try {
      await fetch("http://localhost:3000/commentApi/createComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          comment: commentData,
          username: user.username,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            setComments((prevComments) => [
              ...prevComments,
              {
                comment_id: data.comment_id,
                comment_description: commentData,
                username: user.username,
                created_at: new Date().toISOString(),
              },
            ]);
            setCommentData("");
            alert("Your comment is submitted");
          } else {
            alert("Please enter something valid!");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleEditClick = (id, currentContent) => {
    setEditCommentId(id);
    setEditCommentContent(currentContent);
    setMenuOpenCommentId(null);
  };

  const editComment = async () => {
    try {
      await fetch(
        `http://localhost:3000/commentApi/updateComment/${editCommentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment_description: editCommentContent,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            alert("Comment updated successfully");
            setComments((prevComments) =>
              prevComments.map((comment) =>
                comment.comment_id === editCommentId
                  ? { ...comment, comment_description: editCommentContent }
                  : comment
              )
            );
            setEditCommentId(null);
            setEditCommentContent("");
          } else {
            alert("Failed to update comment");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const cancelEdit = () => {
    setEditCommentId(null);
    setEditCommentContent("");
  };

  const deleteComment = async (id) => {
    try {
      await fetch(`http://localhost:3000/commentApi/deleteComment/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            alert("Comment deleted Successfully");
            setComments((prevComments) =>
              prevComments.filter((comment) => comment.comment_id !== id)
            );
            setMenuOpenCommentId(null);
          } else {
            alert("Error deleting comment!");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const toggleMenu = (id) => {
    setMenuOpenCommentId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="mr-5">
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
            placeholder="Write a comment..."
            className="w-full p-2 border border-gray-300 rounded"
            value={commentData}
            onChange={(e) => setCommentData(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 border border-blue-700 rounded mt-2 ml-8"
          onClick={submitComment}
        >
          Comment
        </button>
      </div>
      <div className="w-full mx-4 p-4 border border-gray-300 rounded bg-white">
        <h2 className="text-lg font-bold mb-2">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.comment_id}
              className="mb-4 p-4 border border-gray-200 rounded bg-gray-50 relative"
            >
              {editCommentId === comment.comment_id ? (
                <div className="flex flex-col">
                  <input
                    type="text"
                    value={editCommentContent}
                    onChange={(e) => setEditCommentContent(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-2"
                  />
                  <div className="flex">
                    <button
                      onClick={editComment}
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
                      name={comment.username}
                      size="25"
                      round={true}
                      className="mr-2"
                    />
                    <p className="text-gray-500">{comment.username}</p>
                  </div>
                  <p className="text-gray-700 font-semibold">
                    {comment.comment_description}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Commented on:{" "}
                    {new Date(comment.created_at).toLocaleString()}
                  </p>
                  {comment.username === user.username && (
                    <div className="absolute top-4 right-2">
                      <div className="hover:bg-gray-100 border-2 border-gray-400">
                        <button
                          className="flex flex-col justify-center items-center w-7 h-6 bg-transparent border-none cursor-pointer"
                          onClick={() => toggleMenu(comment.comment_id)}
                        >
                          <div className="w-4 h-[2px] bg-gray-500 mb-1"></div>
                          <div className="w-4 h-[2px] bg-gray-500 mb-1"></div>
                          <div className="w-4 h-[2px] bg-gray-500"></div>
                        </button>
                      </div>
                      {menuOpenCommentId === comment.comment_id && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg z-10">
                          <button
                            onClick={() =>
                              handleEditClick(
                                comment.comment_id,
                                comment.comment_description
                              )
                            }
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteComment(comment.comment_id)}
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
            </div>
          ))
        ) : (
          <p>No comments available</p>
        )}
      </div>
    </div>
  );
}

export default ManageComments;
