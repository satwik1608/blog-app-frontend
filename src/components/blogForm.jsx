import React from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../userContext";
import { createBlog, uploadImage } from "./../services/apiService";
import { resizeFile } from "../services/imgService";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";

import Underline from "@editorjs/underline";
const Header = require("@editorjs/header");

const edjsHTML = require("editorjs-html");
const edjsParser = edjsHTML();

function BlogForm() {
  const titleRef = React.useRef("");
  const imgRef = React.useRef();
  const imgDataRef = React.useRef("");
  const briefRef = React.useRef("");
  const tagsRef = React.useRef("");
  const navigate = useNavigate();
  const edito = React.useRef(false);
  const editor = React.useRef();

  const [isBlogFilled, setIsBlogFilled] = React.useState(false);
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
          underline: {
            class: Underline,
          },
        },
        onChange: (api, event) => {
          const tags = tagsRef.current.value.split(" ");
          editor.current
            .save()
            .then((outputData) => {
              console.log("Article data: ", outputData);
              const html = edjsParser.parse(outputData);
              setContent(html);
              const obj = {
                title: titleRef.current.value,
                brief: briefRef.current.value,
                img: imgDataRef.current,
                content: html,
                tags: tags,
                author: userId,
              };
              setData(obj);
              console.log(obj);
            })
            .catch((error) => {
              console.log("Saving failed: ", error);
            });
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
    const obj = {
      title: titleRef.current.value,
      brief: briefRef.current.value,
      img: imgDataRef.current,
      content: content,
      tags: tags,
      author: userId,
    };
    setData(obj);
  };

  const handleImage = async () => {
    const testImage = await resizeFile(imgRef.current.files[0]);
    console.log("tes", testImage);
    console.log("tes2", imgRef.current.files[0]);
    const obj = {
      name: "test",
      testImage: testImage,
    };

    const img = await uploadImage(obj);

    imgDataRef.current = img.data._id;
    const tags = tagsRef.current.value.split(" ");
    const obj2 = {
      title: titleRef.current.value,
      brief: briefRef.current.value,
      img: imgDataRef.current,
      content: content,
      tags: tags,
      author: userId,
    };
    setData(obj2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBlog(data);
      navigate("/");
    } catch (ex) {
      console.log(ex);
    }
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
                required="true"
                ref={titleRef}
                onChange={handleChange}
              />
            </div>
            <div class="w-full">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="file_input"
              >
                Upload file
              </label>
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                name="file"
                required="true"
                ref={imgRef}
                onChange={handleImage}
                type="file"
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
                required="true"
                ref={tagsRef}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                for="brand"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Story in Brief
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="in short"
                required="true"
                ref={briefRef}
                onChange={handleChange}
              />
            </div>

            <div class="sm:col-span-2 editable bg-indigo-300 rounded-lg">
              <div
                id="editor"
                className="text-black "
                onChange={editor.handleChange}
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
