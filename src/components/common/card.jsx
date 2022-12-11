import React, { Component } from "react";

function Card({ author, title, img, tags, content, date }) {
  return (
    <a
      href="#"
      className="flex flex-col items-center bg-white   md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div className="flex flex-col justify-between p-1 font-bold text-gray-900  leading-normal">
        <a>{author}</a>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
          {content}
        </p>
        <div className="flex items-center mt-2.5 mb-5">
          <p className="text-gray-500 font-normal text-sm">{date}</p>

          {tags.map((tag) => (
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src={img}
        alt={img}
      />
    </a>
  );
}

export default Card;
