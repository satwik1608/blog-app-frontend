import React from "react";
import { useNavigate } from "react-router-dom";
import { updateAuthor, uploadImage } from "../services/apiService";
import UserContext from "../userContext";
import { resizeFile } from "../services/imgService";

function AuthorUpdateForm() {
  const [data, setData] = React.useState({});
  const Navigate = useNavigate();
  const { id: user, setId } = React.useContext(UserContext);
  //   console.log(user);
  const nameRef = React.useRef("");
  const emailRef = React.useRef("");
  const professionRef = React.useRef("");

  const descriptionRef = React.useRef("");
  const usernameRef = React.useRef("");

  const handleChange = () => {
    const obj = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      profession: professionRef.current.value,

      description: descriptionRef.current.value,
    };

    setData(obj);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const author = await updateAuthor(user._id, data);

    setId(author.data);

    Navigate(`/author/${user._id}`);
  };

  React.useEffect(() => {
    console.log("usefdafs", user);
    usernameRef.current.value = user.username;
    // imgRef.current.value = user.imgThumb ? user.imgThumb : "";
    descriptionRef.current.value = user.description ? user.description : "";
    emailRef.current.value = user.email ? user.email : "";
    professionRef.current.value = user.profession ? user.profession : "";
    nameRef.current.value = user.name ? user.name : "";
  }, []);

  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update
        </h2>
        <form action="#" onSubmit={handleSubmit}>
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="w-full">
              <label
                for="brand"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="links only"
                required=""
                disabled="true"
                ref={usernameRef}
              />
            </div>
            <div class="w-full">
              <label
                for="brand"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                class="bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="links only"
                required=""
                ref={nameRef}
                onChange={handleChange}
              />
            </div>
            <div class="w-full">
              <label
                for="brand"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="brand"
                id="brand"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder=""
                required=""
                ref={emailRef}
                onChange={handleChange}
              />
            </div>

            <div class="w-full">
              <label
                for="brand"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Speciality
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="links only"
                required=""
                ref={professionRef}
                onChange={handleChange}
              />
            </div>

            <div class="sm:col-span-2">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Something about you
              </label>
              <textarea
                id="description"
                rows="8"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write your heart out"
                ref={descriptionRef}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white  bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Publish
          </button>
        </form>
      </div>
    </section>
  );
}

export default AuthorUpdateForm;
