class Bullet {
    constructor() {
        this.size = bulletSize;
        this.x = random(width-this.size);
        this.y = -this.size;
        this.speed = bulletSpeed;
    }
    show() {
        noStroke();
        fill(255, 0, 0);
        rect(this.x, this.y, this.size, this.size);
    }
    update() {
        this.y += this.speed;
    }
}