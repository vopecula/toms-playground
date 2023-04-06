import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { plainText as VolumetricLightFragmentShader } from './shaders/volumetricLight.frag'
import { plainText as VolumetricLightVertexShader } from './shaders/volumetricLight.vert'

export default function VolumetricSportlight(el) {

  // Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.x = 10
  camera.position.y = 10

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  el.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true

  // Sportlight
  const spotLight = new THREE.SpotLight(0xffffff, 1, 10, Math.PI / 6);
  spotLight.position.set(0, 3, 0);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 512; // default
  spotLight.shadow.mapSize.height = 512; // default
  spotLight.shadow.camera.near = 0.5; // default
  spotLight.shadow.camera.far = 10; // default
  spotLight.shadow.focus = 1; // default
  scene.add(spotLight);

 
  const coneHeight = 3
  const uniforms = {
    u_cone_tip_vec3: new THREE.Uniform(new THREE.Vector3(0, coneHeight, 0)),
  }

  // Cone
  const coneGeometry = new THREE.ConeGeometry(2, coneHeight, 32, 5, true)
  coneGeometry.translate( 0, -coneHeight/2, 0 );
  const coneMaterial = new THREE.ShaderMaterial({
    vertexShader: VolumetricLightVertexShader,
    fragmentShader: VolumetricLightFragmentShader,
    uniforms
  })
  coneMaterial.transparent = true
  coneMaterial.blending = THREE.AdditiveBlending
  const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial)
  coneMesh.position.y = coneHeight
  scene.add(coneMesh)

  // Planet
  const planetGeometry = new THREE.SphereGeometry(.5)
  const planetMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .6 })
  const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial)
  planetMesh.position.y = 0
  planetMesh.position.x = .3
  planetMesh.castShadow = true
  planetMesh.receiveShadow = false
  scene.add(planetMesh)

  const geometry = new THREE.PlaneGeometry(10, 10, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
  const plane = new THREE.Mesh(geometry, material);
  plane.receiveShadow = true
  plane.rotation.x = Math.PI / 2
  scene.add(plane);

  // Helpers
  //const sportLightHelper = new THREE.CameraHelper(spotLight.shadow.camera);
  //scene.add(sportLightHelper);

  // Render
  function animate() {
    requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera);
  }
  animate();
}