import React from 'react'
import ReactDOM from 'react-dom/client'
import "./main.css";
import App from './App'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cg from './components/Cg';
import ThreeRenderer from './components/ThreeRenderer';
import SolarSystem from "./three/SolarSystem.three";
import Planet from './three/Planet.three';

const HOC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, path: "cg", element: <Cg /> },
        { path: "cg/preview/solar-system", element: <ThreeRenderer setup={SolarSystem} /> },
        { path: "cg/preview/planet", element: <ThreeRenderer setup={Planet} /> },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HOC />
  </React.StrictMode>,
)
