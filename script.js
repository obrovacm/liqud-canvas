const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.heigh = window.innerHeigh;

const mouse = {
  x: null,
  y: null
};

window.addEventListener("mousemove", function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Button {
  constructor(x, y, width, heigh, baseX) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.heigh = heigh;
    this.baseX = x;
  }
  update() {
    let directionX = 2.2;
    if (
      mouse.x < this.x + this.width &&
      mouse.x > this.x &&
      mouse.y < this.y + this.heigh &&
      mouse.y > this.y &&
      this.x > this.baseX - 50
    ) {
      this.x -= directionX;
      this.width -=directionX;
    } else if (this.x < this.baseX) {
      this.x += directionX;
      this.width +=directionX;
    }
  }
  draw() {
    ctx.fillStyle = "dodgerblue";
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.heigh);
    ctx.closePath();
  }
}

const buttons = [];
function createButtons() {
  for (let i = 0; i < 5; i++) {
    let topMargin = 100;
    let buttonMargin = 5;
    let x = 150;
    let y = topMargin + ((50 + buttonMargin) * i);
    let heigh = 50;
    let width = 200;
    buttons.push(new Button(x, y, width, heigh));
  }
}
createButtons();

console.log(buttons);
function drawButtons() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].update();
    buttons[i].draw();
  }
}

// handle water particles

// animate canvas
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.heigh);
  drawButtons();
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', function(e){
  canvas.width = window.innerWidth;
  canvas.heigh = window.innerHeight;
})