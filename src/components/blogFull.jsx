import React, { Component } from "react";
import BlogList from "./blogList";
import ProfileRight from "./common/profileRight";
import Rating from "./common/ratings";
function BlogFull() {
  return (
    <div className="flex flex-row justify-center">
      <div className="p-2 basis-1/2 m-5">
        <div class="mb-7  font-extrabold border-b border-gray-200 tracking-tight leading-none text-gray-900 md:text-xl lg:text-4xl dark:text-white ">
          Title
        </div>

        <div>
          <img src="https://placeimg.com/400/225/arch" className="rounded" />
        </div>

        <p class="mb-3 mt-10  text-gray-800 dark:text-gray-400 w-100 flex-wrap">
          Track work across the enterdivrise through an open, collaborative
          platform. Link issues across Jira and ingest data from other software
          development tools, so your IT support and operations teams have richer
          contextual information to rapidly respond to requests, incidents, and
          cha sit?
        </p>
        <Rating />
      </div>
      <div>
        <ProfileRight />
      </div>
    </div>
  );
}

export default BlogFull;
