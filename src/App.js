import CardSm from "./components/common/cardSm";
import Card from "./components/common/card";
import React from "react";
import Trending from "./components/trending";
import BlogList from "./components/blogList";
import ProfileRight from "./components/common/profileRight";

import AuthorProfile from "./components/authorProfile";
import TagProfile from "./components/tagProfile";
import BlogFull from "./components/blogFull";
import Comment from "./components/comments";
import HomePage from "./components/homePage";
import TagStack from "./components/common/tagStack";
import RegisterForm from "./components/registerForm";
import SearchBox from "./components/searchBox";
import { getCurrentUser } from "./services/authService";
import UserContext from "./userContext";
import http from "./services/httpService";
import {
  BrowserRouter as Router,
  Route,
  route,
  Routes,
  routes,
} from "react-router-dom";
import LoginForm from "./components/loginForm";
import NavBar from "./components/navBar";
import SearchResult from "./components/searchResult";
import { getAuthorId } from "./services/apiService";
import BlogForm from "./components/blogForm";

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
          <Route path="new-blog" element={<BlogForm />} />
        </Routes>
      </UserContext.Provider>
    </React.Fragment>
  );
}

export default App;
