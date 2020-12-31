const play = document.querySelector('.player-button')
const videoViewer = document.querySelector('.video-player')
const forward = document.querySelector('.player-button.fwd')
const backward = document.querySelector('.player-button.bkw')
const playbackspeed = document.querySelector('input[name="playback-rate"]')
const volume = document.querySelector('input[name="volume"]')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress-container')
const defaultSpeed = document.querySelector('.player-button.default')
const currentSpeed = document.querySelector('.player p')

play.addEventListener('click', togglePlay)

videoViewer.addEventListener('timeupdate', () => {
  if (videoViewer.currentTime === videoViewer.duration) {
    videoViewer.pause()
    play.innerHTML = '<i class="fas fa-play"></i>'
    videoViewer.currentTime = 0
  }
  progress.style.width = `${
    (videoViewer.currentTime / videoViewer.duration) * 100
  }%`
})

videoViewer.addEventListener('click', togglePlay)

forward.addEventListener('click', () => {
  videoViewer.currentTime += +forward.dataset.skip
})

backward.addEventListener('click', () => {
  videoViewer.currentTime += +backward.dataset.skip
})

playbackspeed.addEventListener('change', setPlaybackSpeed)

playbackspeed.addEventListener('mousemove', setPlaybackSpeed)

defaultSpeed.addEventListener('click', () => {
  videoViewer.playbackRate = 1
  playbackspeed.value = 1
  currentSpeed.innerHTML = playbackspeed.value + 'x'
})

volume.addEventListener('change', volumeChange)

volume.addEventListener('mousemove', volumeChange)

function togglePlay() {
  if (videoViewer.paused) {
    videoViewer.play()
    play.innerHTML = '<i class="fas fa-pause"></i>'
  } else {
    videoViewer.pause()
    play.innerHTML = '<i class="fas fa-play"></i>'
  }
}

function setPlaybackSpeed() {
  videoViewer.playbackRate = playbackspeed.value
  currentSpeed.innerHTML = playbackspeed.value + 'x'
}

function volumeChange() {
  videoViewer.volume = volume.value
}

progressBar.addEventListener('click', (e) => {
  const width = progressBar.offsetWidth
  videoViewer.currentTime = (videoViewer.duration / width) * e.layerX
})

