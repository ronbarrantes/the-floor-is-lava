let count = Math.random() * 50 + 15; // Start at 100

const interval = 50; // Update every 50ms
const decrement = 0.1; // Decrease by 0.1 each time
const countdownDiv = document.getElementById("countdown");
const btn = document.querySelector("refresh");

function updateCountdown() {
  count = Math.max(0, count - decrement); // Ensure it doesn't go below 0
  countdownDiv.innerText = count.toFixed(1); // Update div with one decimal place

  if (count < 30) {
    countdownDiv.classList.add("thritySecs");
  }

  if (count < 10) {
    countdownDiv.classList.add("tenSecs");
  }

  if (count > 0) {
    setTimeout(updateCountdown, interval); // Continue countdown
  } else {
    countdownDiv.innerText = "THE FLOOR IS LAVA";
    // btn.style.display = "block";
  }
}

updateCountdown(); // Start countdown
