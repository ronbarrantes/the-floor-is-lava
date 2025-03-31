const startButton = document.createElement("button");
const newRandomNumber = () => Math.random() * 20 + 5;
let count = newRandomNumber(); // Random start value between 5 and 10
const decrement = 0.1; // Decrease by 0.1 each time
const countdownDiv = document.getElementById("countdown");
let countdownInterval; // Store interval reference
let resetInterval; // Store reset interval reference

// Create an audio element for the alarm
const alarm = new Audio("./media/buzzy-siren.mp3"); // Ensure he path is correct
alarm.loop = true; // Make sure it loops while in warning state
alarm.preload = "auto"; // Preload the audio

let alarmPlaying = false; // Track if the alarm is playing

// const preloadImagesWithByteProgress = (imagePaths) => {
//   const progressBar = document.getElementById('progress-bar')
//   const preloader = document.getElementById('preloader')

//   if (!progressBar || !preloader) {
//     console.error('Progress bar or preloader element not found.')
//     return
//   }

//   const totalImages = imagePaths.length
//   let totalBytes = 0
//   let loadedBytes = 0
//   let imagesLoaded = 0
//   let requestsPending = totalImages

//   const updateProgress = () => {
//     const progress = totalBytes > 0 ? (loadedBytes / totalBytes) * 100 : 100
//     progressBar.style.width = `${progress}%`

//     if (imagesLoaded === totalImages) {
//       preloader.style.display = 'none'
//     }
//   }

//   // Get total sizes
//   imagePaths.forEach((imagePath) => {
//     const sizeXhr = new XMLHttpRequest()
//     sizeXhr.open('HEAD', imagePath, true)

//     sizeXhr.onload = () => {
//       if (sizeXhr.status === 200) {
//         const contentLength = sizeXhr.getResponseHeader('Content-Length')
//         if (contentLength) {
//           totalBytes += parseInt(contentLength, 10)
//         }
//       }
//       requestsPending--
//       if (requestsPending === 0) {
//         downloadImages()
//       }
//     }

//     sizeXhr.onerror = () => {
//       console.warn(`Could not get size for: ${imagePath}`)
//       requestsPending--
//       if (requestsPending === 0) {
//         downloadImages()
//       }
//     }

//     sizeXhr.send()
//   })

//   const downloadImages = () => {
//     if (totalBytes === 0) {
//       console.warn(
//         'Total size unknown. Proceeding with a count-based approach.',
//       )
//     }

//     imagePaths.forEach((imagePath) => {
//       const xhr = new XMLHttpRequest()
//       xhr.open('GET', imagePath, true)
//       xhr.responseType = 'blob'

//       xhr.onprogress = (event) => {
//         if (event.lengthComputable) {
//           loadedBytes += event.loaded
//           updateProgress()
//         }
//       }

//       xhr.onload = () => {
//         if (xhr.status === 200) {
//           const img = new Image()
//           const url = URL.createObjectURL(xhr.response)
//           img.src = url

//           // Clean up memory after a short delay
//           setTimeout(() => URL.revokeObjectURL(url), 5000)
//         }

//         imagesLoaded++
//         updateProgress()
//       }

//       xhr.onerror = () => {
//         console.error(`Failed to load image: ${imagePath}`)
//         imagesLoaded++
//         updateProgress()
//       }

//       xhr.send()
//     })
//   }
// }

// // Call the function with your image paths
// preloadImagesWithByteProgress([
//   './media/beach.jpg',
//   './media/lava.jpg',
//   './media/dark.jpg',
// ])

// Preload background images
const preloadImages = () => {
  const images = ["./media/beach.jpg", "./media/lava.jpg", "./media/dark.jpg"];

  images.forEach((imagePath) => {
    const img = new Image();
    img.src = imagePath; // Preload the image
  });
};

// Call the preload function
preloadImages();

const beachBG = () => {
  document.body.style.backgroundImage = "url('./media/beach.jpg')"; // Replace with your image path
};

const lavaBG = () => {
  document.body.style.backgroundImage = "url('./media/lava.jpg')"; // Replace with your image path
};

const darkBG = () => {
  document.body.style.backgroundImage = "url('./media/dark.jpg')"; // Replace with your image path
};

function startCountdown() {
  countdownInterval = setInterval(() => {
    count -= decrement;

    if (count <= 0) {
      clearInterval(countdownInterval);

      // Stop alarm when timer hits zero
      stopAlarm();

      let resetCountTime = 10; // Reset time in seconds
      countdownDiv.innerText = `THE FLOOR IS LAVA`;
      lavaBG();

      resetInterval = setInterval(() => {
        resetCountTime -= 1;
        if (resetCountTime <= 0) {
          clearInterval(resetInterval);
          resetCountdown();
        } else {
          if (resetCountTime <= 5) {
            stopAlarm(); // Stop the alarm when reset
            beachBG();
            countdownDiv.innerText = `RESETTING IN ${resetCountTime}`;
          }
        }
      }, 1000); // Update every second

      return;
    }

    countdownDiv.innerText = count.toFixed(1);

    if (count <= 5.9) {
      countdownDiv.classList.add("warning");

      // Start playing the alarm exactly at 5 seconds
      if (!alarmPlaying) {
        playAlarm();
        darkBG();
      }
    } else if (count < 15.9) {
      countdownDiv.classList.add("caution");
    }
  }, 100); // Update every 100ms
}

function resetCountdown() {
  count = newRandomNumber(); // Reset count
  countdownDiv.classList.remove("caution", "warning");
  startCountdown();
}

// Function to play the alarm
function playAlarm() {
  alarm
    .play()
    .then(() => {
      alarmPlaying = true;
    })
    .catch((error) => console.log("Audio play failed:", error));
}

// Function to stop the alarm
function stopAlarm() {
  if (alarmPlaying) {
    alarm.pause();
    alarm.currentTime = 0;
    alarmPlaying = false;
  }
}

startButton.textContent = "Start the Game";
startButton.classList.add("start-button");

startButton.addEventListener("click", startCountdown);
countdownDiv.appendChild(startButton);
beachBG();

document.body.style.backgroundSize = "cover"; // Ensures the image covers the entire background
document.body.style.backgroundRepeat = "no-repeat"; // Prevents the image from repeating
document.body.style.backgroundPosition = "center"; // Centers the image
