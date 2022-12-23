import React, { Component } from "react";
import BlogList from "./blogList";
import TagStack from "./common/tagStack";

import Trending from "./trending";
import UserContext from "./../userContext";
function HomePage() {
  const { id: user } = React.useContext(UserContext);

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
      </div>
    </React.Fragment>
  );
}

export default HomePage;
