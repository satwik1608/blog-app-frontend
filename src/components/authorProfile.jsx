import React, { Component } from "react";
import BlogList from "./blogList";
import ProfileRight from "./common/profileRight";
import { getAuthor } from "../services/apiService";
import { useParams } from "react-router-dom";
import UserContext from "./../userContext";

function AuthorProfile() {
  const [author, setAuthor] = React.useState([]);
  const { id } = useParams();
  const { id: user } = React.useContext(UserContext);
  const [imgThumb, setImgThumb] = React.useState("");
  const [wait, setWait] = React.useState(true);

  React.useEffect(() => {
    const getAuth = async () => {
      const author = await getAuthor(id);
      setAuthor(author.data);
    };

    getAuth();
  }, [user, id]);

  if (author.length === 0) return <p>......</p>;
  return (
    <div>
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4 md:place-content-between ">
        <div className="p-2">
          <div className="mb-7 invisible font-extrabold border-b border-gray-800 tracking-tight leading-none text-lg dark:text-slate-100 md:visible  md:text-xl lg:text-4xl  ">
            {author.name}
          </div>

          <div className="md:fixed  overflow-auto md:inset-y-0 md:right-0 md:mt-28 md:mr-16 scrollbar-hide">
            <ProfileRight author={author} />
          </div>

          <BlogList id={id} author={author.name} />
        </div>
      </div>
    </div>
  );
}

export default AuthorProfile;
