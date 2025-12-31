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
  }, 4000); // 2000ms = 2 seconds
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