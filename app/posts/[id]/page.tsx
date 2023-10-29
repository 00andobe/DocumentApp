"use client"
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Post } from "@/interfaces";
import QuillEditor from "../../../components/QuillEditor";
import "react-quill/dist/quill.snow.css";
import "../../../styles/posts.css";
import { useRouter } from "next/navigation";

const PostPage = ({ params }: { params: { id: number } }) => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const router = useRouter();

  const getPosts = async () => {
    const result = await fetch(`/api/single/${id}`);
    const postsFromApi = await result.json();
    setPosts(postsFromApi);
  };

  useEffect(() => {
    getPosts();
  }, [id]);

  const handleEditClick = (title:any, content:any) => {
    setEditedTitle(title);
    setEditedContent(content);
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const updatedData = {
        title: editedTitle,
        content: editedContent,
      };

      const response = await fetch(`/api/single/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setIsEditing(false);
        getPosts();
      } else {
        console.error("Failed to update the post");
      }
    } catch (error) {
      console.error("Error updating the post:", error);
    }
  };

  const handleCancelClick = () => {

    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      fetch(`/api/single/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            router.push("/posts");
          } else {
            console.error("Failed to delete the post");
          }
        })
        .catch((error) => {
          console.error("Error deleting the post:", error);
        });
    }
  };

  return (
    <div className="post-list">
      {posts.map((post: Post) => (
        <div key={post.id} className="post" id={`post-${post.id}`}>
          {isEditing ? (
            <div className="edit-mode">
              <div className="title-edit-container">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="edit-input"
                />
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/016/775/743/small/red-cross-isolated-png.png"
                  alt="Cancel Edit"
                  onClick={handleCancelClick}
                  className="cancel-button"
                />
              </div>
              <QuillEditor value={editedContent} onChange={setEditedContent} />
              <button onClick={handleSaveClick} className="save-button">
                Save
              </button>
              <button onClick={handleDeleteClick} className="delete-button">
                Delete
              </button>
            </div>
          ) : (
            <div>
              <h2 className="post-title">{post.title + " by " + post.author}</h2>
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
              <button
                onClick={() => handleEditClick(post.title, post.content)}
                className="edit-button"
              >
                Edit
              </button>
              <button onClick={handleDeleteClick} className="delete-button">
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostPage;
