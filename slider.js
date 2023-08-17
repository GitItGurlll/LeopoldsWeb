const slider = document.querySelector('.slider');
const sliderContainer = document.querySelector('.sliderContainer');
const items = document.querySelectorAll('.item');
const rowGap = (window.innerWidth / 2); // Adjust this value based on your desired row gap

let currentIndex = 0;
let touchStartX = 0;

// Calculate the total width of all items, including the row gap
const totalItemsWidth = Array.from(items).reduce((total, item) => {
  const itemStyle = getComputedStyle(item);
  const itemWidth = item.offsetWidth + parseFloat(itemStyle.marginLeft) + parseFloat(itemStyle.marginRight);
  return total + itemWidth + rowGap;
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

  translation = index * (items[0].offsetWidth + rowGap);
  sliderContainer.style.transform = `translateX(-${translation}px)`;
  currentIndex = index;
}

function slideNext() {
  slideTo(currentIndex + 1);
}

function slidePrev() {
  slideTo(currentIndex - 1);
}

setInterval(slideNext, 4500); // Automatically slide every 4.5 seconds

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
