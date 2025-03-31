const newRandomNumber = () => Math.random() * 20 + 5
let count = newRandomNumber() // Random start value between 15 and 65
const decrement = 0.1 // Decrease by 0.1 each time
const countdownDiv = document.getElementById('countdown')
const btn = document.getElementById('refresh')
let countdownInterval // Store interval reference
let resetInterval // Store reset interval reference

function startCountdown() {
  countdownInterval = setInterval(() => {
    count -= decrement

    if (count <= 0) {
      clearInterval(countdownInterval)

      let resetCountTime = 10 // Reset time in seconds
      countdownDiv.innerText = `THE FLOOR IS LAVA`

      resetInterval = setInterval(() => {
        resetCountTime -= 1
        if (resetCountTime <= 0) {
          clearInterval(resetInterval)
          resetCountdown()
        } else {
          if (resetCountTime <= 5)
            countdownDiv.innerText = `RESETTING IN ${resetCountTime}`
        }
      }, 1000) // Update every second

      return
    }

    countdownDiv.innerText = count.toFixed(1)

    if (count < 5.9) {
      countdownDiv.classList.add('warning')
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

startCountdown() // Start countdown
