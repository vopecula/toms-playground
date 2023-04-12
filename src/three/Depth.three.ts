// @ts-nocheck
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function Depth(el) {

  // Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 20);
  camera.position.z = 3
  camera.position.y = .05

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
  const geometry = new THREE.PlaneGeometry(10,10)
  const material = new THREE.ShaderMaterial({
    fragmentShader: `
void main(){
  gl_FragColor = vec4(vec3(gl_FragCoord.z), 1.0);
}
    `
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.rotateX(Math.PI / -2)
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