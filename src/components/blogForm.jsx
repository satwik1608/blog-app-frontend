import React from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../userContext";
import { createBlog } from "./../services/apiService";

import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import Explicit from "./common/explicit";
const Header = require("@editorjs/header");

const edjsHTML = require("editorjs-html");
const edjsParser = edjsHTML();

function BlogForm() {
  const imgRef = React.useRef("");
  const titleRef = React.useRef("");
  const contentRef = React.useRef("");
  const tagsRef = React.useRef("");
  const navigate = useNavigate();
  const edito = React.useRef(false);
  const editor = React.useRef();
  React.useEffect(() => {
    if (!edito.current) {
      editor.current = new EditorJS({
        holder: "editor",

        tools: {
          header: {
            class: Header,
            levels: [2, 3, 4],
            defaultLevel: 2,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
        },
      });
      edito.current = true;
    }
  }, []);

  const [data, setData] = React.useState({});
  const [content, setContent] = React.useState([]);
  const { id: user } = React.useContext(UserContext);
  let userId;

  if (user) userId = user._id;
  else userId = "";
  const handleChange = () => {
    const tags = tagsRef.current.value.split(" ");

    editor.current
      .save()
      .then((outputData) => {
        console.log("Article data: ", outputData);
        const html = edjsParser.parse(outputData);
        setContent(html);
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
    const obj = {
      img: imgRef.current.value,
      title: titleRef.current.value,
      content: content,
      tags: tags,
      author: userId,
    };
    setData(obj);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("data", data);
    await createBlog(data);
    navigate("/");
  };

  return (
    <section class="bg-white dark:bg-gray-900 grade">
      <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add your own Blog !!
        </h2>
        <form action="#" onSubmit={handleSubmit}>
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type the blog title"
                required=""
                ref={titleRef}
                onChange={handleChange}
              />
            </div>
            <div class="w-full">
              <label
                for="brand"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title Image Link
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="links only"
                required=""
                ref={imgRef}
                onChange={handleChange}
              />
            </div>
            <div class="w-full">
              <label
                for="brand"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tags
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Give space between 2 tags"
                required=""
                ref={tagsRef}
                onChange={handleChange}
              />
            </div>

            <div class="sm:col-span-2 editable">
              {/* <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Content
              </label> */}
              {/* <textarea
                id="description"
                rows="8"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write your heart out"
                ref={contentRef}
                onChange={handleChange}
              ></textarea> */}
              <div
                id="editor"
                className="text-slate-600 border border-white"
              ></div>
            </div>
          </div>
          <button
            type="submit"
            class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Publish
          </button>
        </form>
      </div>
    </section>
  );
}

export default BlogForm;
