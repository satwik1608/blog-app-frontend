import React, { Component } from "react";
import CommentForm from "./commentForm";
import UserContext from "./../../userContext";
const { formatDate } = require("../../services/utils");
function Comment({ comment, onChange }) {
  const [reply, setReply] = React.useState(false);
  const [replyOpen, setReplyOpen] = React.useState(false);
  const { id: user } = React.useContext(UserContext);
  React.useEffect(() => {
    if (!comment.reply) setReply(false);
    else setReply(true);
  }, []);

  const onReset = () => {
    setReply(true);
    setReplyOpen(false);
  };

  return (
    <div
      class="p-6 mb-6 text-base bg-#1f2937 border-t border-gray-200 dark:border-gray-700 dark:bg-#1f2937"
      key={comment._id}
    >
      <footer class="flex justify-between items-center mb-2">
        <div class="flex items-center">
          <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            <img
              class="mr-2 w-6 h-6 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt="Michael Gough"
            />
            {comment.author.name}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            <div>{formatDate(comment.date)}</div>
          </p>
        </div>
      </footer>
      <div class="text-gray-500 dark:text-gray-400 break-words">
        {comment.data}
      </div>
      <div class="flex items-center mt-4 space-x-4 	">
        {!reply && user && (
          <button
            type="button"
            class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
            onClick={() => setReplyOpen((r) => !r)}
          >
            <svg
              aria-hidden="true"
              class="mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            Reply
          </button>
        )}
        {replyOpen && user && (
          <CommentForm
            blog={comment.blog}
            onChange={onChange}
            isReply={true}
            id={comment._id}
            onReset={onReset}
          />
        )}
        {comment.reply && (
          <div
            class="p-6 mb-6 text-base bg-#1f2937 rounded-lg max-w-full dark:bg-#1f2937"
            key={comment.reply.author._id}
          >
            <footer class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm  text-gray-900 dark:text-white">
                  <img
                    class="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael Gough"
                  />
                  {comment.reply.author.name}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  <div>{formatDate(comment.reply.date)}</div>
                </p>
              </div>
            </footer>
            <div class="text-gray-500 dark:text-gray-400 break-words ">
              {comment.reply.data}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
