// @ts-nocheck
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { plainText as fragmentShader } from './shaders/voronoi.frag.glsl'
import { plainText as vertexShader } from './shaders/voronoi.vert.glsl'

export default function Voronoi(el) {

  // Setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x343434);
  const camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000);
  camera.position.set(0,0,50)

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio)
  el.appendChild(renderer.domElement);

  const clock = new THREE.Clock()

  const uniforms = {
    u_time: new THREE.Uniform(0),
    u_resolution: new THREE.Uniform(new THREE.Vector2(window.innerWidth, window.innerHeight)),
    u_mouse: new THREE.Uniform(new THREE.Vector2(0, 0)),
  }

  // Plane
  const planeGeometry = new THREE.BoxGeometry(2, 2)
  //const planeMaterial = new THREE.MeshBasicMaterial({color: '#ffffff', side: THREE.DoubleSide})
  const planeMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms
  })
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
  scene.add(planeMesh)

  window.onmousemove = function (e) {
    uniforms.u_mouse.value.x = e.clientX
    uniforms.u_mouse.value.y = window.innerHeight - e.clientY
  }

  // Render
  let delta = 0
  function animate() {
    delta += clock.getDelta()
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    uniforms.u_time.value = delta
  }
  animate();
}