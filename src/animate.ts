import * as THREE from 'three'
import smokeImg from './assets/Smoke-Element.png'

interface AnimationState {
  camera: THREE.PerspectiveCamera | null
  scene: THREE.Scene | null
  renderer: THREE.WebGLRenderer | null
  smokeParticles: THREE.Mesh[]
  clock: THREE.Clock
  cubeSineDriver: number
}

const state: AnimationState = {
  camera: null,
  scene: null,
  renderer: null,
  smokeParticles: [],
  clock: new THREE.Clock(),
  cubeSineDriver: 0,
}

function createSmokeParticles(): THREE.Mesh[] {
  const particles: THREE.Mesh[] = []
  const smokeTexture = new THREE.TextureLoader().load(smokeImg)
  const smokeMaterial = new THREE.MeshLambertMaterial({
    color: 0x666666,
    map: smokeTexture,
    transparent: true,
  })
  const smokeGeo = new THREE.PlaneGeometry(300, 300)

  for (let p = 0; p < 150; p++) {
    const particle = new THREE.Mesh(smokeGeo, smokeMaterial)
    particle.position.set(
      Math.random() * 500 - 250,
      Math.random() * 500 - 250,
      Math.random() * 1000 - 100,
    )
    particle.rotation.z = Math.random() * 360
    state.scene?.add(particle)
    particles.push(particle)
  }

  return particles
}

export function init(classList: string): void {
  state.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  state.renderer.setSize(window.innerWidth, window.innerHeight)
  state.renderer.setPixelRatio(window.devicePixelRatio)

  state.scene = new THREE.Scene()

  state.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
  state.camera.position.z = 1000
  state.scene.add(state.camera)

  const light = new THREE.DirectionalLight(0xffffff, 0.5)
  light.position.set(-1, 0, 1)
  state.scene.add(light)

  state.smokeParticles = createSmokeParticles()

  state.renderer.domElement.className = classList
  document.body.appendChild(state.renderer.domElement)
}

function evolveSmoke(): void {
  const delta = state.clock.getDelta()
  state.smokeParticles.forEach((particle) => {
    particle.rotation.z += delta * 0.2
  })
}

export function animate(): void {
  requestAnimationFrame(animate)
  evolveSmoke()
  render()
}

function render(): void {
  if (!state.renderer || !state.scene || !state.camera) return

  state.cubeSineDriver += 0.01
  state.renderer.render(state.scene, state.camera)
}

export function resize(): void {
  if (!state.renderer || !state.camera) return

  state.renderer.setSize(window.innerWidth, window.innerHeight)
  state.camera.aspect = window.innerWidth / window.innerHeight
  state.camera.updateProjectionMatrix()
}
