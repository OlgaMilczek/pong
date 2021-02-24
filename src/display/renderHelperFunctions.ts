export const createScore = () => {
    const el = document.createElement('div');
    el.classList.add('score');

    const playerContainer = document.createElement('div');
    playerContainer.classList.add('score__container');

    const playerName = document.createElement('p');
    playerName.classList.add('score__name');
    playerName.textContent = 'Your score';

    const playerScore = document.createElement('p');
    playerScore.classList.add('score__display');

    playerContainer.appendChild(playerName);
    playerContainer.appendChild(playerScore);


    const computerContainer = document.createElement('div');
    computerContainer.classList.add('score__container');

    const computerName = document.createElement('p');
    computerName.classList.add('score__name');
    computerName.textContent = 'Computer score';

    const computerScore = document.createElement('p');
    computerScore.classList.add('score__display');

    computerContainer.appendChild(computerName);
    computerContainer.appendChild(computerScore);

    el.appendChild(playerContainer);
    el.appendChild(computerContainer);

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