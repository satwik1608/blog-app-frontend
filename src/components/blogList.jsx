import React, { Component } from "react";
import Card from "./common/card";
const initialState = [
  {
    author: "satwik",
    title: "The best anime ever",
    tags: ["anime", "horror"],
    img: "https://placeimg.com/400/225/arch",
    content:
      "According to me the best anime is not the worst anime but the best anime is the best anime and I think it will remain the same ...",
    date: "16th May",
  },
  {
    author: "satwik",
    title: "The best anime ever",
    tags: ["anime", "horror"],
    img: "https://placeimg.com/400/225/arch",
    content:
      "According to me the best anime is not the worst anime but the best anime is the best anime and I think it will remain the same ...",
    date: "16th May",
  },
  {
    author: "satwik",
    title: "The best anime ever",
    tags: ["anime", "horror"],
    img: "https://placeimg.com/400/225/arch",
    content:
      "According to me the best anime is not the worst anime but the best anime is the best anime and I think it will remain the same ...",
    date: "16th May",
  },
  {
    author: "satwik",
    title: "The best anime ever",
    tags: ["anime", "horror"],
    img: "https://placeimg.com/400/225/arch",
    content:
      "According to me the best anime is not the worst anime but the best anime is the best anime and I think it will remain the same ...",
    date: "16th May",
  },

  {
    author: "satwik",
    title: "The best anime ever",
    tags: ["anime", "horror"],
    img: "https://placeimg.com/400/225/arch",
    content:
      "According to me the best anime is not the worst anime but the best anime is the best anime and I think it will remain the same ...",
    date: "16th May",
  },
  {
    author: "satwik",
    title: "The best anime ever",
    tags: ["anime", "horror"],
    img: "https://placeimg.com/400/225/arch",
    content:
      "According to me the best anime is not the worst anime but the best anime is the best anime and I think it will remain the same ...",
    date: "16th May",
  },
  {
    author: "satwik",
    title: "The best anime ever",
    tags: ["anime", "horror"],
    img: "https://placeimg.com/400/225/arch",
    content:
      "According to me the best anime is not the worst anime but the best anime is the best anime and I think it will remain the same ...",
    date: "16th May",
  },
];
function BlogList() {
  const [blogs, setBlogs] = React.useState(initialState);

  return (
    <ul className="m-4">
      {blogs.map((blog) => (
        <li className="m-2" key={blog.author}>
          <Card
            author={blog.author}
            title={blog.title}
            tags={blog.tags}
            img={blog.img}
            content={blog.content}
            date={blog.date}
          />
        </li>
      ))}
    </ul>
    // <Card
    //   author="satwik"
    //   title="The best anime ever"
    //   tags={initialState[0].tags}
    //   img="https://placeimg.com/400/225/arch"
    //   content="According to me the best anime is not the worst anime but the best anime is the best anime and I think it will remain the same ..."
    //   date="16th May"
    // />
  );
}

export default BlogList;
