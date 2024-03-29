import React from "react";
import { useParams } from "react-router-dom";
import { getFollowers } from "../../services/apiService";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { all } from "axios";
import AuthorListSkeleton from "./authorListSkeleton";
function FollowerList() {
  const { id } = useParams();

  // const [followers, setFollowers] = React.useState([]);

  function fillSrc(follower) {
    if (follower.imgThumb) {
      return follower.imgThumb;
    }

    return "https://picsum.photos/200";
  }

  // React.useEffect(() => {
  //   const getFollow = async () => {
  //     const followes = await getFollowers(id);
  //     // console.log(followes);
  //     setFollowers(followes.data);
  //   };

  //   getFollow();
  // }, []);

  const allFollowerQuery = useQuery(
    ["allFollower"],
    async () => {
      const followers = await getFollowers(id);
      return followers.data;
    },
    {
      enabled: !!id,
    }
  );

  if (allFollowerQuery.isLoading) {
    return (
      <div className="flex flex-row flex-wide justify-center  ">
        <div className="md:p-2 md:w-1/2">
          <div class="mb-7  font-extrabold mt-4 border-b border-gray-200 tracking-tight leading-none text-gray-900 md:text-xl lg:text-4xl dark:text-white ">
            Followers
          </div>
          <div className="w-full  md:p-4 bg-white  rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <AuthorListSkeleton />
            <AuthorListSkeleton />
            <AuthorListSkeleton />
            <AuthorListSkeleton />
            <AuthorListSkeleton />
            <AuthorListSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wide justify-center  ">
      <div className="md:p-2 md:w-1/2">
        <div class="mb-7  font-extrabold mt-4 border-b border-gray-200 tracking-tight leading-none text-gray-900 md:text-xl lg:text-4xl dark:text-white ">
          Followers
        </div>
        <div className="w-full  md:p-4 bg-white  rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <ul className="list-none">
            {allFollowerQuery.data.map((follower) => (
              <Link
                to={`/author/${follower._id}`}
                className="flow-root"
                key={follower._id}
              >
                <ul
                  role="list"
                  className="divide-y divide-gray-200 list-none dark:divide-gray-700"
                >
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={fillSrc(follower)}
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {follower.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          @{follower.username}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {follower.email}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FollowerList;
