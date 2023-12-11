import React from "react";

function BlogButtonGroup({
  user,
  setStuff,
  setSort,
  setFollowing,
  setList,
  author,
}) {
  return (
    <div class="inline-flex rounded-md mt-4 shadow-sm" role="group">
      {!user && (
        <button
          type="button"
          onClick={() => setStuff(false)}
          className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Recent
        </button>
      )}
      {!user && (
        <button
          type="button"
          onClick={() => setSort(true)}
          className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-lg border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Likes
        </button>
      )}

      {user && (
        <button
          type="button"
          onClick={() => setStuff(false)}
          className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Recent
        </button>
      )}
      {user && !author && (
        <button
          type="button"
          onClick={() => setFollowing(true)}
          className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-lg border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Following
        </button>
      )}
      {user && author && user._id === author && (
        <button
          type="button"
          onClick={() => setList(true)}
          className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-lg border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Bookmarks
        </button>
      )}
    </div>
  );
}

export default BlogButtonGroup;
