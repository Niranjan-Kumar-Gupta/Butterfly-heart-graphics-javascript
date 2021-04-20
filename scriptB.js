const canvas = document.getElementById("canvas1");
const ctx1 = canvas.getContext("2d");

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas2.width = innerWidth;
canvas2.height = innerHeight;

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas2.width = innerWidth;
    canvas2.height = innerHeight;
});

class Butterfly {
    constructor(x1, y1, s) {
        this.x = x1;
        this.y = y1;
        this.size = Math.random() * s + 20;
        this.t = 0;
        this.height = this.size * 0.6;
        this.hue = Math.random() * 255;
        this.color = "hsl(" + this.hue + ",100%,70%)";
        this.speed = Math.random() * 7.5 + 3;
    }
    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x + 2, this.y - this.height, 2, 0, Math.PI * 2);
        ctx.arc(this.x - 2, this.y - this.height, 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(this.x + 2, this.y - this.height);
        ctx.lineTo(this.x + 2, this.y + this.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x - 2, this.y - this.height);
        ctx.lineTo(this.x - 2, this.y + this.height);
        ctx.stroke();
        let x;
        let y;
        let rad = this.size;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        for (let a = -Math.PI / 2; a <= Math.PI / 2; a += 0.03) {
            x = this.x +rad *Math.sin(a) *Math.sin(2 * a) *(Math.abs(Math.sin(this.t)) + 0.1);
            y = this.y + rad * Math.cos(a) * Math.sin(2 * a);
            ctx.lineTo(x, y);
            ctx.fill();
        }
        for (let a = Math.PI / 2; a <= (3 * Math.PI) / 2; a += 0.03) {
            x = this.x +rad *Math.sin(a) *Math.sin(2 * a) *(Math.abs(Math.sin(this.t)) + 0.1);
            y = this.y + rad * Math.cos(a) * Math.sin(2 * a);
            ctx.lineTo(x, y);
            ctx.fill();
        }
        ctx.closePath();
    }
    update() {
        this.y -= this.speed;
        this.t += 0.5;
        if (this.y < -50) {
            this.x = Math.random() * (canvas.width - 150) + 100;
            this.y = canvas.height + 50;
            this.hue = Math.random() * 255;
            this.color = "hsl(" + this.hue + ",100%,50%)";
            this.size = Math.random() * 20 + 20;
            this.height = this.size * 0.6;
            this.speed = Math.random() * 7.5 + 3;
        }
    }
}

let butterfly = [];
for (let i = 0; i < 10; i++) {
    butterfly.push(new Butterfly( Math.random() * (canvas.width - 15) + 10, Math.random() * canvas.height, 20)
    );
}

function handelButterfly() {
    for (let i = 0; i < butterfly.length; i++) {
        butterfly[i].draw(ctx1);
        butterfly[i].update();
    }
}

let particleArray = [];

function gm() {
    ctx2.fillStyle = "white";
    ctx2.font = "37px serif";
    ctx2.fillText("Good Morning", 95, 318);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw(ctx2);
    }
}

function clear() {
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 5;
    }
    draw(ctx) {
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.strokeStyle = "rgba(34,147,214,1)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        this.size = 10;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x - 1, this.y - 1, this.size / 3, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function dataHeart() {
    for (let i = 0; i <= Math.PI * 2; i += 0.15) {
        let m = (canvas2.width / 41) * (16 * Math.sin(i) ** 3);
        let n = (-canvas2.width / 21) *(13 * Math.cos(i) -5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
        particleArray.push( new Particle(m + canvas.width / 2, n + canvas.height / 2));
    }
}
dataHeart();

setInterval(() => {
    clear();
    handelButterfly();
    gm();
}, 1000 / 60);
