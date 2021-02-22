import './scss/app.scss';

import { Ball } from './engine/Ball';
import { Racket } from './engine/Racket';
import { bounce } from './engine/bounce';

const WIDTH = window.innerWidth - 10;
const HEIGHT = window.innerHeight - 10;
const BALL_SIZE = 30;
const RACKET_SIZE = 180;
const RACKET_WEIGHT = 10;
const INITIAL_VELOCITY = 3;
const RACKET_OFFSET = 100;

const createScore = () => {
    const el = document.createElement('div');
    el.classList.add('score');

    document.body.appendChild(el);

    return el;
}

const createCanvas = (width: number, height: number): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    document.body.appendChild(canvas);

    return canvas;
}

const canvas = createCanvas(WIDTH, HEIGHT);
const scoreEl = createScore();
const ctx = canvas.getContext('2d');

if (ctx && scoreEl) {
    let deltaX: number;
    let deltaY: number;

    const ball = new Ball (WIDTH/ 2, HEIGHT/ 2, 1, 1, BALL_SIZE, INITIAL_VELOCITY);
    const player = new Racket (RACKET_OFFSET, HEIGHT/ 2 - RACKET_SIZE, RACKET_SIZE, RACKET_WEIGHT);
    const computer = new Racket (WIDTH - RACKET_OFFSET, HEIGHT/ 2 - RACKET_SIZE, RACKET_SIZE, RACKET_WEIGHT);

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp') {
            if (player.y + player.size < HEIGHT) {
                player.move(1);
            }
        } else if (e.key === 'ArrowDown') {
            if (player.y > 0) {
                player.move(-1);
            }
        }
    });

    let isGameOver = false; 
    const render = () => {
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        player.render(ctx);
        computer.render(ctx);

        ball.move();
        ball.render(ctx);


        //TO BE CHANGE
        if (ball.x < 0 || ball.x >= WIDTH) {
            [deltaX, deltaY] = bounce(ball.deltaX, ball.deltaY, 'racket');
        }

        if (ball.y < 0 || ball.y >= HEIGHT) {
            [deltaX, deltaY] = bounce(ball.deltaX, ball.deltaY, 'wall');
        }

        if (deltaX && deltaY) {
            ball.changeDeration(deltaX, deltaY);
        }

        if (!isGameOver) {
            requestAnimationFrame(render);
        }
    }

    render();
}



