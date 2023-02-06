import React, { Component } from "react";
import { listAuthor } from "./../../services/apiService";
import { Link } from "react-router-dom";
import UserContext from "./../../userContext";
import Modal from "./modal";

function AuthorList({ followers, search, notFollowing, authorId }) {
  const { id: user } = React.useContext(UserContext);
  const [data, setData] = React.useState([]);
  console.log("fdsf");
  console.log(followers, search, notFollowing);
  const [base64String, setbase64String] = React.useState("");
  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  React.useEffect(() => {
    const getAuth = async () => {
      const authors = await listAuthor(search);
      // setbase64String(arrayBufferToBase64());
      setData(authors.data);
    };

    getAuth();

    if (followers) {
      if (followers.length > 3) followers.length = 3;
    }

    if (notFollowing) {
      if (notFollowing.length > 10) notFollowing.length = 10;
    }
  }, [search, followers, user, notFollowing]);

  function fillSrc(follower) {
    if (follower.imgThumb) {
      return follower.imgThumb;
    }

    return "https://picsum.photos/200";
  }

  if (followers) {
    return (
      <div className="w-full max-w-md p-4 bg-white  rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Followers
          </h5>
          <Link
            to={`/followers/${authorId}`}
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </Link>
        </div>
        <ul className="list-none">
          {followers.map((follower) => (
            <Link
              to={`/author/${follower._id}`}
              className="flow-root"
              key={follower._id}
            >
              <ul
                role="list"
                className="divide-y divide-gray-200 list-none dark:divide-gray-700"
              >
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={fillSrc(follower)}
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {follower.name}
                      </p>
                      <div className="flex flex-row space-x-3">
                        <p className="text-sm text-gray-500  dark:text-gray-400">
                          @{follower.username}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {follower.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
  if (search) {
    return (
      <ul>
        {data.map((d) => (
          <Link to={`/author/${d._id}`} className="flow-root" key={d._id}>
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700 list-none"
            >
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={fillSrc(d)}
                      alt="Neil image"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {d.name}
                    </p>
                    <div className="flex flex-row space-x-3">
                      <p className="text-sm text-gray-500  dark:text-gray-400">
                        @{d.username}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {d.email}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </Link>
        ))}
      </ul>
    );
  }
  if (notFollowing) {
    return (
      <div className="w-full max-w-md p-4 bg-white  rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white ">
            People to Follow
          </h5>
        </div>
        <ul>
          {notFollowing.map((notFollow) => (
            <Link
              to={`/author/${notFollow._id}`}
              className="flow-root"
              key={notFollow._id}
            >
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700 list-none"
              >
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={fillSrc(notFollow)}
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {notFollow.name}
                      </p>
                      <div className="flex flex-row space-x-3">
                        <p className="text-sm text-gray-500  dark:text-gray-400">
                          @{notFollow.username}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {notFollow.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default AuthorList;
