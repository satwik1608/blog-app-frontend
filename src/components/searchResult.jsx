import React from "react";
import BlogList from "./blogList";
import TagStack from "./common/tagStack";
import AuthorList from "./common/authorList";
import { useParams } from "react-router-dom";

function SearchResult() {
  const { data } = useParams();
  return (
    <React.Fragment>
      <div className="grid grid-cols-3 gap-4 place-content-between">
        <div>
          <h1 className="mt-3 mb-7 font-extrabold border-b border-black dark:border-slate-100 tracking-tight leading-none text-gray-900 md:text-xl lg:text-4xl dark:text-white ">
            Blogs
          </h1>
          <BlogList search={data} />
        </div>

        <div>
          <h1 className="mt-3 mb-7 font-extrabold border-b border-black dark:border-slate-100 tracking-tight leading-none text-gray-900 md:text-xl lg:text-4xl dark:text-white ">
            Tags
          </h1>
          <TagStack search={data} />
        </div>
        <div>
          <h1 className="mt-3 mb-7 font-extrabold border-b border-black dark:border-slate-100 tracking-tight leading-none text-gray-900 md:text-xl lg:text-4xl dark:text-white ">
            Authors
          </h1>
          <AuthorList search={data} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default SearchResult;
