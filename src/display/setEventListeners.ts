import { Racket } from '../engine/racket';
import { Ball } from '../engine/ball';

export const setEventForMove = (e: any, player: Racket, ball:Ball, height: number) => {
    if (e.key === 'ArrowDown') {
        if (player.y + player.size < height) {
            player.move(1, ball.deltaY);
        }
    } else if (e.key === 'ArrowUp') {
        if (player.y > 0) {
            player.move(-1, ball.deltaY);
        }
    } 
}

export const setEventForMoveStop = (e: any, player: Racket, ball: Ball, height: number) => {
    if (e.key === 'ArrowDown') {
        if (player.y + player.size < height) {
            player.setMoveStop();
        }
    } else if (e.key === 'ArrowUp') {
        if (player.y > 0) {
            player.setMoveStop();
        }
    }
}