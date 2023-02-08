import React, { Component } from "react";

import ProfileRight from "./common/profileRight";
import Rating from "./common/ratings";
import MDEditor from "@uiw/react-md-editor";

import {
  getAuthor,
  getBlog,
  editBlog,
  updateAuthor,
  follow,
  unFollow,
} from "./../services/apiService";
import Comments from "./comments";
import { useParams } from "react-router-dom";
import UserContext from "./../userContext";
import { Parser } from "html-to-react";

const { iframe } = require("../services/utils");

function BlogFull() {
  const [blog, setBlog] = React.useState({});
  const [author, setAuthor] = React.useState({});
  const [likes, setLikes] = React.useState(0);
  const [isComment, setIsComment] = React.useState(false);
  const wasLiked = React.useRef(null);
  const { id } = useParams();
  const { id: user, setId } = React.useContext(UserContext);
  const [base64String, setbase64String] = React.useState("");
  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  const handleLike = async (id) => {
    setLikes((like) => like + id);

    const change = {
      likes: likes + id,
    };

    const auth = author;
    auth.liked.push(blog._id);

    console.log("hola");
    setAuthor(auth);
    const idd = blog._id;
    const changeAuthor = {
      liked: idd,
      id: id,
    };
    // console.log("user in blog", user);
    const updatedAuthor = await updateAuthor(user._id, changeAuthor);
    // console.log("UPDA", updatedAuthor);
    setId(updatedAuthor.data);
    await editBlog(change, blog._id);
    // console.log("like before", likes);

    // console.log("like after", likes);
  };

  React.useEffect(() => {
    const getBl = async () => {
      const blog = await getBlog(id);
      const author = await getAuthor(blog.data.author);

      // console.log(arrayBufferToBase64(blog.data.img.img.data.data));
      // setbase64String(arrayBufferToBase64(blog.data.img.img.data.data));
      // console.log("before", wasLiked.current);
      // console.log(user);

      if (user && user.liked.includes(blog.data._id)) wasLiked.current = true;
      else wasLiked.current = false;

      // console.log("after", wasLiked.current);
      // console.log("author", author.data);
      setAuthor(author.data);
      setBlog(blog.data);
      setLikes(blog.data.likes);
    };

    getBl();
  }, [wasLiked.current, likes, user, isComment]);

  if (!blog) return <p>Wait</p>;
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-4 lg:place-content-between">
      <div className="p-2 basis-1/2 m-5">
        <div class="mb-7 mt-3 font-extrabold border-b border-black dark:border-slate-100 tracking-tight leading-none text-gray-900 md:text-xl lg:text-4xl dark:text-white ">
          {blog.title}
        </div>

        <div>
          <img src={blog.img} className="rounded" />
        </div>

        <p class="mb-3 mt-10  text-gray-800 dark:text-white w-100 flex-wrap tracking-wide text-lg leading-relaxed">
          {blog.content &&
            blog.content.map((p) => (
              <div
                dangerouslySetInnerHTML={iframe(p)}
                className="break-words w-4/4 mb-4"
              />
            ))}
        </p>
        <div className="flex flex-row">
          {wasLiked.current !== null && (
            <Rating onLike={handleLike} likes={likes} wasLiked={wasLiked} />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgb(113 113 122)"
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
            <p className="dark:text-slate-100">{blog.comments.length}</p>
          )}
        </div>

        {isComment && <Comments blog={blog} />}
      </div>
      <div className="lg:fixed lg:overflow-auto lg:inset-y-0 lg:right-0 lg:mt-28 lg:mr-16 lg:scrollbar-hide">
        <ProfileRight author={author} />
      </div>
    </div>
  );
}

export default BlogFull;
