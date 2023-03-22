import React, { Component } from "react";
import BlogList from "./blogList";
import AuthorList from "./common/authorList";
import TagStack from "./common/tagStack";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function SearchBox() {
  const [data, setData] = React.useState("");
  const searchRef = React.useRef("");
  const handleChange = () => {
    setData(searchRef.current.value);
  };
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/search/${data}`);
  };
  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit}
        class="flex items-center justify-center flex-col "
      >
        <label for="simple-search" class="sr-only">
          Search
        </label>

        <div class="mb-6">
          <label
            for="large-input"
            class="block mb-2 w-96 text-sm font-medium text-gray-900 dark:text-white"
          ></label>
          <input
            type="text"
            id="large-input"
            placeholder="Search"
            onChange={handleChange}
            ref={searchRef}
            required
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <Link
          to={`/search/${data}`}
          class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            class="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span class="sr-only">Search</span>
        </Link>
      </form>
    </React.Fragment>
  );
}

export default SearchBox;
