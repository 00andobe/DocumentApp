"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function CreatePost() {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      author,
      title,
      content,
    };

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        
        alert('Post created successfully');
        router.push('/posts');
      } else {
        console.error('Failed to create the post');
      }
    } catch (error) {
      console.error('Error creating the post:', error);
    }
  };

  return (
    <div className="create-post-container">
      <h1>Create a New Post</h1>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
