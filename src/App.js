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

import { getCurrentUser } from "./services/authService";

import UserContext from "./userContext";

import { Route, Routes } from "react-router-dom";

import { getAuthorId } from "./services/apiService";
import RequireAuth from "./components/requireAuth";
import AuthorUpdateForm from "./components/authorUpdateForm";

function App() {
  const [user, setUser] = React.useState();
  const [id, setId] = React.useState();

  React.useEffect(() => {
    const author = getCurrentUser();

    if (author) {
      const func = async () => {
        const auth = await getAuthorId(author.username);

        setId(auth.data);
        // console.log("id", id);
        // console.log("auth", auth.data);
      };
      func();
      setUser(author.username);
    }
  }, []);

  return (
    <React.Fragment>
      <UserContext.Provider value={{ id, setId }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/author/:id" element={<AuthorProfile />} />
          <Route path="/search/:data" element={<SearchResult />} />
          <Route path="blogs/:id" element={<BlogFull />} />
          <Route path="tags/:tag" element={<TagProfile />} />

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
        </Routes>
      </UserContext.Provider>
    </React.Fragment>
  );
}

export default App;
