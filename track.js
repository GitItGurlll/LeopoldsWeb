const track = document.getElementById("image-track");

const handleOnDown = e => {
  if (!track.contains(e.target)) return;
  track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
  if (track.dataset.mouseDownAt === "0") return;
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;
  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  track.dataset.percentage = nextPercentage;
  track.animate(
    { transform: `translate(${nextPercentage}%, -50%)` },
    { duration: 1200, fill: "forwards" }
  );
  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      { objectPosition: `${100 + nextPercentage}% center` },
      { duration: 1200, fill: "forwards" }
    );
  }
};

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);


const slider = document.querySelector('.slider');
const sliderContainer = document.querySelector('.sliderContainer');
const items = document.querySelectorAll('.item');
let currentIndex = 0;
let touchStartX = 0;

// Calculate the total width of all items
const totalItemsWidth = Array.from(items).reduce((total, item) => {
    const itemStyle = getComputedStyle(item);
    const itemWidth = item.offsetWidth + parseFloat(itemStyle.marginLeft) + parseFloat(itemStyle.marginRight);
    return total + itemWidth;
  }, 0);

// Set the width of the slider container to accommodate all items
sliderContainer.style.width = `${totalItemsWidth}px`;

function slideTo(index) {
const itemStyle = getComputedStyle(items[index]);
  const itemMarginLeft = parseFloat(itemStyle.marginLeft);
  const itemMarginRight = parseFloat(itemStyle.marginLeft);
  let translation;
  if (index < 0 || index >= items.length) {
    return;
  }

  if (index == 1) {
    translation = index * items[0].offsetWidth + (itemMarginLeft * 1.9);
  }

  if (index == 2) {
    translation = index * items[0].offsetWidth + (itemMarginLeft + (itemMarginRight * 3));
  }


  
  console.log(translation + "Margin-left" + itemMarginLeft);

  sliderContainer.style.transform = `translateX(-${translation}px)`;
  currentIndex = index;
}

function slideNext() {
  slideTo(currentIndex + 1);
}

function slidePrev() {
  slideTo(currentIndex - 1);
}

setInterval(slideNext, 4500); // Automatically slide every 3 seconds

slider.addEventListener('touchstart', handleTouchStart);
slider.addEventListener('touchmove', handleTouchMove);
slider.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  event.preventDefault(); // Prevent default scrolling behavior
  const touchX = event.touches[0].clientX;
  const touchDiff = touchX - touchStartX;

  if (touchDiff > 50) {
    slidePrev();
  } else if (touchDiff < -50) {
    slideNext();
  }
}

function handleTouchEnd() {
  touchStartX = 0;
}
