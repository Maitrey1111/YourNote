import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./Pages/SignIn/SignIn.js";
import Main from "./Pages/Main/Main.js";
import SignUp from "./Pages/SignUp/SignUp.js";

function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/main-page" element={<Main />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
