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
      console.log("aufhsdkj", author.data);
      setAuthor(author.data);
      if (author.data.imgThumb) setImgThumb(author.data.imgThumb.img.data.data);
    };

    getAuth();
  }, [user]);

  if (author.length === 0) return <p>......</p>;
  return (
    <div>
      <div className="flex flex-row  ">
        <div className="p-2">
          <div className="mb-7  font-extrabold border-b border-gray-200 tracking-tight leading-none text-slate-50  md:text-xl lg:text-4xl  ">
            {author.name}
          </div>

          <BlogList id={id} author={author.name} />
        </div>
        <div className="fixed  inset-y-0 right-0 mt-28 mr-16 scrollbar-hide">
          <ProfileRight author={author} />
        </div>
      </div>
    </div>
  );
}

export default AuthorProfile;
