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
    <React.Fragment>
      <p className="mb-2  font-extrabold border-b border-gray-200 tracking-tight leading-none text-gray-500 md:text-xl lg:text-xl dark:text-white">
        Trending
      </p>
      <ul className="flex flex-row flex-wrap border-b border-gray-200 mb-10  ">
        {blogs.map((blog) => (
          <li className="m-2 w-90" key={blog.author}>
            <div>
              <CardSm author={blog.author.name} title={blog.title} />
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default Trending;
