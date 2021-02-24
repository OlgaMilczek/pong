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
    RACKET_OFFSET,
    PLAYERS } from './variables';

const [scoreEl, playerScore, computerScore ] = createScore();
const canvas = createCanvas(WIDTH, HEIGHT);
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

    const audio = new Audio(require('./assets/ball_hit.wav'));
    const gameOverSound = new Audio(require('./assets/game_over.wav'));
    const applause = new Audio(require('./assets/applause.wav'));

    const render = () => {
        game.render(ctx); 

        game.runComputerMove();

        const isMoveMade = game.checkForBallMoves(); 

        if (isMoveMade) {
            audio.play();
        }

        playerScore.textContent = game.getPlayerScore(); 
        computerScore.textContent = game.getComputerScore();
        
        if ( !game.getGameOver() ) {
            requestAnimationFrame(render);
        }

        else if (game.getGameOver() ) {
            if (game.getWinner() === PLAYERS.PLAYER ) {
                applause.play();
            } else {
                gameOverSound.play();
            }
        }
    }
    render();
}