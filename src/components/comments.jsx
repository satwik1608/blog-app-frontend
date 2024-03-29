import React, { Component } from "react";
import CommentForm from "./common/commentForm";
import Comment from "./common/comment";
import { getComment } from "../services/apiService";
import { useUser, useUserApi } from "./../userContext";
function Comments({ blog }) {
  const [comments, setComment] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  const { id: user } = useUser();
  const { setId } = useUserApi();
  const handleRefresh = () => {
    setRefresh((c) => c + 1);
  };

  React.useEffect(() => {
    const getCom = async () => {
      const comments = await getComment();
      // console.log(comments.data);
      const comment = comments.data.filter(
        (c) => c.blog._id === blog._id && c.replyIs === false
      );
      setComment(comment);
    };

    getCom();
  }, [refresh]);

  if (comments.length === 0)
    return (
      <section class="bg-#1f2937 dark:bg-#1f2937 py-8 lg:py-16">
        <div class="max-w-2xl mx-auto px-4">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion ({comments.length})
            </h2>
          </div>
          {user && <CommentForm blog={blog} onChange={handleRefresh} />}
        </div>
      </section>
    );
  return (
    <section class="bg-#1f2937 dark:bg-#1f2937 py-8 lg:py-16">
      <div class="max-w-2xl mx-auto px-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({comments.length})
          </h2>
        </div>
        {user && <CommentForm blog={blog} onChange={handleRefresh} />}
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
