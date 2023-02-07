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
  if (blogs.length === 0) {
    return (
      <React.Fragment>
        <p className="mb-4  font-extrabold border-b border-black tracking-tight leading-none text-gray-500 md:text-xl lg:text-xl dark:text-white">
          Trending
        </p>
        <p class="mb-6 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
          No Trending blogs
        </p>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <p className="mb-2  font-extrabold border-b border-black tracking-tight leading-none text-gray-500 md:text-xl lg:text-xl dark:text-white">
        Trending
      </p>
      <ul className="flex flex-row flex-wrap border-b border-black mb-10  ">
        {blogs.map((blog) => (
          <li className="m-2 w-90 list-none" key={blog.author}>
            <div>
              <CardSm
                author={blog.author.name}
                title={blog.title}
                id={blog._id}
              />
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default Trending;
