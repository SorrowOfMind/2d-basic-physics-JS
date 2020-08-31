const ctx = document.getElementById("game").getContext("2d");
const SIZE = 40;

const width = ctx.canvas.width;
const height = ctx.canvas.height;

const player = {
    height: SIZE,
    width: SIZE,
    x: width * 0.5 - SIZE * 0.5,
    y: SIZE,
    velX: 0,
    velY: 0,
    jumping: false
};

const draw = () => {
    ctx.fillStyle = '#05DAF9';
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = '#ff7bb3';
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.width, player.height);
    ctx.fill();
    ctx.fillStyle = '#72be5a';
    ctx.beginPath();
    ctx.rect(0, height - SIZE, width, SIZE);
    ctx.fill();
}

const gameLoop = () => {
    draw()



    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
