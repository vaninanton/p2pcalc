import * as THREE from 'three'

let camera, scene, renderer, geometry, material, mesh, delta
let clock = new THREE.Clock()
let smokeParticles = []
let cubeSineDriver = 0

function init(classList) {
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
  camera.position.z = 1000
  scene.add(camera)

  geometry = new THREE.BoxGeometry(200, 200, 200)
  material = new THREE.MeshLambertMaterial({ color: 0xaa6666, wireframe: false })
  mesh = new THREE.Mesh(geometry, material)
  // scene.add(mesh);

  let light = new THREE.DirectionalLight(0xffffff, 0.5)
  light.position.set(-1, 0, 1)
  scene.add(light)

  let smokeTexture = new THREE.TextureLoader().load(
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png',
  )
  let smokeMaterial = new THREE.MeshLambertMaterial({
    color: 0x666666,
    map: smokeTexture,
    transparent: true,
  })
  let smokeGeo = new THREE.PlaneGeometry(300, 300)

  for (let p = 0; p < 150; p++) {
    let particle = new THREE.Mesh(smokeGeo, smokeMaterial)
    particle.position.set(
      Math.random() * 500 - 250,
      Math.random() * 500 - 250,
      Math.random() * 1000 - 100,
    )
    particle.rotation.z = Math.random() * 360
    scene.add(particle)
    smokeParticles.push(particle)
  }

  renderer.domElement.classList = classList
  document.body.appendChild(renderer.domElement)
}

function animate() {
  // note: three.js includes requestAnimationFrame shim
  delta = clock.getDelta()
  requestAnimationFrame(animate)
  evolveSmoke()
  render()
}

function evolveSmoke() {
  var sp = smokeParticles.length
  while (sp--) {
    smokeParticles[sp].rotation.z += delta * 0.2
  }
}

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
}

function render() {
  mesh.rotation.x += 0.005
  mesh.rotation.y += 0.01
  cubeSineDriver += 0.01
  mesh.position.z = 100 + Math.sin(cubeSineDriver) * 500
  renderer.render(scene, camera)
}

export { init, animate, resize }
