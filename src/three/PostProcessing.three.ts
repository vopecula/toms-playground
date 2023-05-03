// @ts-nocheck
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { AdaptiveToneMappingPass } from 'three/addons/postprocessing/AdaptiveToneMappingPass.js';

export default function PostProcessing(el) {

  let isPlaying = true

// Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, el.offsetWidth / el.offsetHeight, 0.1, 2000);
  camera.position.x = 10
  camera.position.y = 10

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(el.offsetWidth, el.offsetHeight);
  renderer.setPixelRatio(window.devicePixelRatio)
  //renderer.toneMapping = THREE.CineonToneMapping
  //renderer.toneMappingExposure = 1.2
  el.appendChild(renderer.domElement);

  // Post processing settings
  const composer = new EffectComposer(renderer);

  // Orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true

  // Light
  const spotLight = new THREE.SpotLight(0xffffff, 4.2, 20, Math.PI / 10);
  spotLight.position.set(0, 20, 0);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 512; // default
  spotLight.shadow.mapSize.height = 512; // default
  spotLight.shadow.camera.near = 0.5; // default
  spotLight.shadow.camera.far = 10; // default
  spotLight.shadow.focus = 1; // default
  scene.add(spotLight);

  // Meshes
  const planetGeometry = new THREE.SphereGeometry(.5)
  const planetMaterial = new THREE.MeshStandardMaterial({ color: '#ff0000', roughness: 1 })
  const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial)
  planetMesh.position.y = 0
  planetMesh.castShadow = true
  planetMesh.receiveShadow = true
  const p2 = planetMesh.clone()
  const p3 = planetMesh.clone()
  p2.position.x = 2
  p3.position.x = -2
  scene.add(planetMesh)
  scene.add(p2)
  scene.add(p3)

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(el.offsetWidth, el.offsetHeight),
    1.6,
    .1,
    .1
  );
  composer.addPass(bloomPass);

  const adaptive = new AdaptiveToneMappingPass()
  composer.addPass(adaptive);

  // Render
  function animate() {
    requestAnimationFrame(animate);
    controls.update()
    composer.render();
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