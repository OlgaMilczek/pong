enum directions {
    'UP' = 1,
    'DOWN' = -1,
};

export class Racket {  
    protected score: number = 0;
    protected isMoving: boolean = false;

    constructor(
        public x: number, 
        public y: number, 
        public size: number,
        public width: number) {
    }

    move(direction:directions) {
        this.y += direction * 5;
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
        let velocity;
        switch ( Math.floor(Math.abs(ballDeltaY)) ) {
            case 1:
                velocity = 6;
                break;
            case 2: 
                velocity = 9
                break;
            default:
                velocity = 3;
        }
        if (this.y + this.size /2 < ballY && this.y + this.size < height ) {
            this.y += velocity;
        } else if (this.y > 0) {
            this.y -= velocity;
        }
        this.isMoving = false;
    }

    render(ctx: CanvasRenderingContext2D) {
        const shape = new Path2D();
        shape.rect(this.x, this.y, this.width, this.size);

        ctx.fillStyle = '#333';
        ctx.fill(shape);
    }
}