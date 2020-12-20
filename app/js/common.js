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
