import React, { Component } from "react";
import BlogList from "./blogList";
import TagStack from "./common/tagStack";

import Trending from "./trending";
import UserContext from "../userContext";
import AuthorList from "./common/authorList";
import { listAuthor } from "../services/apiService";
import Hero from "./common/hero";
function HomePage() {
  const { id: user } = React.useContext(UserContext);
  const [notFollowing, setNotFollowing] = React.useState([]);
  React.useEffect(() => {
    if (user) {
      const func = async () => {
        const authors = await listAuthor();
        const author = authors.data.filter(
          (a) => !user.following.includes(a._id) && user._id !== a._id
        );

        setNotFollowing(author);
      };

      func();
    }
  }, [user]);

  if (!user) {
    return (
      <React.Fragment>
        <Hero />
        <Trending />

        <div className="grid grid-cols-2 gap-4 place-content-between">
          <div className="">
            <BlogList />
          </div>
          <div className="">
            <TagStack />
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 place-content-between">
        <div className="">
          <BlogList />
        </div>
        <div className="fixed overflow-auto inset-y-0 right-0 mr-16 mt-20 scrollbar-hide">
          <AuthorList notFollowing={notFollowing} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
