import { useEffect, useRef, FC } from "react";
import * as THREE from "three";

const Planet:FC<{width: number, height: number}>  = (props) => {

  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mountRef.current) {
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(75, props.width / props.height, 0.1, 1000);
      var renderer = new THREE.WebGLRenderer();

      renderer.setSize(props.width, props.height);
      mountRef.current.appendChild(renderer.domElement);

      var geometry = new THREE.BoxGeometry(1, 1, 1);
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      var cube = new THREE.Mesh(geometry, material);

      scene.add(cube);
      camera.position.z = 5;

      var animate = function () {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }

      let onWindowResize = function () {
        camera.aspect = props.width / props.height;
        camera.updateProjectionMatrix();
        renderer.setSize(props.width, props.height);
      }

      window.addEventListener("resize", onWindowResize, false);

      animate();

    }
    return () => {
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
    }
  }, [props.width, props.height]);

  return (
    <div ref={mountRef}>

    </div>
  );
}

export default Planet;