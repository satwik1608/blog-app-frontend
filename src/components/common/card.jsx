import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBlogImage } from "../../services/apiService";
import iframe from "../../services/utils";
import Explicit from "./explicit";
import UserContext from "./../../userContext";

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
    console.log("--", user.lists);
    console.log("----------", id);
    if (user.lists.includes(id)) {
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
  return (
    <>
      {!list && (
        // <i class="fa-solid fa-bookmark" onClick={() => onList(id, 1)}></i>
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
      {list && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="32px"
          height="32px"
          fill="white"
          onClick={() => onList(id, 0)}
          cursor="pointer"
        >
          {" "}
          <path d="M25,27l-9-6.75L7,27V4h18V27z" />
        </svg>
      )}
      <Link
        to={`/blogs/${id}`}
        className="flex flex-col items-center bg-white   md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div className="flex flex-col justify-between p-1 font-bold text-slate-50  leading-normal">
          <div className="flex flex-row">
            <img
              className="w-8 h-8 rounded-full mr-2"
              src={fillSrc(author)}
              alt="Neil image"
            />
            <Link to={`/author/${authorId}`}>{author.name}</Link>
          </div>

          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-50">
            {title}
          </h5>
          <div className="mb-1 font-normal text-gray-700 dark:text-gray-400">
            {brief}
          </div>
          <div className="flex items-center mt-2.5 mb-5">
            <p className="text-gray-500 font-normal text-sm">{date}</p>

            {tags.map((tag) => (
              <Link
                to={`/tags/${tag}`}
                className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={`data:image/png;base64,${base64String}`}
          alt="why"
        />
      </Link>
    </>
  );
}

export default Card;
