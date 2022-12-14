import React, { Component } from "react";
import BlogList from "./blogList";
import ProfileRight from "./common/profileRight";
import Rating from "./common/ratings";
import { getAuthor, getBlog } from "./../services/apiService";
import Comment from "./comments";
function BlogFull({ id }) {
  const [blog, setBlog] = React.useState({});
  const [author, setAuthor] = React.useState({});
  React.useEffect(() => {
    const getBl = async () => {
      const blog = await getBlog(id);
      const author = await getAuthor(blog.data.author);

      setAuthor(author.data);
      setBlog(blog.data);
    };

    getBl();
  }, []);
  return (
    <div className="flex flex-row justify-center">
      <div className="p-2 basis-1/2 m-5">
        <div class="mb-7  font-extrabold border-b border-gray-200 tracking-tight leading-none text-gray-900 md:text-xl lg:text-4xl dark:text-white ">
          {blog.title}
        </div>

        <div>
          <img src={blog.img} className="rounded" />
        </div>

        <p class="mb-3 mt-10  text-gray-800 dark:text-gray-400 w-100 flex-wrap">
          {blog.content}
        </p>
        <Rating />
        <Comment blog={blog} />
      </div>
      <div>{author.name && <ProfileRight author={author} />}</div>
    </div>
  );
}

export default BlogFull;
