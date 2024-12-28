const canvas = document.getElementById("mandelbrotCanvas");
        const ctx = canvas.getContext("2d");

        // Resize canvas to fit the window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let width = canvas.width;
        let height = canvas.height;

        // Mandelbrot parameters
        let zoom = 1;
        let offsetX = -0.5;
        let offsetY = 0;
        let maxIterations = 500;

        // Mouse dragging state
        let isDragging = false;
        let lastMouseX = 0;
        let lastMouseY = 0;

        function drawMandelbrot() {
            const imgData = ctx.createImageData(width, height);
            const pixels = imgData.data;

            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    const cx = (x - width / 2) / (200 * zoom) + offsetX;
                    const cy = (y - height / 2) / (200 * zoom) + offsetY;
                    let zx = 0;
                    let zy = 0;
                    let iteration = 0;

                    // Mandelbrot formula iteration
                    while (zx * zx + zy * zy < 4 && iteration < maxIterations) {
                        const xtemp = zx * zx - zy * zy + cx;
                        zy = 2 * zx * zy + cy;
                        zx = xtemp;
                        iteration++;
                    }

                    const pixelIndex = 4 * (y * width + x);
                    const color = iteration === maxIterations ? [0, 0, 0] : getColor(iteration);
                    pixels[pixelIndex] = color[0];      // Red
                    pixels[pixelIndex + 1] = color[1]; // Green
                    pixels[pixelIndex + 2] = color[2]; // Blue
                    pixels[pixelIndex + 3] = 255;      // Alpha
                }
            }

            ctx.putImageData(imgData, 0, 0);
        }

        function getColor(iteration) {
            // Smooth coloring based on iteration
            const t = iteration / maxIterations;
            const r = Math.floor(9 * (1 - t) * t * t * t * 255);
            const g = Math.floor(15 * (1 - t) * (1 - t) * t * t * 255);
            const b = Math.floor(8.5 * (1 - t) * (1 - t) * (1 - t) * t * 255);
            return [r, g, b];
        }

        function update() {
            drawMandelbrot();
        }

        // Handle zooming via mouse wheel, centered on cursor
        canvas.addEventListener("wheel", (event) => {
            const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;

            // Calculate mouse position relative to canvas center
            const mouseX = (event.clientX - width / 2) / (200 * zoom);
            const mouseY = (event.clientY - height / 2) / (200 * zoom);

            // Adjust offsetX and offsetY to zoom at cursor position
            offsetX += mouseX * (1 - zoomFactor);
            offsetY += mouseY * (1 - zoomFactor);

            // Update zoom level
            zoom *= zoomFactor;

            update();
        });

        // Handle dragging functionality
        canvas.addEventListener("mousedown", (event) => {
            isDragging = true;
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        });

        canvas.addEventListener("mousemove", (event) => {
            if (!isDragging) return;

            // Calculate movement in pixel space
            const deltaX = event.clientX - lastMouseX;
            const deltaY = event.clientY - lastMouseY;

            // Convert pixel movement to Mandelbrot space movement
            offsetX -= deltaX / (200 * zoom);
            offsetY -= deltaY / (200 * zoom);

            lastMouseX = event.clientX;
            lastMouseY = event.clientY;

            update();
        });

        canvas.addEventListener("mouseup", () => {
            isDragging = false;
        });

        canvas.addEventListener("mouseleave", () => {
            isDragging = false;
        });

        // Handle resizing the canvas
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            width = canvas.width;
            height = canvas.height;
            update();
        });

        // Initial render
        update();