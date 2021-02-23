import { Ball } from './ball';
import { Racket } from './racket';

import { bounce, bounceCorner } from './bounce';
import { OBSTACLES, INITIAL_VELOCITY, WIDTH, HEIGHT, TOLERANCE } from '../variables';

export const findNewDeltas = (ball: Ball, player: Racket, opponent: Racket): [number| undefined, number| undefined, boolean] => {
    let deltaX: number;
    let deltaY: number;

    if (ball.y + ball.size >= player.y && ball.y - ball.size <= player.y + player.size) {
        if (findIsCorner(ball, player) === -1) {
            [deltaX, deltaY] = bounceCorner(ball.deltaX, ball.deltaY, -1);
        } else if (findIsCorner(ball, player) === 1) {
            [deltaX, deltaY] = bounceCorner(ball.deltaX, ball.deltaY, 1);
        } else {
            [deltaX, deltaY] = bounce(ball.deltaX, ball.deltaY, OBSTACLES[1], player.getIsMoving());
        }
        ball.increaseVelocity();
    } else {
        opponent.increaseScore();
        if (opponent.getScore() === 21 ) {
            return [undefined, undefined, true];
        } else {
            //NOWA RUNDA
            ball.resetBallPosition(WIDTH/ 2, HEIGHT/ 2);
            ball.resetVelocity(INITIAL_VELOCITY);
            deltaX = -ball.deltaX;
            deltaY = Math.sign(ball.deltaY);
        }
    }
    return [deltaX, deltaY, false];
}

const findIsCorner = (ball: Ball, player: Racket): number => {
    if (ball.y - ball.size - TOLERANCE <= player.y && ball.y + ball.size + TOLERANCE <= player.y ) {
        console.log(2);
        //Górny narożnik nie działa!!!
        return 1;
    }
    else if (ball.y + ball.size + TOLERANCE >= player.y + player.size && ball.y - ball.size + TOLERANCE <= player.y +  player.size) {
        return -1;
    }
    return 0;
}