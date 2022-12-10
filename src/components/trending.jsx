import React, { Component } from "react";
import CardSm from "./common/cardSm";

const initialState = [
  {
    author: "Satwik",
    title: "The best movie ever",
  },
  {
    author: "Gian",
    title: "The best song ever",
  },
  {
    author: "Gian",
    title: "The best song ever",
  },
  {
    author: "Gian",
    title: "The best song ever",
  },
  {
    author: "Gian",
    title: "The best song ever",
  },
  {
    author: "Gian",
    title: "The best song ever",
  },
  {
    author: "Gian",
    title: "The best song ever",
  },
  {
    author: "Gian",
    title: "The best song ever",
  },
];

function Trending() {
  const [blogs, setBlogs] = React.useState(initialState);

  return (
    <ul className="flex flex-row flex-wrap ">
      {blogs.map((blog) => (
        <li className="m-2 w-90" key={blog.author}>
          <div>
            <CardSm author={blog.author} title={blog.title} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Trending;
