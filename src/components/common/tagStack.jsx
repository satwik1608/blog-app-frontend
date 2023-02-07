import React, { Component } from "react";
import { getBlogs } from "../../services/apiService";
import { Link } from "react-router-dom";
function TagStack({ search }) {
  const [blogs, setBlogs] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const num = React.useRef(0);
  const [loading, setLoading] = React.useState(false);
  const call = async () => {
    const tag = [];
    blogs.forEach((b) => {
      const tagss = b.tags;

      tagss.forEach((t) => {
        if (search) {
          if (t.toLowerCase().startsWith(search.toLowerCase())) tag.push(t);
        } else tag.push(t.toLowerCase());
      });
    });

    const uniqueArray = [...new Set(tag)];
    // console.log(uniqueArray);
    await setTags(uniqueArray);
  };

  React.useEffect(() => {
    setLoading(true);
    const getBl = async () => {
      const bl = await getBlogs();

      await setBlogs(bl.data);

      await call();
      console.log(blogs);
      setLoading(false);
    };

    getBl();
  }, [num.current, search]);

  if (blogs.length === 0 && num.current < 1) {
    ++num.current;
  }

  if (loading) {
    return (
      <div role="status" class="space-y-2.5 mt-4 animate-pulse max-w-lg">
        <div class="flex items-center w-full space-x-2">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        </div>
        <div class="flex items-center w-full space-x-2 max-w-[480px]">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
        </div>
        <div class="flex items-center w-full space-x-2 max-w-[400px]">
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        </div>
        <div class="flex items-center w-full space-x-2 max-w-[480px]">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
        </div>
        <div class="flex items-center w-full space-x-2 max-w-[440px]">
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        </div>
        <div class="flex items-center w-full space-x-2 max-w-[360px]">
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        </div>
        <span class="sr-only">Loading...</span>
      </div>
    );
  }

  if (tags.length === 0) {
    if (search) {
      return (
        <li className="py-3 sm:py-4 list-none text-center">
          <p className=" font-medium text-gray-900 truncate dark:text-white">
            No tags with given keyword
          </p>
        </li>
      );
    } else {
      return (
        <li className="py-3 sm:py-4 list-none text-center">
          <p className=" font-medium text-gray-900 truncate dark:text-white">
            Apparently no blogs had a tag
          </p>
        </li>
      );
    }
  }

  return (
    <div className="p-10">
      <ul className="flex flex-row flex-wrap">
        {tags.map((tag) => (
          <Link
            type="button"
            to={`/tags/${tag}`}
            className="py-2.5 px-5 mr-2 mb-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {tag}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default TagStack;
