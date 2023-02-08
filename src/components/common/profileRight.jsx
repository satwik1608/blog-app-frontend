import React, { Component } from "react";
import AuthorList from "./authorList";
import UserContext from "./../../userContext";
import {
  follow,
  unFollow,
  uploadImage,
  updateAuthor,
} from "../../services/apiService";
import { resizeFile } from "../../services/imgService";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import { Link } from "react-router-dom";
import { unsubscribe } from "medium-editor";
function ProfileRight({ author }) {
  const {
    _id: authorId,
    name,
    email,
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
  const [isImageUpdate, setImageUpdate] = React.useState(false);
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

  const imgRef = React.useRef("");
  const handleImage = async () => {
    const testImage = await resizeFile(imgRef.current.files[0]);

    // const img = await uploadImage(testImage);

    // imgRef.current = img.data._id;

    // const data = {
    //   imgThumb: imgRef.current,
    // };
    // const author = await updateAuthor(user._id, data);

    // setId(author.data);

    // setImageUpdate(false);

    // const testImage = imgRef.current.files[0];
    const imageRef = ref(storage, `authorImg/${testImage.name + v4()}`);

    try {
      await uploadBytes(imageRef, testImage);
      const link = await getDownloadURL(imageRef);
      imgRef.current = link;

      const data = {
        imgThumb: imgRef.current,
      };
      const author = await updateAuthor(user._id, data);

      setId(author.data);

      setImageUpdate(false);
    } catch (ex) {
      console.log(ex);
      console.log("wrong");
    }
  };

  React.useEffect(() => {
    // console.log(user, followers);
    if (imgThumb) setbase64String(imgThumb);
    else setbase64String("https://picsum.photos/200");
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
    <div className="md:max-w-96  bg-white border-left border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <div className="flex flex-row space-x-3  items-center justify-center ">
          {user && user.username === username && (
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg cursor-pointer"
              src={`${base64String}`}
              alt="Bonnie image"
              onClick={() => setImageUpdate((s) => !s)}
            />
          )}
          {user && user.username !== username && (
            <Link to={`/author/${authorId}`}>
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg "
                src={`${base64String}`}
                alt="Bonnie image"
              />
            </Link>
          )}
          {!user && (
            <Link to={`/author/${authorId}`}>
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg "
                src={`${base64String}`}
                alt="Bonnie image"
              />
            </Link>
          )}
        </div>

        <span className="text-sm text-gray-500 dark:text-gray-400 ">
          @{username}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 ">
          {email}
        </span>

        {user && user.username === username && isImageUpdate && (
          <div class="w-full">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload file
            </label>
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              name="file"
              required="true"
              ref={imgRef}
              onChange={handleImage}
              type="file"
            />
          </div>
        )}

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

      <AuthorList followers={followers} authorId={authorId} />
    </div>
  );
}

export default ProfileRight;
