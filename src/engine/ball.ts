import { MAX_VELOCITY } from '../variables';

interface BallInterface {
    x: number, 
    y: number, 
    deltaY: number,
    deltaX: number,
};

export class Ball implements BallInterface {
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
            this.velocity += 1;
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
        const shape = new Path2D();
        shape.arc(this.x, this.y, this.size, 0, 2 * Math.PI);

        ctx.fillStyle = 'rgb(71, 33, 30)';
        ctx.fill(shape);
    }
};
