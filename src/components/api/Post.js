import React, { useState, useEffect } from "react";

// api :  https://jsonplaceholder.typicode.com/posts

const Post = () => {
  const newPostDefault = {title: "", body: ""};
  const [posts, setPost] = useState([]);
  const [postFormIsVisiable, setPostFormIsVisiable] = useState(false);
  const [newPost , setNewPost] = useState({title: "", body: ""})

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, []);

    const handleOnSubmit = event => {
      event.preventDefault();
   

      fetch("https://jsonplaceholder.typicode.com/posts",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      })
        .then((response) => response.json())
        .then((data) => {
          setPostFormIsVisiable(false);
          setNewPost(newPostDefault)
          setPost([...posts, data]);
        });
    } 
    const handleOnCancel = () => {
      setPostFormIsVisiable(false);
    }
  return (
    <div>
      {!postFormIsVisiable && <button onClick={() => setPostFormIsVisiable(true)}>Add New Post</button>}
      {postFormIsVisiable && (
        <form onSubmit={handleOnSubmit}>
          <h1>New Post</h1>
          <input type="text" placeholder="title" value={newPost.title} onChange={(event) => setNewPost({...newPost, title: event.target.value})} />
          <br/>
          <textarea placeholder="body" value={newPost.body} onChange={(event) => setNewPost({...newPost, body: event.target.value})}></textarea>
          <br/>
          <button type="submit">Submit</button>
          <button onClick={() => handleOnCancel}> Cancel</button>
        </form>
      )}
      <h1>Post</h1>
      <ul className="flex">
        {posts.map((post, index) => (
          <li key={index}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;






