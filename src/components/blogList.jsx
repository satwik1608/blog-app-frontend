import React, { Component } from "react";
import Card from "./common/card";

import { getBlogs } from "./../services/apiService";

function BlogList({ id, author, tag }) {
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    const getBlog = async () => {
      const blog = await getBlogs();

      const blogData = blog.data;

      if (author) {
        const blogD = blogData.filter((b) => b.author._id === id);
        setBlogs(blogD);
      } else if (tag) {
        blog.data.filter((b) => b.tags.inlcude(tag) === true);
      } else setBlogs(blogData);
    };

    getBlog();
  }, []);

  if (blogs.length === 0) return <p>Best</p>;
  return (
    <ul className="m-4">
      {blogs.map((blog) => (
        <li className="m-2" key={blog.author._id}>
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
