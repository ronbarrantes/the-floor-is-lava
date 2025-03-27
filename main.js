let count = Math.random() * 20 + 5; // Random start value between 15 and 65
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
      setTimeout(resetCountdown, 2000); // Restart after 2s
      return;
    }

    countdownDiv.innerText = count.toFixed(1);

    if (count < 11) {
      countdownDiv.classList.add("tenSecs");
    } else if (count < 31) {
      countdownDiv.classList.add("thritySecs");
    }
  }, 100); // Update every 100ms
}

function resetCountdown() {
  count = Math.random() * 50 + 15; // Reset count
  countdownDiv.classList.remove("thritySecs", "tenSecs");
  startCountdown();
}

startCountdown(); // Start countdown
