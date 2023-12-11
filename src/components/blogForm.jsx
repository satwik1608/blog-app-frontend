import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./../userContext";
import { createBlog, uploadImage } from "./../services/apiService";
import { resizeFile } from "../services/imgService";

import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Underline from "@editorjs/underline";
import http from "../services/httpService";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { title } from "@uiw/react-md-editor";
const Header = require("@editorjs/header");
const Marker = require("@editorjs/marker");
const InlineCode = require("@editorjs/inline-code");
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
  const [titleError, setTitleError] = React.useState("");
  const [briefError, setbriefError] = React.useState("");
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
          Marker: {
            class: Marker,
          },
          inlineCode: {
            class: InlineCode,
          },
        },
        onChange: (api, event) => {
          // console.log("gd");
          const tagss = tagsRef.current.value.toLowerCase();

          const tags = tagss.split(" ");
          editor.current
            .save()
            .then((outputData) => {
              // console.log("Article data: ", outputData);
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
              // console.log(obj);
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

  const { id: user } = useUser();
  let userId;

  if (user) userId = user._id;
  else userId = "";
  const handleChange = () => {
    const tagss = tagsRef.current.value.toLowerCase();

    const tags = tagss.split(" ");
    const obj = {
      title: titleRef.current.value,
      brief: briefRef.current.value,
      img: imgDataRef.current,
      content: content,
      tags: tags,
      author: userId,
    };
    // console.log(obj);
    setData(obj);
  };

  const handleImage = async () => {
    const testImage = await resizeFile(imgRef.current.files[0]);
    const tagss = tagsRef.current.value.toLowerCase();

    const tags = tagss.split(" ");
    // console.log(testImage);
    const imageRef = ref(storage, `blogImg/${testImage.name + v4()}`);

    try {
      await uploadBytes(imageRef, testImage);
      const link = await getDownloadURL(imageRef);
      imgDataRef.current = link;
      const obj2 = {
        title: titleRef.current.value,
        brief: briefRef.current.value,
        img: link,
        content: content,
        tags: tags,
        author: userId,
      };
      setData(obj2);
      // console.log(link);
    } catch (ex) {
      console.log(ex);
      // console.log("wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      titleRef.current.value.length < 3 ||
      titleRef.current.value.length > 70
    ) {
      setTitleError("Title should be between 3 - 70 characters");
      setbriefError("");
      return;
    }
    if (
      briefRef.current.value.length < 3 ||
      briefRef.current.value.length > 150
    ) {
      setbriefError("Brief should be between 3 - 150 characters");
      setTitleError("");
      return;
    }

    try {
      await createBlog(data);
      setTitleError("");
      setbriefError("");
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
            {titleError && (
              <div
                class="flex p-1 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-900 dark:text-red-400"
                role="alert"
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 inline w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Info</span>
                <div>{titleError}</div>
              </div>
            )}
            <div class="w-full">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="file_input"
              >
                Upload Image
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
            {briefError && (
              <div
                class="flex p-1 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-900 dark:text-red-400"
                role="alert"
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 inline w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Info</span>
                <div>{briefError}</div>
              </div>
            )}

            <div class="sm:col-span-2 editable rounded-lg border border-gray-200 dark:bg-indigo-300 bg-white dark:rounded">
              <div
                id="editor"
                className="text-black"
                onChange={editor.handleChange}
              ></div>
            </div>
          </div>
          <button
            type="submit"
            class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center  text-white  bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Publish
          </button>
        </form>
      </div>
    </section>
  );
}

export default BlogForm;
