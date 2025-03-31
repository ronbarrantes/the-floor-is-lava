const newRandomNumber = () => Math.random() * 20 + 5;
let count = newRandomNumber(); // Random start value between 15 and 65
const decrement = 0.1; // Decrease by 0.1 each time
const countdownDiv = document.getElementById("countdown");
const btn = document.getElementById("refresh");
let countdownInterval; // Store interval reference

function startCountdown() {
  countdownInterval = setInterval(() => {
    count -= decrement;

    if (count <= 0) {
      clearInterval(countdownInterval);
      countdownDiv.innerText = "THE FLOOR IS LAVA";
      // btn.style.display = "block";
      setTimeout(resetCountdown, 5000); // Restart after 2s
      return;
    }

    countdownDiv.innerText = count.toFixed(1);

    if (count < 5.9) {
      countdownDiv.classList.add("fiveSecs");
    } else if (count < 15.9) {
      countdownDiv.classList.add("fifteenSecs");
    }
  }, 100); // Update every 100ms
}

function resetCountdown() {
  count = newRandomNumber(); // Reset count
  countdownDiv.classList.remove("fifteenSecs", "fiveSecs");
  startCountdown();
}

startCountdown(); // Start countdown
