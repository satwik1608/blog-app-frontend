import React, { Component } from "react";
import BlogList from "./blogList";
import TagStack from "./common/tagStack";

import Trending from "./trending";
import UserContext from "./../userContext";
import AuthorList from "./common/authorList";
import { listAuthor } from "../services/apiService";
function HomePage() {
  const { id: user } = React.useContext(UserContext);
  const [notFollowing, setNotFollowing] = React.useState([]);
  React.useEffect(() => {
    if (user) {
      const func = async () => {
        const authors = await listAuthor();

        const author = authors.data.filter(
          (a) => !user.following.includes(a._id)
        );

        setNotFollowing(author);
        console.log("not", notFollowing);
      };

      func();
    }
  }, [user]);

  if (!user) {
    return (
      <React.Fragment>
        <Trending />

        <div className="flex flex-row">
          <div className="flex-grow">
            <BlogList />
          </div>
          <div className="flex-1">
            <TagStack />
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="flex flex-row">
        <div className="flex-grow">
          <BlogList />
        </div>
        <AuthorList notFollowing={notFollowing} />
      </div>
    </React.Fragment>
  );
}

export default HomePage;
