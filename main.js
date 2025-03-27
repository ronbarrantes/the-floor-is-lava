let count = Math.random() * 50 + 15; // Random start value between 15 and 65
const decrement = 0.1; // Decrease by 0.1 each time
const countdownDiv = document.getElementById("countdown");
const btn = document.getElementById("refresh");

function updateCountdown() {
  count -= decrement;

  if (count <= 0) {
    countdownDiv.innerText = "THE FLOOR IS LAVA";
    // btn.style.display = "block";
    setTimeout(resetCountdown, 2000); // Small delay before restarting
    return;
  }

  countdownDiv.innerText = count.toFixed(1);

  if (count < 11) {
    countdownDiv.classList.add("tenSecs");
  } else if (count < 31) {
    countdownDiv.classList.add("thritySecs");
  }

  requestAnimationFrame(updateCountdown);
}

function resetCountdown() {
  count = Math.random() * 50 + 15; // Reset count
  countdownDiv.classList.remove("thritySecs", "tenSecs");
  updateCountdown();
}

updateCountdown(); // Start countdown
