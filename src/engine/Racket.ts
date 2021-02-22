enum directions {
    'UP' = 1,
    'DOWN' = -1,
};

export class Racket {  
    protected score: number = 0;

    constructor(
        public x: number, 
        public y: number, 
        public size: number,
        public width: number) {
    }

    move(direction:directions) {
        this.y += direction * 5;
    }

    increaseScore() {
        this.score += 1;
    }

    render(ctx: CanvasRenderingContext2D) {
        const shape = new Path2D();
        shape.rect(this.x, this.y, this.width, this.size);

        ctx.fillStyle = 'blue';
        ctx.fill(shape);
    }
}