import React, { Component } from "react";
import { createComment, updateComment } from "../../services/apiService";

function CommentForm({ blog, onChange, isReply, id, onReset }) {
  const { _id } = blog;
  const [data, setData] = React.useState("nig");

  const textRef = React.useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isReply) {
      const comment = {
        reply: data,
      };

      await updateComment(comment, id);
      onReset();
    } else {
      const comment = {
        data: data,
        author: "clbm01co200005ouu7vlte9tf",
        blog: _id,
      };

      await createComment(comment);
    }

    onChange();
    setData("");
    textRef.current.value = "";
  };

  const handleChange = () => {
    setData(textRef.current.value);
  };
  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-100 border-round dark:bg-gray-800 dark:border-gray-700">
        <label for="comment" className="sr-only"></label>
        <textarea
          id="comment"
          rows="6"
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-black dark:placeholder-white bg-white"
          placeholder="Write a comment..."
          ref={textRef}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center btn-primary py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Post comment
      </button>
    </form>
  );
}

export default CommentForm;
