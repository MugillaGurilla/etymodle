export default function shootingStars() {
  function createShootingStar() : void  {
    let direction : string;
    direction = Math.random() > 0.5
      ? direction = 'left'
      : direction = 'right';

    const container : HTMLElement | null = document.getElementById('shooting-stars-container');
    if (!container) {
      throw new Error('Shooting stars container not found');
    }
    const shootingStar : HTMLElement = document.createElement('div');

    shootingStar.classList.add('shooting-star', direction);
    shootingStar.style.top = Math.random() * 70 + '%'; 
    container.appendChild(shootingStar);
    shootingStar.addEventListener('animationend', () => {
      container.removeChild(shootingStar);
    });
  }

  function simulateShootingStars() : void {
    setInterval(() : void => {
      if (Math.random() < 0.9) {
        createShootingStar();
      }
    }, 5000);
  }

  simulateShootingStars();
};