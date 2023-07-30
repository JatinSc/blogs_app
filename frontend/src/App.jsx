import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./components/layout";
import { UserProvider } from "./context/userContext";
import ViewPost from "./components/viewPost";

const App = () => {
  return (
    <UserProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/view/:id" element={<ViewPost />}></Route>
        </Routes>
      </Layout>
    </UserProvider>

  );
};

export default App;
