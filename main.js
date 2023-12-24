import './style.css';

const canvas = document.getElementById('pixel_canvas');
const pencilBtn = document.getElementById('pencil');
const rectangle = document.getElementById('rect');

const pixel_size = 10;
const width_pixel = 50;
const height_pixel = 50;
const canvas_width = width_pixel * pixel_size;
const canvas_height = height_pixel * pixel_size;
const default_pixel_color = '#000000';

//states
let is_mouse_down = false;

canvas.onmousedown = () => {
  is_mouse_down = true;
};

canvas.onmouseup = () => {
  is_mouse_down = false;
};

canvas.width = canvas_width;
canvas.height = canvas_height;

const grid = [];

for (let i = 0; i < height_pixel; i++) {
  const row = [];
  for (let j = 0; j < width_pixel; j++) {
    row.push(default_pixel_color);
  }
  grid.push(row);
}

canvas.onmousemove = () => {};

/** @type {CanvasRenderingContext2D} ctx */
const ctx = canvas.getContext('2d', {
  alpha: true,
});

const drawLoop = () => {
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  for (let i = 0; i < height_pixel; i++) {
    for (let j = 0; j < width_pixel; j++) {
      ctx.fillStyle = grid[i][j];
      ctx.fillRect(j * pixel_size, i * pixel_size, pixel_size, pixel_size);
    }
  }
  requestAnimationFrame(drawLoop);
};
drawLoop();
