const grid = document.getElementById('serviceGrid');
const seg1 = document.getElementById('seg1');
const seg2 = document.getElementById('seg2');

let autoScrollTimer;

// Function to update the bar highlights
function updateScrollbars() {
  const scrollLeft = grid.scrollLeft;
  const maxScroll = grid.scrollWidth - grid.clientWidth;
  const scrollPercentage = (scrollLeft / maxScroll) * 100;

  if (scrollPercentage < 50) {
    seg1.classList.add('active');
    seg2.classList.remove('active');
  } else {
    seg1.classList.remove('active');
    seg2.classList.add('active');
  }
}

// Function to handle the automatic jumping
function startAutoScroll() {
  // Clear any existing timer first
  clearInterval(autoScrollTimer);

  autoScrollTimer = setInterval(() => {
    const maxScroll = grid.scrollWidth - grid.clientWidth;
    
    // If we are near the start, scroll to the end. If at the end, scroll back to start.
    if (grid.scrollLeft < maxScroll / 2) {
      grid.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      grid.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, 4000); // 1000ms = 1 seconds
}

// Listen for manual scrolls
grid.addEventListener('scroll', () => {
  updateScrollbars();
  
  // OPTIONAL: Restart the timer when the user scrolls manually 
  // so it doesn't jump while they are trying to read.
  clearInterval(autoScrollTimer);
  startAutoScroll();
});

// Initialize
seg1.classList.add('active');
startAutoScroll();

const procGrid = document.getElementById('processGrid');
const procNext = document.getElementById('procNext');
const procPrev = document.getElementById('procPrev');
const procSeg1 = document.getElementById('procSeg1');
const procSeg2 = document.getElementById('procSeg2');

let procAutoTimer;

// Update the 2-part scrollbar
function updateProcUI() {
  const maxScroll = procGrid.scrollWidth - procGrid.clientWidth;
  const scrollPos = procGrid.scrollLeft;
  
  // If scrolled past 45% of total width, switch segments
  if (scrollPos < (maxScroll * 0.45)) {
    procSeg1.classList.add('active');
    procSeg2.classList.remove('active');
  } else {
    procSeg1.classList.remove('active');
    procSeg2.classList.add('active');
  }
}

// Manual Button Logic
procNext.addEventListener('click', () => {
  procGrid.scrollBy({ left: 320, behavior: 'smooth' });
  resetProcTimer();
});

procPrev.addEventListener('click', () => {
  procGrid.scrollBy({ left: -320, behavior: 'smooth' });
  resetProcTimer();
});

// Auto-Scroll Logic (every 2 seconds)
function startProcAuto() {
  procAutoTimer = setInterval(() => {
    const maxScroll = procGrid.scrollWidth - procGrid.clientWidth;
    
    // Loop back to start if at the end, otherwise scroll right
    if (procGrid.scrollLeft >= maxScroll - 5) {
      procGrid.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      procGrid.scrollBy({ left: 320, behavior: 'smooth' });
    }
  }, 4000);
}

function resetProcTimer() {
  clearInterval(procAutoTimer);
  startProcAuto();
}

// Track scrolling for segment update
procGrid.addEventListener('scroll', updateProcUI);

// Start
updateProcUI();
startProcAuto();