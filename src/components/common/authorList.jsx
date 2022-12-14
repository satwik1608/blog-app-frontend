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
                    {
                      <button
                        id="dropdownComment2Button"
                        data-dropdown-toggle="dropdownComment2"
                        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button"
                      >
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        </svg>
                        <span class="sr-only">Comment settings</span>
                      </button>
                    }
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
