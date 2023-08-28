import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import CreatUpload from "./pages/CreateUpload";

const App = () => {
  return (
    <>
      <Toaster />
      <CreatUpload />
    </>
  );
};

export default App;
