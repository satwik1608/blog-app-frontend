import React, { Component } from "react";
import AuthorList from "./authorList";

function ProfileRight({ name, followers, about, imgThumb, email }) {
  return (
    <div class="w-full max-w-sm bg-white border-left border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div class="flex flex-col items-center pb-10">
        <img
          class="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://placeimg.com/400/225/arch"
          alt="Bonnie image"
        />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          Bonnie Green
        </h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          Visual Designer
        </span>

        <span class="text-sm m-2 text-gray-500 pl-5 pr-5 dark:text-gray-400">
          About wala part of author maybe thod abad ya thoda chota no body knows
          kitna bada about hoga but it works
        </span>
        <div class="flex mt-4 space-x-3 md:mt-6">
          <a
            href="#"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Follow
          </a>
          <a
            href="#"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
          >
            Message
          </a>
        </div>
      </div>

      <AuthorList />
    </div>
  );
}

export default ProfileRight;
