import React, { Component } from "react";
import BlogList from "./blogList";
import TagStack from "./common/tagStack";

import Trending from "./trending";
import { useUser } from "./../userContext";
import AuthorList from "./common/authorList";
import { listAuthor } from "../services/apiService";
import Hero from "./common/hero";
function HomePage() {
  const { id: user, setId } = useUser();
  console.log("wow", user);
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

        <div className="md:grid md:grid-cols-2 md:gap-4 md:place-content-between">
          <div className="">
            <BlogList />
          </div>
          <div className="invisible md:visible">
            <TagStack />
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <>
      <div className="md:grid md:grid-cols-2 md:gap-4 md:place-content-between">
        <div className="">
          <BlogList />
        </div>
        <div className="fixed overflow-auto inset-y-0 right-0 mr-16 mt-20 scrollbar-hide invisible md:visible">
          <AuthorList notFollowing={notFollowing} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
