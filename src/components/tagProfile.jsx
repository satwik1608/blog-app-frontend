import React, { Component } from "react";
import BlogList from "./blogList";
import AuthorList from "./common/authorList";
import ProfileRight from "./common/profileRight";
import { getBlogs } from "./../services/apiService";
function TagProfile({ tag }) {
  const [blogs, setBlogs] = React.useState([]);

  return (
    <div className="flex flex-row flex-wide   justify-center  ">
      <div className="p-2">
        <div class="mb-7  font-extrabold border-b border-gray-200 tracking-tight leading-none text-gray-900 md:text-xl lg:text-4xl dark:text-white ">
          {tag}
        </div>
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Follow
        </button>

        <BlogList tag={tag} />
      </div>
    </div>
  );
}

export default TagProfile;
