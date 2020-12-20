// Imports
import * as THREE from '/libs/three/build/three.module.js'
import { OrbitControls } from '/libs/three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from '/libs/three/examples/jsm/loaders/GLTFLoader.js'

// DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
  // ======================= 3D Model display
  function buildScene() {
    const canvas = document.getElementById('SectionCountdownCanvas')
    const fov = 30
    const aspect = canvas.clientWidth / canvas.clientHeight
    const renderdist = 1000
    let objGLTF = null

    // scene
    const scene = new THREE.Scene()

    // camera
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, renderdist)
    camera.position.set(100, 150, 270)
    scene.add(camera)
    // helper
    // const helperCamera = new THREE.CameraHelper(camera)
    // scene.add(helperCamera)

    // render
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xffffff, 0)

    // control
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 36, 0)
    controls.enabled = false // no mouse operation
    controls.update()

    //load
    const loader = new GLTFLoader()
    loader.load('model/tree.gltf', function (gltf) {
      objGLTF = gltf
      gltf.scene.scale.set(7, 7, 7)
      scene.add(gltf.scene)
    })

    // Ambient Light
    const ambient = new THREE.AmbientLight(0x707070)
    scene.add(ambient)

    // Directional Light
    const color = 0xffffff
    const intensity = 3.6
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(10, 60, 60)
    light.target.position.set(-10, 0, 0)
    scene.add(light)
    scene.add(light.target)
    // helper
    // const helperLight = new THREE.DirectionalLightHelper(light, 5)
    // scene.add(helperLight)

    // Animation
    function animate() {
      requestAnimationFrame(animate)
      if (objGLTF) {
        objGLTF.scene.rotation.y += 0.03
      }
      renderer.render(scene, camera)
    }
    animate()
  }
  buildScene()
  // =======================================

  // ================== Playing music
  const btnPlayMusic = document.getElementById('btnPlay')
  const backgroundMusic = document.getElementById('bgAudio')

  btnPlayMusic.addEventListener('click', function () {
    if (backgroundMusic.paused) {
      backgroundMusic.play()
      jumperBtnPlayMusic('none', 'flex', '#f25252')
    } else {
      backgroundMusic.pause()
      jumperBtnPlayMusic('flex', 'none')
    }
  })
  // ===============================

  // ================== Function assistant
  function jumperBtnPlayMusic(paramA, paramB, colorTheme = '') {
    btnPlayMusic.children[0].style.display = paramA
    btnPlayMusic.children[1].style.display = paramB
    btnPlayMusic.style.backgroundColor = colorTheme
  }
  // =====================================
})
