import React from "react";
import UserContext from "../userContext";
import { createBlog } from "./../services/apiService";

function BlogForm() {
  const imgRef = React.useRef("");
  const titleRef = React.useRef("");
  const contentRef = React.useRef("");
  const tagsRef = React.useRef("");

  const [data, setData] = React.useState({});
  const { id: user } = React.useContext(UserContext);
  let userId;

  if (user) userId = user._id;
  else userId = "";
  const handleChange = () => {
    const tags = tagsRef.current.value.split(";");
    const obj = {
      img: imgRef.current.value,
      title: titleRef.current.value,
      content: contentRef.current.value,
      tags: tags,
      author: userId,
    };

    setData(obj);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", data);
    await createBlog(data);

    window.location = "./";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="relative z-0 mb-6 w-full group">
        <input
          type="string"
          name="title"
          id="title"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          ref={titleRef}
          onChange={handleChange}
          required
        />
        <label
          for="title"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Title
        </label>
      </div>
      <div class="relative z-0 mb-6 w-full group">
        <input
          type="string"
          name="titleImage"
          id="titleImage"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          ref={imgRef}
          onChange={handleChange}
          required
        />
        <label
          for="titleImage"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Cover image (link)
        </label>
      </div>
      <div class="relative z-0 mb-6 w-full group">
        <input
          type="string"
          name="tags"
          id="floating_tags"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder="  "
          ref={tagsRef}
          onChange={handleChange}
          required
        />
        <label
          for="floating_tags"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Tags (tag1;tag2;tag3)
        </label>
      </div>

      <textarea
        id="message"
        rows="4"
        class="block p-2.5 mb-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your heart out :)"
        ref={contentRef}
        onChange={handleChange}
      ></textarea>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}

export default BlogForm;
