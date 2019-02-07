class Player {
    constructor(x, y, r, s) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = s;
    }

    move(dir) {
        this.x += this.speed * dir;
        this.x = constrain(this.x, playerRadius/2, width - playerRadius/2);
    }

    show() {
        noStroke();
        fill(255);
        ellipse(this.x, this.y, this.r, this.r);
    }
}