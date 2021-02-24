export const createScore = () => {
    const el = document.createElement('div');
    el.classList.add('score');

    //Creating score display
    const playerScore = document.createElement('p');
    playerScore.classList.add('score__display');

    const computerScore = document.createElement('p');
    computerScore.classList.add('score__display');

    el.appendChild(playerScore);
    el.appendChild(computerScore);

    document.body.appendChild(el);

    return [el, playerScore, computerScore];
}

export const createCanvas = (width: number, height: number): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    document.body.appendChild(canvas);

    return canvas;
}

export const drawLine = (ctx: CanvasRenderingContext2D, positionX: number, height: number, pattern: number[]) =>  {
    ctx.beginPath();
    ctx.setLineDash(pattern);
    ctx.moveTo(positionX, 0);
    ctx.lineTo(positionX, height);
    ctx.stroke();
}