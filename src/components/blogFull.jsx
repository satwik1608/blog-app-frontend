import React, { Component } from "react";
import "./blog.css";
import ProfileRight from "./common/profileRight";
import Rating from "./common/ratings";
import MDEditor from "@uiw/react-md-editor";
import { formatDate } from "../services/utils";

import {
  getAuthor,
  getBlog,
  editBlog,
  updateAuthor,
  follow,
  unFollow,
  toggleLike,
} from "./../services/apiService";
import Comments from "./comments";
import { useParams } from "react-router-dom";
import { useUser, useUserApi } from "./../userContext";
import { Parser } from "html-to-react";
import { useQuery } from "react-query";

const { iframe } = require("../services/utils");

function BlogFull() {
  const [blog, setBlog] = React.useState();
  const [likes, setLikes] = React.useState(0);
  const [isComment, setIsComment] = React.useState(false);
  const [wasLiked, setWasLiked] = React.useState(null);
  const { id } = useParams();
  const authorId = React.useRef(null);
  const { id: user } = useUser();
  const { setId } = useUserApi();
  // console.log("User -> ", user);
  console.log(wasLiked);
  const handleLike = async (id) => {
    setLikes((like) => like + id);

    // const change = {
    //   likes: likes + id,
    // };
    // await editBlog(change, blog._id); // should not give exact value of likes rather give just if I need to increment or decrement like coz if there are concurrent likes from different users it will result in inconsistency
    // const auth = author;
    // auth.liked.push(blog._id);

    // setAuthor(auth);
    // const idd = blog._id;
    // const changeAuthor = {
    //   liked: idd,
    //   id: id,
    // };
    // const currAuthor = author;
    // currAuthor.liked.push(idd);
    // setId(currAuthor); // Making current author the auth-user after liking the Blog (slow claps)
    // await updateAuthor(changeAuthor);

    const fields = {
      blogId: blog._id,
      change: id,
    };

    const updatedUser = await toggleLike(fields); // ** bug all the fields are populated
    // console.log(updatedUser);
    setId(updatedUser.data);
  };
  // console.log(blog);
  React.useEffect(() => {
    const getBl = async () => {
      // console.log("UseEffect BlogFull");
      const blog = await getBlog(id);
      const author = await getAuthor(blog.data.author);
      // console.log("THis is blog", blog);
      if (!author.current) authorId.current = author.data._id;

      if (user && blog.data && user.liked.includes(blog.data._id))
        setWasLiked(true);
      else if (user && blog.data) setWasLiked(false);
      else {
        setWasLiked(null);
      }
      setBlog(blog.data);
      setLikes(blog.data.likes);
    };

    getBl();
  }, [isComment, user]);

  // const blogFullQuery = useQuery(["blogFull"] , async () => {

  //   const blog = await getBlog(id);

  // })

  if (!blog)
    return (
      <div class="text-center">
        <div role="status">
          <svg
            aria-hidden="true"
            class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-4 lg:place-content-between">
      <div className="p-2 basis-1/2 m-5">
        <div class=" mt-3 mb-7 font-extrabold border-b border-black dark:border-slate-100 tracking-tight leading-none text-gray-900 md:text-xl lg:text-4xl dark:text-white ">
          {blog.title}
          <div class="flex justify-end ">
            <p className="text-base text-gray-800 dark:text-white">
              {formatDate(blog.date)}
            </p>
          </div>
        </div>
        <div>
          <img src={blog.img} className="rounded" />
        </div>

        <p class="mb-3 mt-10  text-gray-800 dark:text-white w-100 flex-wrap tracking-wide text-lg leading-relaxed">
          {blog.content &&
            blog.content.map((p) => (
              <div
                dangerouslySetInnerHTML={iframe(p)}
                className="break-words w-4/4 mb-4 check"
              />
            ))}
        </p>
        <div className="flex flex-row">
          {wasLiked !== null && (
            <Rating onLike={handleLike} likes={likes} wasLiked={wasLiked} />
          )}
          {wasLiked === null && <Rating likes={likes} wasLiked={wasLiked} />}
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
        <ProfileRight authorId={authorId.current} />
      </div>
    </div>
  );
}

export default BlogFull;
