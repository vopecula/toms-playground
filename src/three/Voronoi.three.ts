// @ts-nocheck
import * as THREE from 'three';
import { plainText as fragmentShader } from './shaders/voronoi.frag.glsl'
import { plainText as vertexShader } from './shaders/voronoi.vert.glsl'

export default function Voronoi(el) {

  let isPlaying = true

// Setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x343434);
  const camera = new THREE.OrthographicCamera(el.offsetWidth / - 2, el.offsetWidth / 2, el.offsetHeight / 2, el.offsetHeight / - 2, 1, 10000);
  camera.position.set(0,0,50)

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(el.offsetWidth, el.offsetHeight);
  renderer.setPixelRatio(window.devicePixelRatio)
  el.appendChild(renderer.domElement);

  const clock = new THREE.Clock()

  const uniforms = {
    u_time: new THREE.Uniform(0),
    u_resolution: new THREE.Uniform(new THREE.Vector2(el.offsetWidth, el.offsetHeight)),
    u_mouse: new THREE.Uniform(new THREE.Vector2(0, 0)),
  }

  // Plane
  const planeGeometry = new THREE.BoxGeometry(2, 2) // 2x2 Clipping area coordinates centered at origin
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
    uniforms.u_mouse.value.y = el.offsetHeight - e.clientY
  }

  // Render
  let delta = 0
  function animate() {
    delta += clock.getDelta()
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    uniforms.u_time.value = delta
  }
   return {
    animate,
    pause: () => { isPlaying = false },
    play: () => { isPlaying = true; animate() },
    onCanvasResize: () => {
      camera.aspect = el.offsetWidth / el.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.offsetWidth, el.offsetHeight);
    }
}
}