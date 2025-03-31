const startButton = document.createElement('button')
const newRandomNumber = () => Math.random() * 20 + 5
let count = newRandomNumber() // Random start value between 5 and 10
const decrement = 0.1 // Decrease by 0.1 each time
const countdownDiv = document.getElementById('countdown')
let countdownInterval // Store interval reference
let resetInterval // Store reset interval reference

// Create an audio element for the alarm
const alarm = new Audio('./media/buzzy-siren.mp3') // Ensure he path is correct
alarm.loop = true // Make sure it loops while in warning state
alarm.preload = 'auto' // Preload the audio

let alarmPlaying = false // Track if the alarm is playing

const beachBG = () => {
  document.body.style.backgroundImage = "url('./media/beach.jpg')" // Replace with your image path
}

const lavaBG = () => {
  document.body.style.backgroundImage = "url('./media/lava.jpg')" // Replace with your image path
}

const removeBG = () => {
  document.body.style.backgroundImage = 'none'
}

function startCountdown() {
  countdownInterval = setInterval(() => {
    count -= decrement

    if (count <= 0) {
      clearInterval(countdownInterval)

      // Stop alarm when timer hits zero
      stopAlarm()

      let resetCountTime = 10 // Reset time in seconds
      countdownDiv.innerText = `THE FLOOR IS LAVA`
      lavaBG()

      resetInterval = setInterval(() => {
        resetCountTime -= 1
        if (resetCountTime <= 0) {
          clearInterval(resetInterval)
          resetCountdown()
        } else {
          if (resetCountTime <= 5) {
            stopAlarm() // Stop the alarm when reset
            beachBG()
            countdownDiv.innerText = `RESETTING IN ${resetCountTime}`
          }
        }
      }, 1000) // Update every second

      return
    }

    countdownDiv.innerText = count.toFixed(1)

    if (count <= 5.0) {
      countdownDiv.classList.add('warning')

      // Start playing the alarm exactly at 5 seconds
      if (!alarmPlaying) {
        playAlarm()
        removeBG()
      }
    } else if (count < 15.9) {
      countdownDiv.classList.add('caution')
    }
  }, 100) // Update every 100ms
}

function resetCountdown() {
  count = newRandomNumber() // Reset count
  countdownDiv.classList.remove('caution', 'warning')
  startCountdown()
}

// Function to play the alarm
function playAlarm() {
  alarm
    .play()
    .then(() => {
      alarmPlaying = true
    })
    .catch((error) => console.log('Audio play failed:', error))
}

// Function to stop the alarm
function stopAlarm() {
  if (alarmPlaying) {
    alarm.pause()
    alarm.currentTime = 0
    alarmPlaying = false
  }
}

startButton.textContent = 'Start the Game'
startButton.classList.add('start-button')

startButton.addEventListener('click', startCountdown)
countdownDiv.appendChild(startButton)
beachBG()

document.body.style.backgroundSize = 'cover' // Ensures the image covers the entire background
document.body.style.backgroundRepeat = 'no-repeat' // Prevents the image from repeating
document.body.style.backgroundPosition = 'center' // Centers the image
