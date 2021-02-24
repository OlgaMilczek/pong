import './scss/app.scss';

import { Game } from './engine/game';

import { createCanvas, createScore } from './display/renderHelperFunctions';

import {
    WIDTH,
    HEIGHT,
    BALL_SIZE ,
    RACKET_SIZE,
    RACKET_WEIGHT, 
    INITIAL_VELOCITY,
    RACKET_OFFSET } from './variables';

const canvas = createCanvas(WIDTH, HEIGHT);
const [scoreEl, playerScore, computerScore ] = createScore();
const ctx = canvas.getContext('2d');

if (ctx && scoreEl) {
    const game = new Game (
        WIDTH,
        HEIGHT,
        BALL_SIZE,
        RACKET_SIZE,
        RACKET_OFFSET,
        RACKET_WEIGHT, 
        INITIAL_VELOCITY);

    playerScore.textContent = game.getPlayerScore();
    computerScore.textContent = game.getComputerScore();

    document.addEventListener('keydown', e => game.setEventForMove(e));

    document.addEventListener('keyup', e => game.setEventForMoveStop(e));

    const render = () => {
        game.render(ctx); 

        game.runComputerMove();

        game.checkForBallMoves()

        playerScore.textContent = game.getPlayerScore(); 
        computerScore.textContent = game.getComputerScore();
        
        if ( !game.checkForGameOver() ) {
            requestAnimationFrame(render);
        }
    }
    render();
}