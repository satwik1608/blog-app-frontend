import React, { Component } from "react";
import BlogList from "./blogList";

import { useParams } from "react-router-dom";
function TagProfile() {
  const { tag } = useParams();
  return (
    <div className="flex flex-row flex-wide   justify-center  ">
      <div className="p-2">
        <div class="mb-7  font-extrabold border-b border-gray-200 tracking-tight leading-none text-gray-900 md:text-xl lg:text-4xl dark:text-white ">
          {tag}
        </div>

        <BlogList tag={tag} />
      </div>
    </div>
  );
}

export default TagProfile;
