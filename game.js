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
    jumping: false,
    jumpForce: 40,
    speed: 1
};

const controller = {
    right: false,
    let: false,
    up: false,

    checkKeys (e) {
        let keyState = (e.type === 'keydown') ? true : false;
        switch (e.keyCode) {
            case 37:
                controller.left = keyState;
                break;
            case 38:
                controller.up = keyState;
                break;
            case 39:
                controller.right = keyState;
                break;
        }
    }
}

const addMovement = ({jumpForce, speed}) => {
    if (controller.left) {
        player.velX -= speed;
    }
    if (controller.right) {
        player.velX += speed;
    }
    if (controller.up && player.jumping === false) {
        player.velY -= jumpForce;
        player.jumping = true;
    }
}

const simulatePhysics = (gravity, friction) => {
    player.velY += gravity;
    player.x += player.velX;
    player.y += player.velY;
    player.velX *= friction;
    player.velY *= friction;
}

const detectCollision = () => {
    if (player.y > height - SIZE*2) {
        player.y = height - SIZE*2;
        player.jumping = false;
    };
    if (player.x + SIZE < 0) player.x = width;
    if (player.x - SIZE > width) player.x = 0;
}

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
    addMovement(player);
    simulatePhysics(1.5, 0.8);
    detectCollision();

    window.requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', controller.checkKeys);
window.addEventListener('keyup', controller.checkKeys);
window.requestAnimationFrame(gameLoop);
