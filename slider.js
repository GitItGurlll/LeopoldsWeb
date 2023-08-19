const slider = document.querySelector('.slider');
const sliderContainer = document.querySelector('.sliderContainer');
const items = document.querySelectorAll('.item');
const rowGap = (window.innerWidth / 2); // Adjust this value based on your desired row gap

let currentIndex = 0;
let index = 0;
let touchStartX = 0;
let touchStartY = 0;

// Calculate the total width of all items, including the row gap
const totalItemsWidth = Array.from(items).reduce((total, item) => {
  const itemStyle = getComputedStyle(item);
  const itemWidth = item.offsetWidth + parseFloat(itemStyle.marginLeft) + parseFloat(itemStyle.marginRight);
  return total + itemWidth + rowGap;
}, 0);

// Set the width of the slider container to accommodate all items
sliderContainer.style.width = `${totalItemsWidth}px`;



function slideTo(index, swipe) {
  let translation;
if (currentIndex == 2 && swipe != true) {
    console.log(currentIndex + index);
    index = 0;
}

  if (index < 0 || index >= items.length) {
    return;
  }

  translation = index * (items[0].offsetWidth + rowGap);
  sliderContainer.style.transform = `translateX(-${translation}px)`;
  currentIndex = index;
  return;
}

function slideNext(swipe) {
  slideTo(currentIndex + 1, swipe);
}

function slidePrev(swipe) {
  slideTo(currentIndex - 1, swipe);
}

setInterval(slideNext, 8500); // Automatically slide every 4.5 seconds

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
  
    console.log("hi")
  if (touchDiff > 50) {
    slidePrev(true);
  } else if (touchDiff < -50) {
    slideNext(true);
  }
}

function handleTouchEnd() {
  touchStartX = 0;
}
