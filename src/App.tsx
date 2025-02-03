import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { Home } from "./features/Home/Home";

import { Article } from "./features/Article/Article";
import { Profile } from "./features/Profile/Profile";

import { Editor } from "./features/Editor/Editor";
import { Login } from "./features/Login/Login";
import { Logout } from "./features/Logout/Logout";
import { Settings } from "./features/Settings/Settings";
import { HomeLayout } from "layouts/HomeLayout";
import { GlobalFeedArticleList } from "features/GlobalFeed/GlobalFeedArticleList";
import { NotFound } from "features/404/NotFound";
import { NotImplemented } from "features/NotImplemented/NotImplemented";
import { UserFeedArticleList } from "features/UserFeed/UserFeedArticleList";
import type { ReactNode } from "react";
import { useAuth } from "features/Auth/Auth";
import { ArticleListByAuthor } from "features/Profile/ArticleListByAuthor";
import { ArticleListByFavourited } from "features/Profile/ArticleListByFavourited";

type ProtectedRouteProps = { children: ReactNode };

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />}>
            <Route index element={<GlobalFeedArticleList />} />

            <Route path="feed">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <UserFeedArticleList />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>

          <Route path="/articles">
            <Route path=":slug" element={<Article />} />
          </Route>

          <Route path="/editor" element={<Editor />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/register" element={<NotImplemented />} />

          <Route path="/profile/:username" element={<Profile />}>
            <Route index element={<ArticleListByAuthor />} />
            <Route path="favourited" element={<ArticleListByFavourited />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { App };
