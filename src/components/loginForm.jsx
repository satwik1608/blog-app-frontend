import React from "react";
import { login, logout } from "../services/authService";
function LoginForm() {
  const [data, setData] = React.useState({});
  const usernameRef = React.useRef("");
  const passwordRef = React.useRef("");
  const handleChange = () => {
    const obj = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    setData(obj);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(data);
    usernameRef.current.value = "";
    passwordRef.current.value = "";

    window.location = "./";
  };

  const handleLogout = () => {
    logout();
    window.location = "./";
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            for="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="string"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            onChange={handleChange}
            ref={usernameRef}
            required
          />
        </div>
        <div className="mb-6">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
            ref={passwordRef}
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <button
        onClick={handleLogout}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        logout
      </button>
    </React.Fragment>
  );
}

export default LoginForm;
