import React, { Component } from "react";
import CardSm from "./common/cardSm";
import { getBlogs } from "../services/apiService";

function Trending() {
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    const getBlog = async () => {
      const blogs = await getBlogs();
      setBlogs(blogs.data);
    };
    getBlog();
  }, []);
  return (
    <ul className="flex flex-row flex-wrap ">
      {blogs.map((blog) => (
        <li className="m-2 w-90" key={blog.author}>
          <div>
            <CardSm author={blog.author.name} title={blog.title} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Trending;
