let
container = document.querySelector('.stats-spread .health-bar'),
start,
previousTimestamp,
width = 0,
done = false;

function step(timestamp) {
  if(start === undefined) { start = timestamp; }
  let elapsed = timestamp - start;

  if( previousTimestamp !== timestamp) {
    width++;
    container.style.width = width + '%';

    //ensures that a fast machine doesn't speed the animation
    previousTimestamp = timestamp;
  }
  // condition for done to be true
  // stops the animation if it goes longer than 30 sec
  if(width === 100 || elapsed > 30000) {
    done = true;
  }
  if(!done) window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);