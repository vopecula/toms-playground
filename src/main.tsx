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
import BudgetDiff from './components/BudgetDiff';
import Voronoi from './three/Voronoi.three';
import Skybox from './three/Skybox.three';
import Depth from './three/Depth.three';
import RayMarching from './three/RayMarching.three';
import DynamicTextureTopic from './topics/DynamicTexture';
import SolarSystemTopic from './topics/SolarSytem.topic';

const HOC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Cg /> },
        { path: "budget", element: <BudgetDiff/> },
        { path: "cg/preview/solar-system", element: <SolarSystemTopic /> },
        { path: "cg/preview/planet", element: <ThreeRenderer setup={Planet} /> },
        { path: "cg/preview/fake-volumetric-spotlight", element: <ThreeRenderer setup={VolumetricSpotlight} /> },
        { path: "cg/preview/post-processing", element: <ThreeRenderer setup={PostProcessing} /> },
        { path: "cg/preview/voronoi", element: <ThreeRenderer setup={Voronoi} /> },
        { path: "cg/preview/skybox", element: <ThreeRenderer setup={Skybox} /> },
        { path: "cg/preview/depth", element: <ThreeRenderer setup={Depth} /> },
        { path: "cg/preview/ray-marching", element: <ThreeRenderer setup={RayMarching} /> },
        { path: "topics/dynamic-textures", element: <DynamicTextureTopic /> },
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
