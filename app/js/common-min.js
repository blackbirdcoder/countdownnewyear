const btnPlayMusic=document.getElementById("btnPlay"),backgroundMusic=document.getElementById("bgAudio");function jumperBtnPlayMusic(n,u,c=""){btnPlayMusic.children[0].style.display=n,btnPlayMusic.children[1].style.display=u,btnPlayMusic.style.backgroundColor=c}btnPlayMusic.addEventListener("click",(function(){backgroundMusic.paused?(backgroundMusic.play(),jumperBtnPlayMusic("none","flex","#f25252")):(backgroundMusic.pause(),jumperBtnPlayMusic("flex","none"))}));