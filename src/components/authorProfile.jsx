import React, { Component } from "react";
import BlogList from "./blogList";
import ProfileRight from "./common/profileRight";
import { getAuthor } from "../services/apiService";
import { useParams } from "react-router-dom";
import { useUser } from "./../userContext";
import { useQuery } from "react-query";

function AuthorProfile() {
  const [author, setAuthor] = React.useState();
  const { id } = useParams();
  const { id: user } = useUser();

  React.useEffect(() => {
    const getAuth = async () => {
      const author = await getAuthor(id);
      setAuthor(author.data);
    };

    getAuth();
  }, [user, id]);

  if (!author) return <p>......</p>;
  console.log(author);
  return (
    <div>
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4 md:place-content-between ">
        <div className="p-2">
          <div className="mb-7 invisible font-extrabold border-b border-gray-800 tracking-tight leading-none text-lg dark:text-slate-100 md:visible  md:text-xl lg:text-4xl  ">
            {author.name}
          </div>

          <div className="lg:fixed lg:overflow-auto lg:inset-y-0 lg:right-0 lg:mt-28 lg:mr-16 lg:scrollbar-hide">
            <ProfileRight authorId={author._id} />
          </div>

          <BlogList id={id} author={author.name} />
        </div>
      </div>
    </div>
  );
}

export default AuthorProfile;
