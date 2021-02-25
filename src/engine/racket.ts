import { DIRECTIONS, PLAYERS } from '../variables';

interface RacketInterface {
    x: number, 
    y: number,
    name: PLAYERS,
};

export class Racket implements RacketInterface {  
    private score: number = 0;
    private isMoving: boolean = false;
    private velocity: number =  3;

    constructor(
        public x: number,
        public y: number,
        public name: PLAYERS,
        private size: number,
        private width: number) {
    }

    move(direction:DIRECTIONS, ballDeltaY: number) {
        this.setVelocity(ballDeltaY);
        this.y += direction *  this.velocity * 1.5;
        this.isMoving = true;
    }

    setMoveStop() {
        this.isMoving = !this.isMoving;
    }

    getIsMoving() {
        return this.isMoving;
    }

    increaseScore() {
        this.score += 1;
    }

    getScore() {
        return this.score;
    }

    moveComputer(height: number, ballY: number, ballDeltaY: number) {
        this.setVelocity(ballDeltaY);
        if (this.y + this.size / 2 < ballY && this.y + this.size < height ) {
            this.y += this.velocity;
        } else if (this.y + this.size / 2 > ballY && this.y > 0) {
            this.y -= this.velocity;
        }
        this.isMoving = false;
    }

    private setVelocity(ballDeltaY: number) {
        let absFromDeltaY =  Math.floor(Math.abs(ballDeltaY));
        if ( absFromDeltaY < 1) {
            this.velocity = 3;
        } else if (absFromDeltaY <= 2) {
            this.velocity = 6;
        } else if (absFromDeltaY > 2) {
            this.velocity = 9;
        }
    }

    render(ctx: CanvasRenderingContext2D, color: string, colorSecondary: string) {
        const shadow1 = new Path2D();
        shadow1.rect(this.x -5, this.y, this.width + 10, this.size);
        ctx.fillStyle = colorSecondary;
        ctx.fill(shadow1);

        const shadow2 = new Path2D();
        shadow2.rect(this.x, this.y-5, this.width, this.size + 10);
        ctx.fillStyle = colorSecondary;
        ctx.fill(shadow2);

        const shape = new Path2D();
        shape.rect(this.x, this.y, this.width, this.size);

        ctx.fillStyle = color;
        ctx.fill(shape);
    }
}