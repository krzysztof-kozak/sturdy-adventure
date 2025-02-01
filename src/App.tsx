import { BrowserRouter, Routes, Route } from "react-router";

import { Article } from "./features/Article/Article";
import { Home } from "./Home";
import { Editor } from "./Editor";
import { LoginRegister } from "./LoginRegister";
import { Logout } from "./Logout";
import { Profile } from "./Profile";
import { Settings } from "./Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<Article />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:slug" element={<Editor />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/register" element={<LoginRegister />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/:username/favorites" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
