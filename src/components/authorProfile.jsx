import React, { Component } from "react";
import BlogList from "./blogList";
import ProfileRight from "./common/profileRight";
import { getAuthor } from "../services/apiService";
import { useParams } from "react-router-dom";

function AuthorProfile() {
  const [author, setAuthor] = React.useState([]);
  const { id } = useParams();

  React.useState(() => {
    const getAuth = async () => {
      const author = await getAuthor(id);
      setAuthor(author.data);
    };

    getAuth();
  }, []);

  return (
    <div>
      <div className="flex flex-row flex-wide   justify-center  ">
        <div className="p-2">
          <div className="mb-7  font-extrabold border-b border-gray-200 tracking-tight leading-none text-slate-50  md:text-xl lg:text-4xl  ">
            {author.name}
          </div>

          {author.name && <BlogList id={id} author={author.name} />}
        </div>

        {author.name && <ProfileRight author={author} />}
      </div>
    </div>
  );
}

export default AuthorProfile;
