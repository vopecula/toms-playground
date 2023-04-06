import React from 'react'
import ReactDOM from 'react-dom/client'
import "./main.css";
import App from './App'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cg from './components/Cg';
import ThreeRenderer from './components/ThreeRenderer';
import SolarSystem from "./three/SolarSystem.three";
import Planet from './three/Planet.three';
import VolumetricSpotlight from './three/VolumetricSpotlight.three';
import PostProcessing from './three/PostProcessing.three';

const HOC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Cg /> },
        { path: "cg/preview/solar-system", element: <ThreeRenderer setup={SolarSystem} /> },
        { path: "cg/preview/planet", element: <ThreeRenderer setup={Planet} /> },
        { path: "cg/preview/fake-volumetric-spotlight", element: <ThreeRenderer setup={VolumetricSpotlight} /> },
        { path: "cg/preview/post-processing", element: <ThreeRenderer setup={PostProcessing} /> },
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
