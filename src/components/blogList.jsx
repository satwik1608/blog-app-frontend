import React, { Component, useReducer } from "react";
import Card from "./common/card";

import { getBlogs, updateAuthor } from "./../services/apiService";
import UserContext from "./../userContext";
import BlogListSkeleton from "./common/blogListSkeleton";

function BlogList({ id, author, tag, search }) {
  const [blogs, setBlogs] = React.useState([]);

  const [sort, setSort] = React.useState(false);
  const [following, setFollowing] = React.useState(false);
  const [list, setList] = React.useState(false);
  const { id: user, setId } = React.useContext(UserContext);
  const [isLoading, setisLoading] = React.useState(true);
  React.useEffect(() => {
    const getBlog = async () => {
      setisLoading(true);
      const blog = await getBlogs();

      let blogData = blog.data;
      blogData.reverse();
      if (sort) {
        blogData.sort((a, b) => b.likes - a.likes);
      }
      if (following) {
        const bl = blogData.filter((b) =>
          user.following.includes(b.author._id)
        );
        blogData = bl;
      }
      if (list) {
        const bl = blogData.filter((b) => user.lists.includes(b._id));
        blogData = bl;
      }

      if (author) {
        let blogD = blogData;
        if (!list) blogD = blogData.filter((b) => b.author._id === id);
        await setBlogs(blogD);
      } else if (tag) {
        const blogD = blogData.filter((b) => b.tags.includes(tag));

        await setBlogs(blogD);
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

        await setBlogs(blogD);
      } else {
        await setBlogs(blogData);
      }

      setisLoading(false);
    };

    getBlog();
  }, [tag, id, author, search, sort, following, list, user]);

  function setStuff() {
    setSort(false);
    setFollowing(false);
    setList(false);
  }

  const handleList = async (id, flag) => {
    const obj = {
      id: id,
    };
    let author;
    if (flag == 1) author = await updateAuthor(user._id, obj, "list");
    else author = await updateAuthor(user._id, obj, "delist");

    setId(author.data);
  };
  console.log("auth", author);
  if (isLoading)
    return (
      <div>
        <div class="inline-flex rounded-md shadow-sm" role="group">
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
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
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
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              Following
            </button>
          )}
          {user && author && user.name === author && (
            <button
              type="button"
              onClick={() => setList(true)}
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              Bookmarks
            </button>
          )}
        </div>

        <BlogListSkeleton />
        <BlogListSkeleton />
        <BlogListSkeleton />
        <BlogListSkeleton />
        <BlogListSkeleton />
        <BlogListSkeleton />
        <BlogListSkeleton />
        <BlogListSkeleton />
        <BlogListSkeleton />
      </div>
    );
  return (
    <div>
      <div class="inline-flex rounded-md shadow-sm" role="group">
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
            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
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
            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Following
          </button>
        )}
        {user && author && user.name === author && (
          <button
            type="button"
            onClick={() => setList(true)}
            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Bookmarks
          </button>
        )}
      </div>

      <ul className="m-4">
        {blogs.map((blog) => (
          <li className="m-2 list-none" key={blog._id}>
            <Card
              author={blog.author}
              authorId={blog.author._id}
              title={blog.title}
              tags={blog.tags}
              content={blog.content}
              date={blog.date}
              id={blog._id}
              brief={blog.brief}
              handleList={handleList}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
