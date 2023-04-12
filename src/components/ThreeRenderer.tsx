import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";

export type ThreeJsCode = { setup: (el: HTMLDivElement) => void }

const ThreeRenderer: React.FC<ThreeJsCode> = (props) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mountRef.current) {
      props.setup(mountRef.current)
    }

    return () => {
      mountRef.current && mountRef.current.firstChild && mountRef.current.removeChild(mountRef.current.firstChild)
    }
  }, []);

  return (
    <Box
      ref={mountRef}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
      }}
    />
  );
}

export default ThreeRenderer;