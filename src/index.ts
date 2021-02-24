import './scss/app.scss';

import { Ball } from './engine/ball';
import { Racket } from './engine/racket';
import { bounce } from './engine/bounce';
import { findNewDeltas } from './engine/findNewDeltas';

import { createCanvas, createScore, drawCourt } from './display/render';
import { setEventForMove, setEventForMoveStop } from './display/setEventListeners';

import {
    WIDTH,
    HEIGHT,
    BALL_SIZE ,
    RACKET_SIZE,
    RACKET_WEIGHT, 
    INITIAL_VELOCITY,
    RACKET_OFFSET,
    OBSTACLES } from './variables';

const canvas = createCanvas(WIDTH, HEIGHT);
const [scoreEl, playerScore, computerScore ] = createScore();
const ctx = canvas.getContext('2d');

if (ctx && scoreEl) {
    let deltaX: number | undefined;
    let deltaY: number | undefined;
    let isGameOver: boolean = false;

    const ball = new Ball (WIDTH/ 2, HEIGHT/ 2, 1, -1, BALL_SIZE, INITIAL_VELOCITY);
    const player = new Racket (RACKET_OFFSET, HEIGHT/ 2 - RACKET_SIZE / 2, RACKET_SIZE, RACKET_WEIGHT);
    const computer = new Racket (WIDTH - RACKET_OFFSET, HEIGHT/ 2 - RACKET_SIZE / 2, RACKET_SIZE, RACKET_WEIGHT);

    playerScore.textContent = player.getScore().toString();
    computerScore.textContent = computer.getScore().toString();

    document.addEventListener('keydown', e => setEventForMove(e, player, ball, HEIGHT));

    document.addEventListener('keyup', e => setEventForMoveStop(e, player, ball, HEIGHT));

    const render = () => {
        drawCourt(ctx, canvas.width, canvas.height, RACKET_OFFSET, RACKET_WEIGHT);
        
        player.render(ctx);
        computer.render(ctx);
        if (ball.x > WIDTH / 2 && ball.deltaX > 0 ) {
            computer.moveComputer(ball.y, HEIGHT, ball.deltaY);
        }

        ball.move();
        ball.render(ctx);

        if (ball.y - ball.size < 0 || ball.y + ball.size >= HEIGHT ) {
            //Piłka jest odbita przez ścianę
            [deltaX, deltaY] = bounce(ball.deltaX, ball.deltaY, OBSTACLES.WALL); 
        }

        if (ball.x + ball.size >= computer.x ) {
            [deltaX, deltaY, isGameOver] = findNewDeltas(ball, computer, player);
        }
        if (ball.x - ball.size <= player.x + player.width) { 
            [deltaX, deltaY, isGameOver] = findNewDeltas(ball, player, computer);
        }
        if (deltaX && deltaY) {
            ball.changeDeration(deltaX, deltaY);
        }

        playerScore.textContent = player.getScore().toString(); 
        computerScore.textContent = computer.getScore().toString();
        
        if (!isGameOver) {
            requestAnimationFrame(render);
        }
    }

    render();
}



