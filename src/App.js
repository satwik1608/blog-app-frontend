import React from "react";

import AuthorProfile from "./components/authorProfile";
import TagProfile from "./components/tagProfile";
import BlogFull from "./components/blogFull";
import HomePage from "./components/homePage";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import NavBar from "./components/navBar";
import SearchResult from "./components/searchResult";
import BlogForm from "./components/blogForm";
import { ToastContainer } from "react-toastify";
import { getCurrentUser, logout } from "./services/authService";
import { Navigate } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import UserContext from "./userContext";

import { Route, Routes, Redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { getAuthorId } from "./services/apiService";
import RequireAuth from "./components/requireAuth";
import AuthorUpdateForm from "./components/authorUpdateForm";
import { toast } from "react-toastify";
import Modal from "./components/common/modal";
import FollowerList from "./components/common/followerList";
import Footer from "./components/footer";
import Page404 from "./components/common/page404";
import InProgress from "./components/common/inProgress";
import EmailVerify from "./components/common/verifyEmail";
function App() {
  const [user, setUser] = React.useState();
  const [id, setId] = React.useState();

  const queryClient = new QueryClient();

  React.useEffect(() => {
    var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
    var themeToggleLightIcon = document.getElementById(
      "theme-toggle-light-icon"
    );

    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      themeToggleLightIcon.classList.remove("hidden");
    } else {
      themeToggleDarkIcon.classList.remove("hidden");
    }

    var themeToggleBtn = document.getElementById("theme-toggle");

    themeToggleBtn.addEventListener("click", function () {
      // toggle icons inside button
      themeToggleDarkIcon.classList.toggle("hidden");
      themeToggleLightIcon.classList.toggle("hidden");

      // if set via local storage previously
      if (localStorage.getItem("color-theme")) {
        // console.log(localStorage.getItem("color-theme"), "lol");
        if (localStorage.getItem("color-theme") === "light") {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains("dark")) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
        } else {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
        }
      }
    });
    const author = getCurrentUser();

    if (author) {
      const func = async () => {
        const auth = await getAuthorId(author.username);

        setId(auth.data);
      };
      func();
      setUser(author.username);
    }
  }, []);

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <UserContext.Provider value={{ id, setId }}>
          <NavBar />

          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/author/:id" element={<AuthorProfile />} />
            <Route path="/search/:data" element={<SearchResult />} />
            <Route path="blogs/:id" element={<BlogFull />} />
            <Route path="tags/:tag" element={<TagProfile />} />
            <Route path="/followers/:id" element={<FollowerList />} />
            <Route path="/404" element={<Page404 />} />
            <Route path="/in-transit" element={<InProgress />} />
            <Route path="/verify-email" element={<EmailVerify />} />
            <Route
              path="new-blog"
              element={
                <RequireAuth>
                  <BlogForm />
                </RequireAuth>
              }
            />
            <Route
              path="edit-author"
              element={
                <RequireAuth>
                  <AuthorUpdateForm />
                </RequireAuth>
              }
            />
            <Route path="/" exact element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          {/* <Footer /> */}
        </UserContext.Provider>
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
