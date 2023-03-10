import { CSSProperties, useEffect, useRef, useState } from "react";
import "./App.scss";
import { TaskCard } from "@fremtind/jkl-card-react";
import { TextArea } from "@fremtind/jkl-text-input-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Input from "./components/Input";
import { AltVisual } from "./components/AltVisual";
import Visual from "./components/Visual";

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};

function App() {
const router = createBrowserRouter([
  {
    path:'/',
    element: <Input/>
  },
  {
    path:'visual',
    element: <Visual/>
  },
  {
    path:'alt',
    element: <AltVisual/>
  }

])

  return (
  <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
