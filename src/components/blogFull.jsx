import React, { Component } from "react";

import ProfileRight from "./common/profileRight";
import Rating from "./common/ratings";
import { getAuthor, getBlog, editBlog } from "./../services/apiService";
import Comment from "./comments";
import { useParams } from "react-router-dom";
function BlogFull() {
  const [blog, setBlog] = React.useState({});
  const [author, setAuthor] = React.useState({});
  const [likes, setLikes] = React.useState(0);
  const [isComment, setIsComment] = React.useState(false);

  const { id } = useParams();
  const handleLike = async (id) => {
    setLikes((like) => like + id);

    const change = {
      likes: likes + id,
    };

    await editBlog(change, blog._id);
  };

  React.useEffect(() => {
    const getBl = async () => {
      const blog = await getBlog(id);
      const author = await getAuthor(blog.data.author);

      setAuthor(author.data);
      setBlog(blog.data);
      setLikes(blog.data.likes);
    };

    getBl();
  }, []);

  if (!blog) return <p>Wait</p>;
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
        <div className="flex flex-row">
          <Rating onLike={handleLike} likes={likes} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ffffff"
            className="w-6 h-6 ml-5"
            cursor="pointer"
            onClick={() => setIsComment((c) => !c)}
          >
            <path
              fillRule="evenodd"
              d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z"
              clipRule="evenodd"
            />
          </svg>
          {blog.comments && (
            <p className="text-white">{blog.comments.length}</p>
          )}
        </div>

        {isComment && <Comment blog={blog} />}
      </div>
      <div>{author.name && <ProfileRight author={author} />}</div>
    </div>
  );
}

export default BlogFull;
