import React from "react";
import BlogList from "./blogList";
import TagStack from "./common/tagStack";
import AuthorList from "./common/authorList";
import { useParams } from "react-router-dom";

function SearchResult() {
  const { data } = useParams();
  return (
    <React.Fragment>
      <div className="flex flex-row">
        <BlogList search={data} />
        <TagStack search={data} />
        <AuthorList search={data} />
      </div>
    </React.Fragment>
  );
}

export default SearchResult;
