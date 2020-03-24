const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function(e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: null,
  y: null
};

window.addEventListener("mousemove", function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Button {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.baseX = x;
  }
  update() {
    let directionX = 3.3;
    if (
      mouse.x < this.x + this.width &&
      mouse.x > this.x &&
      mouse.y < this.y + this.height &&
      mouse.y > this.y &&
      this.x > this.baseX - 50
    ) {
      this.x -= directionX;
      this.width += directionX;
    } else if (this.x < this.baseX && this.width > 200) {
      this.x += directionX;
      this.width -= directionX;
    }
  }
  draw() {
    ctx.fillStyle = "dodgerblue";
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}

const buttons = [];
function createButtons() {
  for (let i = 0; i < 5; i++) {
    let topMargin = 300;
    let buttonMargin = 5;
    let x = 150;
    let y = topMargin + (50 + buttonMargin) * i;
    let height = 50;
    let width = 200;
    buttons.push(new Button(x, y, width, height));
  }
}
createButtons();

function drawButtons() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].update();
    // buttons[i].draw();
  }
}

// handle water particles
class Particle {
  constructor(x, y, size, weight) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.weight = weight;
  }
  update() {
    for (let i = 0; i < buttons.length; i++) {
      const btn = buttons[i];
      if (
        this.x < btn.x + btn.width &&
        this.x > btn.x &&
        this.y < btn.y + btn.height &&
        this.y > btn.y
      ) {
        this.weight = 0;
        this.x -= 4;
      } else {
        this.weight += 0.03;
      }
    }
    if (this.y > canvas.height) {
      this.y = 0 - this.size;
      this.x = Math.random() * 60 + 200;
      this.weight = Math.random() * 0.5 + 1;
    }
    this.y += this.weight;
  }
  draw() {
    ctx.fillStyle = "#37f";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}
const particleArray = [];
const numberOfParticles = 80;
function createParticles() {
  for (let i = 0; i < numberOfParticles; i++) {
    const x = Math.random() * 60 + 200;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 20 + 5;
    const weight = Math.random() * 0.2 + 0.1;
    particleArray.push(new Particle(x, y, size, weight));
  }
}
createParticles();

function drawParticles() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
  }
}

// animate canvas
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawParticles();
  drawButtons();
  requestAnimationFrame(animate);
}
animate();
