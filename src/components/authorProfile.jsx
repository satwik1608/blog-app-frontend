import React, { Component } from "react";
import BlogList from "./blogList";
import ProfileRight from "./common/profileRight";

function AuthorProfile() {
  return (
    <div>
      <div className="flex flex-row flex-wide   justify-center  ">
        <div className="p-2">
          <div class="mb-7  font-extrabold border-b border-gray-200 tracking-tight leading-none text-gray-900 md:text-xl lg:text-4xl dark:text-white ">
            Satwik Kashyap
          </div>
          <BlogList />
        </div>

        <ProfileRight />
      </div>
    </div>
  );
}

export default AuthorProfile;
