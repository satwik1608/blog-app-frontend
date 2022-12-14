import React, { Component } from "react";
import CommentForm from "./common/commentForm";
import Comment from "./common/comment";
import { getComment } from "../services/apiService";
function Comments({ blog }) {
  const [comments, setComment] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);

  const handleRefresh = () => {
    setRefresh((c) => c + 1);
  };

  React.useEffect(() => {
    const getCom = async () => {
      const comments = await getComment();

      setComment(comments.data);
    };

    getCom();
  }, [refresh]);

  if (comments === []) return <p>Wait</p>;
  return (
    <section class="bg-white dark:bg-gray-900 py-8 lg:py-16">
      <div class="max-w-2xl mx-auto px-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({comments.length})
          </h2>
        </div>
        <CommentForm blog={blog} onChange={handleRefresh} />
        <ul>
          {comments.map((comment) => (
            <Comment comment={comment} onChange={handleRefresh} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Comments;
