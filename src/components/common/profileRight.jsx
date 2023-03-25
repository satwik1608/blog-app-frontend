import React, { Component } from "react";
import AuthorList from "./authorList";
import { useUser } from "../../userContext";
import { useQuery } from "react-query";
import {
  follow,
  unFollow,
  uploadImage,
  updateAuthor,
  getAuthor,
} from "../../services/apiService";
import { resizeFile } from "../../services/imgService";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import { Link } from "react-router-dom";
import { unsubscribe } from "medium-editor";
import { func } from "joi";
function ProfileRight({ authorId }) {
  const { id: user, setId } = useUser();

  const [isFollower, setisFollower] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [base64String, setbase64String] = React.useState("");
  const [isImageUpdate, setImageUpdate] = React.useState(false);

  async function fetchAuthor(authorId) {
    const author = await getAuthor(authorId);

    return author.data;
  }

  const authorQuery = useQuery(
    ["isFollower", isFollower, user, authorId],
    async () => await fetchAuthor(authorId)
  );

  const handleFollow = async () => {
    setIsLoading(true);
    const obj = {
      id: user._id,
    };
    const updatedUser = await follow(obj, authorQuery.data._id);
    setisFollower(true);
    setId(updatedUser.data);
    setIsLoading(false);
  };
  const handleUnfollow = async () => {
    setIsLoading(true);
    const obj = {
      id: user._id,
    };
    const updatedUser = await unFollow(obj, authorQuery.data._id);
    setisFollower(false);
    setId(updatedUser.data);
    setIsLoading(false);
  };

  const imgRef = React.useRef("");
  const handleImage = async () => {
    const testImage = await resizeFile(imgRef.current.files[0]);

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
    }
  };

  React.useEffect(() => {
    if (authorQuery.data) {
      if (authorQuery.data.imgThumb) setbase64String(authorQuery.data.imgThumb);
      else setbase64String("https://picsum.photos/200");

      if (user && authorQuery.data.followers) {
        authorQuery.data.followers.forEach((f) => {
          if (f._id === user._id) {
            setisFollower(true);
          }
        });
      }
    }
  }, [authorQuery]);
  console.log(authorQuery.data, user);
  if (authorQuery.isLoading)
    return (
      <div class="text-center">
        <div role="status">
          <svg
            aria-hidden="true"
            class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
    <div className="md:w-96  bg-white border-left border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <div className="flex flex-row space-x-3  items-center justify-center ">
          {user && user.username === authorQuery.data.username && (
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg cursor-pointer"
              src={`${base64String}`}
              alt="Bonnie image"
              onClick={() => setImageUpdate((s) => !s)}
            />
          )}
          {user && user.username !== authorQuery.data.username && (
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
          @{authorQuery.data.username}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 ">
          {authorQuery.data.email}
        </span>

        {user &&
          user.username === authorQuery.data.username &&
          isImageUpdate && (
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
          {authorQuery.data.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {authorQuery.data.profession}
        </span>

        <span className="text-sm m-2 text-gray-500 pl-5 pr-5 dark:text-gray-400">
          {authorQuery.data.description}
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
          {user &&
            user.username !== authorQuery.data.username &&
            !isFollower &&
            !isLoading && (
              <button
                onClick={handleFollow}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Follow
              </button>
            )}

          {user &&
            user.username !== authorQuery.data.username &&
            isFollower &&
            !isLoading && (
              <button
                onClick={handleUnfollow}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Unfollow
              </button>
            )}
          {user && isLoading && (
            <div role="status">
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
          )}

          {user && user.username === authorQuery.data.username && (
            <Link
              to={`/edit-author`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Update details
            </Link>
          )}
        </div>
      </div>

      <AuthorList followers={authorQuery.data.followers} authorId={authorId} />
    </div>
  );
}

export default ProfileRight;
