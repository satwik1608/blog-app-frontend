import React, { Component } from "react";
import { createComment, updateComment } from "../../services/apiService";
import { useUser } from "../../userContext";

function CommentForm({ blog, onChange, isReply, id, onReset }) {
  const { _id } = blog;
  const [data, setData] = React.useState("nig");
  const { id: user } = useUser();
  const textRef = React.useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isReply) {
      // const idd = userId.current;
      // const comment = {
      //   reply: { data, idd },
      // };
      let comment = {
        data: data,
        blog: _id,
        replyIs: true,
      };
      const com = await createComment(comment);

      comment = {
        reply: com.data._id,
      };
      onReset();
      await updateComment(comment, id);
    } else {
      const comment = {
        data: data,
        blog: _id,
        replyIs: false,
      };
      // console.log(comment);
      console.group("Comment testing");
      console.log("This works");
      console.log(user);
      console.groupEnd();
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
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg  border border-gray-100 border-round dark:bg-gray-800 dark:border-gray-700">
        <label for="comment" className="sr-only"></label>
        {isReply && (
          <textarea
            id="comment"
            rows="6"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a reply..."
            ref={textRef}
            onChange={handleChange}
            required
          />
        )}
        {!isReply && (
          <textarea
            id="comment"
            rows="6"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            ref={textRef}
            onChange={handleChange}
            required
          />
        )}
      </div>
      {!isReply && (
        <button
          type="submit"
          className="inline-flex items-center btn-primary py-2.5 px-4 text-xs font-medium text-center  bg-blue-700 text-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Post comment
        </button>
      )}
      {isReply && (
        <button
          type="submit"
          className="inline-flex items-center btn-primary py-2.5 px-4 text-xs font-medium text-center  bg-blue-700 text-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Post Reply
        </button>
      )}
    </form>
  );
}

export default CommentForm;
