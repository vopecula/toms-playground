// @ts-nocheck
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
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
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  el.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  // Spotlight
  const spotLight = new THREE.SpotLight(0xffffff, 1, 10, Math.PI / 6, .2, 2);
  spotLight.position.set(0, 3, 0);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 512; // default
  spotLight.shadow.mapSize.height = 512; // default
  spotLight.shadow.camera.near = 0.5; // default
  spotLight.shadow.camera.far = 10; // default
  spotLight.shadow.focus = 1; // default
  scene.add(spotLight);

  // Ambient Light
  scene.add(new THREE.AmbientLight('#222222'))

  // Cone base
  const coneHeight = 5
  const coneGeometry = new THREE.CylinderGeometry(0.1, 0.15 * 17, coneHeight, 128, 64, true)
  coneGeometry.translate(0, -coneHeight / 2, 0);
  const coneMaterial = new THREE.ShaderMaterial({
    vertexShader: VolumetricLightVertexShader,
    fragmentShader: VolumetricLightFragmentShader,
    uniforms: {
      depth: { value: null },
      opacity: { value: 1 },
      attenuation: { value: 2.8 },
      anglePower: { value: 8 },
      spotPosition: { value: new THREE.Vector3(0, 2, 0) },
      lightColor: { value: new THREE.Color('white') },
      cameraNear: { value: 0 },
      cameraFar: { value: 1 },
      resolution: { value: new THREE.Vector2(0, 0) },
    },
  })
  coneMaterial.transparent = true
  coneMaterial.depthWrite = false
  const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial)
  coneMesh.position.y = coneHeight
  coneMesh.position.x = -3
  //scene.add(coneMesh)
  
  // Cone 2 - Edge blending with normals
  const coneMesh2 = new THREE.Mesh(coneGeometry, coneMaterial)
  coneMesh2.position.y = 2
  coneMesh2.position.x = 0
  scene.add(coneMesh2)
  
  // Cone 3 - Depth blending
  const coneMesh3 = new THREE.Mesh(coneGeometry, coneMaterial)
  coneMesh3.position.y = coneHeight
  coneMesh3.position.x = 3
  //scene.add(coneMesh3)

  const helper = new VertexNormalsHelper( coneMesh, 1, 0xff0000 );             
  //scene.add(helper)

  // Sphere
  const planetGeometry = new THREE.SphereGeometry(1,32,32)
  const planetMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .6 })
  const planetMesh = new THREE.Mesh(planetGeometry, coneMaterial)
  planetMesh.position.y = 1
  planetMesh.position.x = 0
  planetMesh.castShadow = true
  planetMesh.receiveShadow = false
  //scene.add(planetMesh)

  const geometry = new THREE.PlaneGeometry(10, 10, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
  const plane = new THREE.Mesh(geometry, material);
  plane.receiveShadow = true
  plane.rotation.x = Math.PI / 2
  //scene.add(plane);

  // Helpers
  //const sportLightHelper = new THREE.CameraHelper(spotLight.shadow.camera);
  //scene.add(sportLightHelper);

  const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

  // Render
  function animate() {
    requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera);
  }
  animate();
}