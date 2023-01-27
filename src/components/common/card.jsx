import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBlogImage } from "../../services/apiService";
import iframe from "../../services/utils";
import Explicit from "./explicit";
import UserContext from "./../../userContext";
import { getStateFromTextArea } from "@uiw/react-md-editor";

function Card({
  author,
  title,
  handleList,
  tags,
  content,
  date,
  id,
  authorId,
  brief,
}) {
  const { id: user } = React.useContext(UserContext);
  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  const [list, setlist] = React.useState(false);
  // const [img, setImage] = React.useState();
  const [base64String, setBase64String] = React.useState("");
  React.useEffect(() => {
    const getImg = async () => {
      const img = await getBlogImage(id);

      setBase64String(arrayBufferToBase64(img.data.img.img.data.data));
    };

    getImg();

    if (user && user.lists && user.lists.includes(id)) {
      setlist(true);
    }
  }, []);

  function fillSrc(person) {
    if (person.imgThumb) {
      return `data:image/png;base64,${arrayBufferToBase64(
        person.imgThumb.img.data.data
      )}`;
    }

    return " https://picsum.photos/200";
  }
  const onList = (id, flag) => {
    if (flag == 1) {
      setlist(true);
      handleList(id, flag);
    } else {
      setlist(false);
      handleList(id, flag);
    }
  };

  function formatDate(date) {
    const d = new Date(date);
    const dt = d.toUTCString();

    const str = dt.substr(5, 11);
    return str;
  }
  return (
    <>
      {user && !list && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="32px"
          height="32px"
          onClick={() => onList(id, 1)}
          cursor="pointer"
        >
          {" "}
          <path d="M25,27l-9-6.75L7,27V4h18V27z" />
        </svg>
      )}
      {user && list && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="32px"
          height="32px"
          fill="white"
          onClick={() => onList(id, 0)}
          cursor="pointer"
        >
          <path d="M25,27l-9-6.75L7,27V4h18V27z" />
        </svg>
      )}
      <Link
        to={`/blogs/${id}`}
        className="flex flex-col items-center bg-white   md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div className="flex flex-col justify-between w-96 p-3 font-bold text-slate-50  leading-normal">
          <div className="flex flex-row mb-2">
            <img
              className="w-8 h-8 rounded-full mr-2 content-center items-center"
              src={fillSrc(author)}
              alt="Neil image"
            />
            <div>
              <Link to={`/author/${authorId}`}>{author.name}</Link>
            </div>

            <div className="text-gray-500 font-bold text-sm ml-3">
              {formatDate(date)}
            </div>
          </div>

          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-50">
            {title}
          </h5>
          <div className="mb-1 font-normal text-gray-700 dark:text-gray-400">
            {brief}
          </div>
          <div className="flex items-center mt-2.5 mb-5">
            {tags.map((tag) => (
              <Link
                to={`/tags/${tag}`}
                className="bg-blue-100 text-blue-800 text-xs font-semibold  px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {base64String && (
          <img
            className="object-cover w-full rounded-t-lg h-32 w-32 md:h-32 md:w-32 md:rounded-none md:rounded-lg"
            src={`data:image/png;base64,${base64String}`}
            alt="why"
          />
        )}
        {!base64String && (
          <div
            role="status"
            class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
          >
            <div class="flex items-center justify-center h-32 w-32 bg-gray-300 rounded sm:w-32 dark:bg-gray-700">
              <svg
                class="w-12 h-12 text-gray-200 "
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </Link>
    </>
  );
}

export default Card;
