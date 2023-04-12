// @ts-nocheck
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import metrics from './data/metrics.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const normalizePlanetSize = (value) => {
  const smallest = 2440, biggest = 69911 - 2440;
  return (value - smallest) / biggest
}

export default function SolarSystem(el) {

  // Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ReinhardToneMapping
  renderer.toneMappingExposure = 1
  el.appendChild(renderer.domElement);

  // Post processing settings
  const composer = new EffectComposer(renderer);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true
  const earth_normal_texture = new THREE.TextureLoader().load('/textures/2k_earth_normal_map.png');
  const earth_specular_texture = new THREE.TextureLoader().load('/textures/2k_earth_specular_map.png');

  // Add stars environment map
  const starsGeometry = new THREE.BufferGeometry()
  const starsGeometry2 = new THREE.BufferGeometry()
  const vertices = []
  const vertices2 = []
  for (let i = 0; i < 2000; i++) {
    const phi = Math.random() * (Math.PI);
    const theta = Math.random() * (Math.PI * 2);
    const spread = (Math.random() - 0.5) * 50

    const s = new THREE.Spherical(500 + spread, phi, theta)
    const vec3 = new THREE.Vector3().setFromSpherical(s)

    const x = vec3.x
    const y = vec3.y
    const z = vec3.z

    vertices.push(x, y, z);
    vertices2.push(y, z, x);
  }

  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  starsGeometry2.setAttribute('position', new THREE.Float32BufferAttribute(vertices2, 3))
  const starMaterial = new THREE.PointsMaterial({ color: '#efefef' })
  const starMaterial2 = new THREE.PointsMaterial({ color: '#666666' })
  const starsMesh = new THREE.Points(starsGeometry, starMaterial)
  const starsMesh2 = new THREE.Points(starsGeometry2, starMaterial2)
  scene.add(starsMesh)
  scene.add(starsMesh2)

  // Add sun
  const geometry = new THREE.SphereGeometry(5, 32, 32)
  const material = new THREE.MeshBasicMaterial({ color: '#ffffff' });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Add light
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(0, 0, 0);
  light.castShadow = true;
  scene.add(light);

  light.shadow.mapSize.width = 512; // default
  light.shadow.mapSize.height = 512; // default
  light.shadow.camera.near = 0.5; // default
  light.shadow.camera.far = 500; // default

  const calc = {}

  // Add Planets
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x222222 });
  var segmentCount = 128;
  let unitCirclePoints = [];
  for (var i = 0; i <= segmentCount; i++) {
    var theta = (i / segmentCount) * Math.PI * 2;
    unitCirclePoints.push(new THREE.Vector3(Math.cos(theta), 0, Math.sin(theta)));
  }

  Object.keys(metrics).forEach((planetKey, i) => {
    const planetRadius = .25 + (normalizePlanetSize(metrics[planetKey].radius) * 2)
    const planetTexture = new THREE.TextureLoader().load('/textures/' + metrics[planetKey].texture);
    const geometry = new THREE.SphereGeometry(planetRadius, 64, 64)
    const material = new THREE.MeshStandardMaterial({
      map: planetTexture,
      normalMap: planetKey === "Earth" ? earth_normal_texture : null,
      roughnessMap: planetKey === "Earth" ? earth_specular_texture : null
    });
    const planet = new THREE.Group();
    const planetMesh = new THREE.Mesh(geometry, material);
    planetMesh.castShadow = true; //default is false
    planetMesh.receiveShadow = true; //default
    planet.add(planetMesh)

    if (planetKey === "Saturn") {
      const ringText = new THREE.TextureLoader().load('/textures/2k_saturn_ring_alpha.png');
      const ringGeo = new THREE.RingGeometry(planetRadius * 1.3, planetRadius * 1.8, 128, 1);
      const pos = ringGeo.attributes.position;
      var v3 = new THREE.Vector3();
      for (let i = 0; i < pos.count; i++) {
        v3.fromBufferAttribute(pos, i);
        ringGeo.attributes.uv.setXY(i, v3.length() < ((planetRadius * 1.5)) ? 0 : 1, 1);
      }


      const ringMat = new THREE.MeshBasicMaterial({ map: ringText, transparent: true });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.castShadow = true; //default is false
      ring.receiveShadow = true; //default

      ring.rotation.x = Math.PI / 2
      const ring2 = ring.clone()
      ring2.rotation.x = - (Math.PI / 2)
      planet.add(ring);
      planet.add(ring2);
      planet.rotation.x = -0.4
      planet.rotation.y = 2.4
    }

    scene.add(planet);

    const radius = (i + 1) * 12
    calc[planetKey] = {
      angle: Math.random() * (Math.PI * 2),
      radius: radius,
      ref: planet
    }
    planet.position.x = radius
    planet.rotation.z = 23.5 * ((Math.PI / 2) / 360) // Test: Earth Axis tilt
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(unitCirclePoints.map(x => x.clone().multiplyScalar(radius)));
    const line = new THREE.Line(orbitGeometry, lineMaterial);
    scene.add(line);
  })

  camera.position.z = 5;
  camera.position.y = 250;
  controls.update();

  const clock = new THREE.Clock()

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    .6,
    .1,
    .1
  );
  composer.addPass(bloomPass);

  // Render
  const speedFactor = 1000
  function animate() {
    let delta = clock.getDelta()

    requestAnimationFrame(animate);
    Object.keys(metrics).forEach((planetKey, i) => {
      calc[planetKey].ref.position.x = Math.cos(calc[planetKey].angle) * calc[planetKey].radius
      calc[planetKey].ref.position.z = Math.sin(calc[planetKey].angle) * calc[planetKey].radius
      calc[planetKey].angle += (delta) * (metrics[planetKey].angularVelocityAroundSunInSec) * (speedFactor)
      if (planetKey === "Earth") {
        calc[planetKey].ref.rotation.y += (delta) * (metrics[planetKey].angularVelocityAroundSunInSec * 365) * (speedFactor)
        controls.target = calc[planetKey].ref.position;
        controls.update();
      }
      // Camera loked to Earth
      //const planetOffset = calc[planetKey].ref.position.clone().multiplyScalar(1.4)
      //camera.position.x = planetOffset.x;
      //camera.position.z = planetOffset.z;
      //controls.target = calc[planetKey].ref.position;
      //controls.update();
    })

    composer.render();
  }
  animate();
}