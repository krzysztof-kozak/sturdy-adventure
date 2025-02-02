import { BrowserRouter, Routes, Route } from "react-router";

import { Home } from "./Home";

import { Article } from "./features/Article/Article";
import { Profile } from "./features/Profile/Profile";

import { Editor } from "./Editor";
import { Login } from "./features/Login/Login";
import { Logout } from "./features/Logout/Logout";
import { Settings } from "./Settings";
import { HomeLayout } from "layouts/HomeLayout";
import { ArticleList } from "features/GlobalArticleList/ArticleList";
import { NotFound } from "features/404/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />}>
            <Route index element={<ArticleList />} />
          </Route>

          <Route path="/articles">
            <Route path=":slug" element={<Article />} />
          </Route>

          <Route path="/editor" element={<Editor />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/profile/:username/favorites" element={<Profile />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { App };
