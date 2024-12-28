# Mandelbrot Set Explorer

An interactive web application to explore the beautiful and intricate **Mandelbrot Set**, implemented using HTML5 Canvas, CSS, and JavaScript. This application allows you to zoom in, zoom out, and drag the fractal, providing an intuitive and fun way to explore the world of complex numbers and fractals.

# Core Concepts

## Fractal Rendering
The Mandelbrot set is rendered by iterating over the formula:

\[
z_{n+1} = z_n^2 + c
\]

where \( c \) is the complex number corresponding to each pixel.

## Features
- **Zooming**: Scroll to zoom in and out of the fractal. Zoom is centered on the cursor position.
- **Dragging**: Click and drag the fractal to explore different areas.
- **Responsive Design**: The canvas adapts to window resizing for seamless exploration.
- **Dynamic Coloring**: The fractal is rendered with a gradient color scheme based on escape iterations.

## Demo
Live preview available here: https://fractals-set.vercel.app/

![Mandelbrot Screenshot](<Images/Screenshot 2024-12-28 220602.png>)
![Mandelbrot Screenshot](<Images/Screenshot 2024-12-28 220833.png>)
![Mandelbrot Screenshot](<Images/Screenshot 2024-12-28 220804.png>)
[//]: # (will add this soon)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Rishav-subedi/MandelbrotSet.git
