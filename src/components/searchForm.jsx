import React from "react";
import SearchBox from "./searchBox";
function SearchForm() {
  return (
    <div className="flex flex-col items-center justify-center h-96 ">
      <section class="bg-white dark:bg-gray-800">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Search for you Favorite blogs, authors :)
            </p>
            <p class="mb-4 text-lg font-light  dark:text-gray-400">
              or even your favorite topics
            </p>
          </div>
        </div>
      </section>
      <div>
        <SearchBox />
      </div>
    </div>
  );
}

export default SearchForm;
