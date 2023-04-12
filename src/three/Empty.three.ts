// @ts-nocheck
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function Empty(el) {

  // Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.z = 3

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio)
  el.appendChild(renderer.domElement);

  const clock = new THREE.Clock()

  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.target = new THREE.Vector3(0, 3, 0)

  const uniforms = {
    u_empty: new THREE.Uniform(new THREE.Vector2()),
  }

  // Mesh
  const geometry = new THREE.SphereGeometry(1)
  const material = new THREE.MeshBasicMaterial()
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // Helpers
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // Render
  function animate() {
    let delta = clock.getDelta()
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}