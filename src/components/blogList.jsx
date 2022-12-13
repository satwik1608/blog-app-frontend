import React, { Component } from "react";
import Card from "./common/card";

import { getBlogs } from "./../services/apiService";

async function fetchBlogs() {
  const blogs = await getBlogs();

  return blogs.data;
}
function BlogList() {
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    const getBlog = async () => {
      const blog = await getBlogs();
      setBlogs(blog.data);
    };

    getBlog();
  }, []);

  if (blogs.length === 0) return <p>Best</p>;
  return (
    <ul className="m-4">
      {blogs.map((blog) => (
        <li className="m-2" key={blog.author}>
          <Card
            author={blog.author.name}
            title={blog.title}
            tags={blog.tags}
            img={blog.img}
            content={blog.content}
            date={blog.date}
          />
        </li>
      ))}
    </ul>
  );
}

export default BlogList;
