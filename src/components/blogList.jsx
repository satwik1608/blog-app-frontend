import React, { Component } from "react";
import Card from "./common/card";

import { getBlogs } from "./../services/apiService";

function BlogList({ id, author, tag, search }) {
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    const getBlog = async () => {
      const blog = await getBlogs();

      const blogData = blog.data;

      if (author) {
        const blogD = blogData.filter((b) => b.author._id === id);
        setBlogs(blogD);
      } else if (tag) {
        const blogD = blogData.filter((b) => b.tags.includes(tag));

        setBlogs(blogD);
      } else if (search) {
        const blogD = blogData.filter((b) => {
          const bl = b.title.toLowerCase().split(" ");
          const srch = search.toLowerCase();
          let flag = 0;
          bl.forEach((bll) => {
            if (bll.startsWith(srch)) ++flag;
          });
          if (flag) return true;
          return false;
        });

        setBlogs(blogD);
      } else setBlogs(blogData);
    };

    getBlog();
  }, [tag, id, author, search]);

  if (blogs.length === 0) return <p>Best</p>;
  return (
    <ul className="m-4">
      {blogs.map((blog) => (
        <li className="m-2" key={blog.author._id}>
          <Card
            author={blog.author.name}
            authorId={blog.author._id}
            title={blog.title}
            tags={blog.tags}
            img={blog.img}
            content={blog.content}
            date={blog.date}
            id={blog._id}
          />
        </li>
      ))}
    </ul>
  );
}

export default BlogList;
