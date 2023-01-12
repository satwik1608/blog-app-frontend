import React, { Component } from "react";
import AuthorList from "./authorList";
import UserContext from "./../../userContext";
import { follow, unFollow } from "../../services/apiService";

import { Link } from "react-router-dom";
function ProfileRight({ author }) {
  const {
    _id: authorId,
    name,
    username,
    description,
    followers,
    imgThumb,
    profession,
  } = author;
  console.log("author a", author);
  console.log("imgf", imgThumb);
  console.log("floofsd", followers);
  const { id: user, setId } = React.useContext(UserContext);

  const [isFollower, setisFollower] = React.useState(false);
  const [base64String, setbase64String] = React.useState("");
  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  const handleFollow = async () => {
    const obj = {
      id: user._id,
    };
    const updatedUser = await follow(obj, author._id);
    setisFollower(true);
    setId(updatedUser.data);
  };
  const handleUnfollow = async () => {
    const obj = {
      id: user._id,
    };
    const updatedUser = await unFollow(obj, author._id);
    setisFollower(false);
    setId(updatedUser.data);
  };

  React.useEffect(() => {
    // console.log(user, followers);
    if (imgThumb) setbase64String(arrayBufferToBase64(imgThumb.img.data.data));
    // console.log("user lenda", user);
    if (user && followers) {
      // console.log("follo", followers);

      followers.forEach((f) => {
        if (f._id === user._id) {
          // console.log("true");
          setisFollower(true);
        }
      });
    }
  }, [author]);

  // console.log(user);
  return (
    <div className="w-96 max-w-96 bg-white border-left border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={`data:image/png;base64,${base64String}`}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {profession}
        </span>

        <span className="text-sm m-2 text-gray-500 pl-5 pr-5 dark:text-gray-400">
          {description}
        </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          {!user && (
            <button
              type="button"
              onClick={handleFollow}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-black-300 rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-300 "
              disabled={true}
            >
              Follow
            </button>
          )}
          {user && user.username !== username && !isFollower && (
            <button
              onClick={handleFollow}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Follow
            </button>
          )}

          {user && user.username !== username && isFollower && (
            <button
              onClick={handleUnfollow}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Unfollow
            </button>
          )}
          {user && user.username === username && (
            <Link
              to={`/edit-author`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Update details
            </Link>
          )}
        </div>
      </div>

      <AuthorList followers={followers} />
    </div>
  );
}

export default ProfileRight;
