import React, { Component } from "react";

function CardSm({ author, title }) {
  return (
    <a
      href="#"
      className="block max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <a className="font-bold text-bg-neutral-900 font-xs">{author}</a>

      <h5 className="mb-2 text-xl font-bold tracking-tight text-bg-neutral-900 dark:text-white">
        {title}
      </h5>
    </a>
  );
}

export default CardSm;
