window.onload = function()
{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');

    drawScore(ctx);
}

function drawScore(ctx) {
    ctx.font = '28px serif';
    ctx.fillText('Hello world', 10, 50);
}

function canvasMouseClick(event) {
}