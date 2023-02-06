import React, { Component } from "react";
import { getBlogs } from "../../services/apiService";
import { Link } from "react-router-dom";
function TagStack({ search }) {
  const [blogs, setBlogs] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const num = React.useRef(0);

  const call = () => {
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
    setTags(uniqueArray);
  };

  React.useEffect(() => {
    const getBl = async () => {
      const bl = await getBlogs();

      setBlogs(bl.data);

      call();
    };

    getBl();
  }, [num.current, search]);

  if (blogs.length === 0) {
    ++num.current;
  }
  if (blogs.length === 0) return <p>wait</p>;

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
