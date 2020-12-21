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

  function jumperBtnPlayMusic(paramA, paramB, colorTheme = '') {
    btnPlayMusic.children[0].style.display = paramA
    btnPlayMusic.children[1].style.display = paramB
    btnPlayMusic.style.backgroundColor = colorTheme
  }

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

  // ========================= Timer
  const elemDay = document.getElementById('counterDay')
  const elemHour = document.getElementById('counterHour')
  const elemMinute = document.getElementById('counterMinute')
  const elemSeconds = document.getElementById('counterSeconds')
  const boxCardTime = document.getElementById('boxCardTime')
  const boxTextHappy = document.getElementById('boxHappy')

  const now = new Date()
  const newYear = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0)

  let counter = newYear.getTime() - now.getTime()
  let timeout = counter % 1000
  counter = (counter - timeout) / 1000

  function getTime(count) {
    let objTimer = new Object()
    objTimer.seconds = count % 60
    count = (count - objTimer.seconds) / 60
    objTimer.minutes = count % 60
    count = (count - objTimer.minutes) / 60
    objTimer.hours = count % 24
    objTimer.days = (count - objTimer.hours) / 24
    return objTimer
  }

  function showTimer(timer, day, hours, min, sec) {
    day.innerText = timer.days
    if (timer.hours < 10) {
      hours.innerText = `0${timer.hours}`
    } else {
      hours.innerText = timer.hours
    }
    if (timer.minutes < 10) {
      min.innerText = `0${timer.minutes}`
    } else {
      min.innerText = timer.minutes
    }
    if (timer.seconds < 10) {
      sec.innerText = `0${timer.seconds}`
    } else {
      sec.innerText = timer.seconds
    }
  }

  function hideShowContent(elemTimer, elemHappy, cb) {
    elemTimer.style.display = 'none'
    elemHappy.style.display = 'block'
    console.log(
      '%c%s',
      'color: green; font: 30px monospace;',
      'Happy New Year!'
    )
    setTimeout(() => {
      console.clear()
      cb()
      elemTimer.style.display = 'block'
      elemHappy.style.display = 'none'
    }, 60000)
  }

  function timerRun() {
    setTimeout(() => {
      showTimer(getTime(counter), elemDay, elemHour, elemMinute, elemSeconds)
      let intervalAnchor = setInterval(() => {
        counter--
        if (counter > 0) {
          showTimer(
            getTime(counter),
            elemDay,
            elemHour,
            elemMinute,
            elemSeconds
          )
        } else {
          clearInterval(intervalAnchor)
          hideShowContent(boxCardTime, boxTextHappy, timerRun)
        }
      }, 1000)
    }, timeout)
  }
  timerRun()
  // ==============================
})
