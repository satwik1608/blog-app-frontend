import React, { Component } from "react";
import BlogList from "./blogList";
import AuthorList from "./common/authorList";
import ProfileRight from "./common/profileRight";
function TagProfile() {
  return (
    <div className="flex flex-row flex-wide   justify-center  ">
      <div className="p-2">
        <div class="mb-7  font-extrabold border-b border-gray-200 tracking-tight leading-none text-gray-900 md:text-xl lg:text-4xl dark:text-white ">
          Tag Name
        </div>
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Follow
        </button>

        <BlogList />
      </div>
      <div className="p-10 border-b border-gray-200">
        <div className="flex flex-row justify-center">
          <div className="text-gray-900 mr-10">
            <p className="font-bold text-xl">1.5</p>
            <p>Following</p>
          </div>
          <div className="text-gray-900">
            <p className="font-bold text-xl">1.5</p>
            <p>Followers</p>
          </div>
        </div>
        <AuthorList />
      </div>
    </div>
  );
}

export default TagProfile;
