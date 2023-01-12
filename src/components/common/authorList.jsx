import React, { Component } from "react";
import { listAuthor } from "./../../services/apiService";
import { Link } from "react-router-dom";
import UserContext from "./../../userContext";

function AuthorList({ followers, search, notFollowing }) {
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
  }, [search, followers, user]);

  function fillSrc(follower) {
    if (follower.imgThumb) {
      return `data:image/png;base64,${arrayBufferToBase64(
        follower.imgThumb.img.data.data
      )}`;
    }

    return " https://picsum.photos/200";
  }

  if (followers) {
    return (
      <div className="w-full max-w-md p-4 bg-white  rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Followers
          </h5>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </a>
        </div>
        <ul>
          {followers.map((follower) => (
            <Link
              to={`/author/${follower._id}`}
              className="flow-root"
              id={follower._id}
            >
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
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
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {follower.email}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {
                        <button
                          id="dropdownComment2Button"
                          data-dropdown-toggle="dropdownComment2"
                          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                          type="button"
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                          </svg>
                          <span className="sr-only">Comment settings</span>
                        </button>
                      }
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
          <Link to={`/author/${d._id}`} className="flow-root" id={d._id}>
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
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
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {d.email}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {
                      <button
                        id="dropdownComment2Button"
                        data-dropdown-toggle="dropdownComment2"
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button"
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        </svg>
                        <span className="sr-only">Comment settings</span>
                      </button>
                    }
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
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            People to Follow
          </h5>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </a>
        </div>
        <ul>
          {notFollowing.map((notFollow) => (
            <Link
              to={`/author/${notFollow._id}`}
              className="flow-root"
              id={notFollow._id}
            >
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
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
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {notFollow.email}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {
                        <button
                          id="dropdownComment2Button"
                          data-dropdown-toggle="dropdownComment2"
                          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                          type="button"
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                          </svg>
                          <span className="sr-only">Comment settings</span>
                        </button>
                      }
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
