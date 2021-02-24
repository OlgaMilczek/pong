import { BallInterface } from './interfaces';

export class Ball implements BallInterface {
    constructor(
        public x: number, 
        public y: number, 
        public deltaY: number, 
        public deltaX: number,
        public size: number, 
        private velocity: number) {
    }

    move() {
        this.x += this.deltaX * this.velocity;
        this.y += this.deltaY * this.velocity;
    }

    changeDeration(newDeltaX: number, newDeltaY: number) {
        this.deltaY = newDeltaY; 
        this.deltaX = newDeltaX;
    }

    increaseVelocity() {
        this.velocity += 1;
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

        ctx.fillStyle = '#555';
        ctx.fill(shape);
    }
};
