const track = document.getElementById("image-track");

const handleOnDown = e => {
  track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = track.offsetWidth;

  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`
    },
    { duration: 1000, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`
      },
      { duration: 1000, fill: "forwards" }
    );
  }
};

/* -- Add event listeners to the div element -- */
track.addEventListener("mousedown", handleOnDown);
track.addEventListener("touchstart", e => handleOnDown(e.touches[0]), { passive: true });
track.addEventListener("mouseup", handleOnUp);
track.addEventListener("touchend", e => handleOnUp(e.touches[0]), { passive: true });
track.addEventListener("mousemove", handleOnMove);
track.addEventListener("touchmove", e => handleOnMove(e.touches[0]), { passive: true });