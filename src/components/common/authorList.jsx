import React, { Component } from "react";

function AuthorList({ followers }) {
  return (
    <div class="w-full max-w-md p-4 bg-white  rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Followers
        </h5>
        <a
          href="#"
          class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View all
        </a>
      </div>
      <ul>
        {followers.map((follower) => (
          <div class="flow-root">
            <ul
              role="list"
              class="divide-y divide-gray-200 dark:divide-gray-700"
            >
              <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                    <img
                      class="w-8 h-8 rounded-full"
                      src="https://placeimg.com/400/225/arch"
                      alt="Neil image"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {follower.name}
                    </p>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                      {follower.email}
                    </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    dot icon
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default AuthorList;
