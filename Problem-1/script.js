document.getElementById('block-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const input = document.getElementById('heights').value;
    const heights = input.split(',').map(Number);
    const result = calculateWater(heights);
    renderSVGTable(heights, result.waterLevels);
    document.getElementById('total-water').innerText = `Total water stored: ${result.total}`;
});

function calculateWater(heights) {
    const n = heights.length;
    if (n === 0) return { total: 0, waterLevels: [] };

    const leftMax = Array(n).fill(0);
    const rightMax = Array(n).fill(0);
    const waterLevels = Array(n).fill(0);

    leftMax[0] = heights[0];
    for (let i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i - 1], heights[i]);

    rightMax[n - 1] = heights[n - 1];
    for (let i = n - 2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i + 1], heights[i]);

    let totalWater = 0;
    for (let i = 0; i < n; i++) {
        waterLevels[i] = Math.max(0, Math.min(leftMax[i], rightMax[i]) - heights[i]);
        totalWater += waterLevels[i];
    }

    return { total: totalWater, waterLevels };
}

function renderSVGTable(heights, waterLevels) {
    const container = document.getElementById('svg-container');
    container.innerHTML = '';

    const maxHeight = Math.max(...heights) + Math.max(...waterLevels);
    const cellSize = 20; // Each cell's width and height in pixels
    const svgWidth = heights.length * cellSize;
    const svgHeight = maxHeight * cellSize;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', svgWidth);
    svg.setAttribute('height', svgHeight);

    heights.forEach((height, index) => {
        const totalHeight = height + waterLevels[index];

        for (let y = 0; y < totalHeight; y++) {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', index * cellSize);
            rect.setAttribute('y', svgHeight - (y + 1) * cellSize);
            rect.setAttribute('width', cellSize);
            rect.setAttribute('height', cellSize);

            if (y < height) {
                rect.classList.add('block');
            } else {
                rect.classList.add('water');
            }

            svg.appendChild(rect);
        }
    });

    container.appendChild(svg);
}