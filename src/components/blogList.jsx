import React from "react";
import {
  getAuthorBookmark,
  getBlogs,
  updateAuthor,
} from "./../services/apiService";
import { useUser, useUserApi } from "./../userContext";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Card from "./common/card";
import BlogListSkeleton from "./common/blogListSkeleton";

function BlogList({ id, author, tag, search }) {
  const [sort, setSort] = React.useState(false);
  const [following, setFollowing] = React.useState(false);
  const [list, setList] = React.useState(false);
  const { id: user } = useUser();
  const { setId } = useUserApi();
  const blogQuery = useQuery(
    ["blogs", tag, author, search, sort, following],
    async () => {
      console.log("Does it runs always");
      let isSort = false; // sorting on the basis of likes
      if (sort) isSort = true;
      const opts = { isSort: isSort, tag, author, search };
      const blog = await getBlogs(opts);

      let blogData = blog.data;

      if (following) {
        const bl = blogData.filter((b) =>
          user.following.includes(b.author._id)
        );
        blogData = bl;
      }
      return blogData;
    }
  );

  const bookmarkQuery = useQuery(
    ["bookmark"],
    async () => {
      console.log("Book mark query =>", author, list);
      const blog = await getAuthorBookmark();
      console.log("Its here -> ", blog);
      return blog.data[0].lists;
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!list,
    }
  );

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
    if (flag == 1) author = await updateAuthor(obj, "list");
    else author = await updateAuthor(obj, "delist");

    setId(author.data);
  };

  if (blogQuery.isLoading)
    return (
      <div>
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
          {user && author && user._id === author && (
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

  if (blogQuery.data.length === 0) {
    return (
      <div>
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
          {user && author && user._id === author && (
            <button
              type="button"
              onClick={() => setList(true)}
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              Bookmarks
            </button>
          )}
        </div>
        <section class="bg-white dark:bg-gray-800">
          <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm text-center">
              <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-7xl  dark:text-slate-100">
                OOPS !!
              </h1>
              <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-3xl dark:text-white">
                No blogs found :(
              </p>
              <p class="mb-4 text-lg font-light  dark:text-gray-400"></p>
              <Link
                to="/"
                class="inline-flex bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-slate-100 dark:focus:ring-primary-900 my-4"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
  return (
    <div>
      <div class="inline-flex rounded-md mt-4 md:mt-0 shadow-sm" role="group">
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
        {user && author && user._id === author && (
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
        {!list &&
          blogQuery.data.map((blog) => (
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
                img={blog.img}
              />
            </li>
          ))}
        {list &&
          bookmarkQuery.isSuccess &&
          bookmarkQuery.data.map((blog) => (
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
                img={blog.img}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default BlogList;
