// @ts-nocheck
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { plainText as PlanetFragmentShader } from './shaders/planet.frag'
import { plainText as PlanetVertexShader } from './shaders/planet.vert'

export default function Planet(el) {

  // Utils
  function makeStars(distance, quantity, color) {
    const vertices = []
    const starDistance = distance
    for (let i = 0; i < quantity; i++) {
      const theta = Math.PI * 2 * Math.random()
      const phi = Math.PI * Math.random()
      const radius = starDistance
      const v = new THREE.Vector3().setFromSphericalCoords(radius, phi, theta)
      vertices.push(v.x, v.y, v.z)
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    const starMat = new THREE.PointsMaterial({ color: color })
    const stars = new THREE.Points(starGeo, starMat)
    return stars
  }

  // Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.x = 3

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio)
  el.appendChild(renderer.domElement);

  const clock = new THREE.Clock()

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true
  controls.autoRotateSpeed = .4

  // Light
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(0, 5, 0);
  pointLight.castShadow = true;
  scene.add(pointLight);

  const uniforms = {
    u_light_pos: new THREE.Uniform(pointLight.position),
    u_albedo_map: new THREE.Uniform(new THREE.TextureLoader().load('/textures/2k_earth_daymap.jpeg')),
    u_specular_map: new THREE.Uniform(new THREE.TextureLoader().load('/textures/2k_earth_specular_map.png')),
    u_clouds_map: new THREE.Uniform(new THREE.TextureLoader().load('/textures/2k_earth_clouds.jpeg')),
    u_night_map: new THREE.Uniform(new THREE.TextureLoader().load('/textures/2k_earth_nightmap.jpeg')),
  }

  // Planet
  const planetGeometry = new THREE.SphereGeometry(1, 128, 128)
  const planetMaterial = new THREE.ShaderMaterial({
    vertexShader: PlanetVertexShader,
    fragmentShader: PlanetFragmentShader,
    uniforms
  })
  const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial)
  scene.add(planetMesh)

  // Stars
  const blueStars = makeStars(300, 150, '#4444bb')
  const redStars = makeStars(345, 150, '#aa4444')
  const whiteStars = makeStars(250, 300, '#777')
  scene.add(blueStars)
  scene.add(redStars)
  scene.add(whiteStars)

  // Helpers
  const pointLightHelper = new THREE.PointLightHelper(pointLight, .3);
  scene.add(pointLightHelper);

  // Render
  let i = Math.PI * 2
  function animate() {
    let delta = clock.getDelta()
    requestAnimationFrame(animate);
    pointLight.position.set(Math.sin(i) * 10, 1, Math.cos(i) * 10)
    uniforms.u_light_pos = new THREE.Uniform(new THREE.Vector3(Math.sin(i) * 10, 1, Math.cos(i) * 10))
    controls.update()
    renderer.render(scene, camera);
    i -= .005
  }
  animate();
}