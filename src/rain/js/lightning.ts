export default function lightning() : void {
  const frequency : number = 0.1;

  function createLightning() : void {
    const container : HTMLElement | null = document.getElementById("lightning-container");
    if (!container) {
      throw new Error("Lightning container not found");
    };

    const left : string = Math.random() * 100 + "%";
    const lightning : HTMLElement = document.createElement("div");
    lightning.classList.add("lightning");
    lightning.style.left = left;
    container.appendChild(lightning);

    const wrapper : HTMLElement = document.createElement("div");
    wrapper.classList.add("lightning-wrapper");
    wrapper.style.left = left;
    container.appendChild(wrapper);
    
    setTimeout(() : void  => {
      container.removeChild(lightning);
      container.removeChild(wrapper);
    }, 2000); 
  }

  function simulateLightning() : void  {
    setInterval(() => {
      if (Math.random() < frequency) { 
        createLightning();
      }
    }, 2000); 
  }

  simulateLightning();
};