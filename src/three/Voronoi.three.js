import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { plainText as fragmentShader } from './shaders/voronoi.frag'
import { plainText as vertexShader } from './shaders/voronoi.vert'

export default function Voronoi(el) {

  // Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.z = 1.6

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio)
  el.appendChild(renderer.domElement);

  //const controls = new OrbitControls(camera, renderer.domElement);

  const clock = new THREE.Clock()

  const uniforms = {
    u_resolution: new THREE.Uniform(new THREE.Vector2(window.innerWidth, window.innerHeight)),
    u_mouse: new THREE.Uniform(new THREE.Vector2(0,0)),
  }

  // Plane
  const planeGeometry = new THREE.PlaneGeometry(1,1)
  const planeMaterial = new THREE.ShaderMaterial({
    fragmentShader,
    uniforms
  })
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
  scene.add(planeMesh)

window.onmousemove = function(e){
    uniforms.u_mouse.value.x = e.clientX
    uniforms.u_mouse.value.y = window.innerHeight - e.clientY
}

  // Render
  function animate() {
    let delta = clock.getDelta()
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}