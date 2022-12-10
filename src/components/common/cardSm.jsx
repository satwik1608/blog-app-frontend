import React, { Component } from "react";

function CardSm({ author, title }) {
  return (
    <a
      href="#"
      className="block max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <a className="font-bold text-gray-900">{author}</a>
      <div className="badge badge-secondary m-2">Trending</div>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
    </a>
  );
}

export default CardSm;
