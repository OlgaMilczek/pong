import { RacketInterface } from './interfaces';

import { DIRECTIONS } from '../variables';

export class Racket implements RacketInterface {  
    private score: number = 0;
    private isMoving: boolean = false;
    private velocity: number =  3;

    constructor(
        public x: number, 
        public y: number, 
        public size: number,
        public width: number) {
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
        if (this.y + this.size /2 < ballY && this.y + this.size < height ) {
            this.y += this.velocity;
        } else if (this.y > 0) {
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

    render(ctx: CanvasRenderingContext2D) {
        const shape = new Path2D();
        shape.rect(this.x, this.y, this.width, this.size);

        ctx.fillStyle = '#333';
        ctx.fill(shape);
    }
}