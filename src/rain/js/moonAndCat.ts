export default function moonAndCat() : void {
  const canvas = document.getElementById('moon-cat') as HTMLCanvasElement | null;
  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    throw new Error('Canvas not found or not instance of HTMLCanvasElement');
  }
  const ctx : CanvasRenderingContext2D | null = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Unable to get canvas context');
  }
  const radius : number = 75
  const buffer : number = 100

  canvas.width = radius * 3 + buffer;
  canvas.height = radius * 3 + buffer;

  const moon : Record<string, any> = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: radius,
    fillColor: '#f7f7f7',
    shadowColor: '#ffffffd7',
    shadowBlur: 50,
    rotation: Math.PI / 2
  };

  const cat : Record<string, any> = {
    x: canvas.width / 2 + 30,
    y: canvas.height / 2 + 30,
    bodyRadius: 15,
    headRadius: 7,
    earHeight: 5,
    tailWidth: 5,
    colour: '#ed8d0c',
  }


  function drawMoonAndCat() : void  {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Canvas not found or not instance of HTMLCanvasElement');
    }
    if (!ctx) {
      throw new Error('Unable to get canvas context');
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // Draw right half of full moon
    ctx.beginPath();
    ctx.arc(moon.x, moon.y, moon.radius, -moon.rotation, Math.PI - moon.rotation, false); 
    ctx.fillStyle = moon.fillColor; 
    // ctx.shadowColor = '';
    // ctx.shadowBlur = '';
    ctx.fill();
    ctx.closePath();

    // Draw left half of full moon
    ctx.beginPath();
    ctx.arc(moon.x, moon.y, moon.radius, Math.PI - moon.rotation, Math.PI * 2 - moon.rotation, false); 
    ctx.fillStyle = moon.fillColor; 
    ctx.shadowColor = moon.shadowColor;
    ctx.shadowBlur = moon.shadowBlur;
    ctx.fill();
    ctx.closePath();

    // Cut out crescent shape
    ctx.beginPath();
    ctx.arc(moon.x + 30, moon.y - 20, moon.radius - 10, 0, 2 * Math.PI);
    // ctx.shadowColor = null;
    // ctx.shadowBlur = null;
    ctx.fillStyle = '#0f0f0feb';
    ctx.fill();
    ctx.closePath();

    // Draw the body of cat
    ctx.beginPath();
    ctx.arc(cat.x, cat.y, cat.bodyRadius, 0, Math.PI * 2);
    ctx.fillStyle = cat.colour;
    ctx.fill();
    ctx.closePath();
    
    // Draw the head
    ctx.beginPath();
    ctx.arc(cat.x, cat.y - cat.bodyRadius - cat.headRadius, cat.headRadius, 0, Math.PI * 2);
    ctx.fillStyle = cat.colour;
    ctx.fill();
    ctx.closePath();

    // Draw the tail
    ctx.beginPath();
    ctx.moveTo(cat.x, cat.y + cat.bodyRadius);
    const frequency : number = 0.5; 
    const time : number = Date.now() * 0.001; 

    const controlPoint2X = cat.x + 10 + 10 * Math.sin(frequency * time); 
    const controlPoint3X = cat.x + 0 + 15 * Math.sin(frequency * time);
    const controlPoint3Y = cat.y + 40 + 5 * Math.sin(frequency * time);
    ctx.bezierCurveTo(
      cat.x, cat.y + 30,
      controlPoint2X, cat.y + 35,  
      controlPoint3X, controlPoint3Y,
    );
    
    ctx.lineWidth = cat.tailWidth; 
    ctx.strokeStyle = cat.colour;
    ctx.stroke();
    ctx.closePath();
  }

  function update() : void {
    drawMoonAndCat();
    requestAnimationFrame(update);
  }

  update();
};