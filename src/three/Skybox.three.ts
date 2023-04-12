// @ts-nocheck
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';

export default function Skybox(el) {

  // Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.z = 5
  camera.position.y = 1
  camera.position.x = -3

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.toneMapping = THREE.ReinhardToneMapping
  renderer.toneMappingExposure = 2
  el.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(0, 3, 0)

  const clock = new THREE.Clock()

  const uniforms = {
    u_resolution: new THREE.Uniform(new THREE.Vector2(window.innerWidth, window.innerHeight)),
  }

  const texture = new EXRLoader().load('/envmaps/partly_cloudy_puresky_2k.exr')

  // Hemisphere
  const sphereGeometry = new THREE.SphereGeometry(100, 64, 32, 0, Math.PI *2, 0, Math.PI / 2)
  const sphereMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture })
  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
  scene.add(sphereMesh)

  // Ground plane
  const planeGeometry = new THREE.PlaneGeometry(200,200, 1, 1)
  const planeMaterial = new THREE.MeshBasicMaterial({ color: '#efefef', side: THREE.DoubleSide })
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
  planeMesh.rotateX(Math.PI / 2)
  scene.add(planeMesh)

  const axesHelper = new THREE.AxesHelper( 50 );
  scene.add( axesHelper );

  // Render
  function animate() {
    let delta = clock.getDelta()
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update()
  }
  animate();
}