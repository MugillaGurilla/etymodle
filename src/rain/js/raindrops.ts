export default function raindrops() {
  var rainDiv : HTMLElement | null = document.querySelector('div.rain');

  function generateRaindrop() : void {
    if (!rainDiv) {
      throw new Error('Rain div not found');
    }
    var drop : HTMLElement = document.createElement('div');
    drop.classList.add('raindrop');
    drop.style.left = (Math.floor(Math.random() * 90 + 5)) + '%';
    drop.style.animationDuration = Math.floor(Math.random() * 4) + 1 + 's';
    rainDiv.appendChild(drop)
  };

  function removeRaindrop() : void {
    if (!rainDiv) {
      throw new Error('Rain div not found');
    }
    if (rainDiv.children.length > 100 && rainDiv.firstChild) {
      rainDiv.removeChild(rainDiv.firstChild);
    }
  }


  setInterval(() : void => {
    generateRaindrop();
    removeRaindrop();
  }, 500);
};