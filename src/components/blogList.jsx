import React, { Component, useReducer } from "react";
import Card from "./common/card";

import { getBlogs } from "./../services/apiService";
import UserContext from "./../userContext";

function BlogList({ id, author, tag, search }) {
  const [blogs, setBlogs] = React.useState([]);

  const [sort, setSort] = React.useState(false);
  const [following, setFollowing] = React.useState(false);

  const { id: user } = React.useContext(UserContext);

  React.useEffect(() => {
    const getBlog = async () => {
      const blog = await getBlogs();

      let blogData = blog.data;

      // console.log("sort", sort);
      // console.log("follwing", following);
      if (sort) {
        blogData.sort((a, b) => b.likes - a.likes);
      }
      if (following) {
        const bl = blogData.filter((b) =>
          user.following.includes(b.author._id)
        );
        blogData = bl;
      }

      if (author) {
        const blogD = blogData.filter((b) => b.author._id === id);
        setBlogs(blogD);
      } else if (tag) {
        const blogD = blogData.filter((b) => b.tags.includes(tag));

        setBlogs(blogD);
      } else if (search) {
        const blogD = blogData.filter((b) => {
          const bl = b.title.toLowerCase().split(" ");
          const srch = search.toLowerCase();
          let flag = 0;
          bl.forEach((bll) => {
            if (bll.startsWith(srch)) ++flag;
          });
          if (flag) return true;
          return false;
        });

        setBlogs(blogD);
      } else {
        // console.log("blol", blogData);
        // setBlogs([]);
        setBlogs(blogData);

        console.log("blogData", blogData);
      }
    };

    getBlog();
  }, [tag, id, author, search, sort, following]);

  if (blogs.length === 0)
    return (
      <div>
        <div class="inline-flex rounded-md shadow-sm" role="group">
          {!user && (
            <button
              type="button"
              onClick={() => setSort(false)}
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              Recent
            </button>
          )}
          {!user && (
            <button
              type="button"
              onClick={() => setSort(true)}
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              Likes
            </button>
          )}
          {user && (
            <button
              type="button"
              onClick={() => setFollowing(false)}
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              Recent
            </button>
          )}
          {user && (
            <button
              type="button"
              onClick={() => setFollowing(true)}
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              Following
            </button>
          )}
        </div>
        <div>Best</div>;
      </div>
    );
  return (
    <div>
      <div class="inline-flex rounded-md shadow-sm" role="group">
        {!user && (
          <button
            type="button"
            onClick={() => setSort(false)}
            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Recent
          </button>
        )}
        {!user && (
          <button
            type="button"
            onClick={() => setSort(true)}
            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Likes
          </button>
        )}

        {user && (
          <button
            type="button"
            onClick={() => setFollowing(false)}
            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Recent
          </button>
        )}
        {user && (
          <button
            type="button"
            onClick={() => setFollowing(true)}
            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Following
          </button>
        )}
      </div>

      <ul className="m-4">
        {blogs.map((blog) => (
          <li className="m-2" key={blog._id}>
            <Card
              author={blog.author}
              authorId={blog.author._id}
              title={blog.title}
              tags={blog.tags}
              img={blog.img}
              content={blog.content}
              date={blog.date}
              id={blog._id}
              brief={blog.brief}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
