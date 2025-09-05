export default function stars() : void {
  var starsDiv : HTMLElement | null = document.querySelector('div.stars');

  function generateStar() {
    if (!starsDiv) {
      throw new Error('Stars div not found');
    }

    var star : HTMLElement = document.createElement('div');
    star.classList.add('star');
    star.style.left = (Math.floor(Math.random() * 90 + 5)) + '%';
    star.style.top = (Math.floor(Math.random() * 20 + 3)) + '%';
    starsDiv.appendChild(star)
  };

  function removeStar() : void{
    if (!starsDiv) {
      throw new Error('Stars div not found');
    }
    if (starsDiv.children.length > 30 && starsDiv.firstChild) {
      starsDiv.removeChild(starsDiv.firstChild);
    }
  }

  while (starsDiv && starsDiv.children.length < 30) {
    generateStar();
  }
};