import React, { Component } from "react";
import BlogList from "./blogList";
import TagStack from "./common/tagStack";

import Trending from "./trending";
function HomePage() {
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

export default HomePage;
