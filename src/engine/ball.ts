import { MAX_VELOCITY } from '../variables';

interface BallInterface {
    x: number, 
    y: number, 
    deltaY: number,
    deltaX: number,
};

export class Ball implements BallInterface {
    private angle = 0;

    constructor(
        public x: number, 
        public y: number, 
        public deltaY: number, 
        public deltaX: number,
        private size: number, 
        private velocity: number) {
    }

    move() {
        let modifier = this.velocity / Math.sqrt(this.deltaX * this.deltaX + this.deltaY * this.deltaY)
        this.x += this.deltaX * modifier;
        this.y += this.deltaY * modifier;
    }

    changeDuration(newDeltaX: number, newDeltaY: number) {
        this.deltaY = newDeltaY; 
        this.deltaX = newDeltaX;
    }

    increaseVelocity() {
        if (this.velocity <= MAX_VELOCITY ) {
            this.velocity++;
            this.angle++;
        }
    }

    resetVelocity(initialVelocity: number) {
        this.velocity = initialVelocity;
    }

    resetBallPosition(initialX: number, initialY: number) {
        this.x = initialX;
        this.y = initialY;
    }

    render(ctx: CanvasRenderingContext2D) {
        const img = new Image();
        img.src = require('../assets/img/ball.png');

        ctx.save();  
        ctx.translate(this.x, this.y);  
        ctx.rotate(this.angle * 0.2);
        ctx.translate(-this.x, -this.y);  
        ctx.drawImage(img, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);  
        ctx.restore();  
   
        this.angle++;

    }
};
