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
import { ReactQueryDevtools } from "react-query/devtools";
import { Navigate } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import { UserProvider } from "./userContext";

import { Route, Routes, Redirect } from "react-router-dom";

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
import SearchBox from "./components/searchBox";
import SearchForm from "./components/searchForm";
function App() {
  return (
    <React.Fragment>
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
      <UserProvider>
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
          <Route path="/search" element={<SearchForm />} />
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
      </UserProvider>
      <ReactQueryDevtools />
    </React.Fragment>
  );
}

export default App;
