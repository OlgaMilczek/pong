import { Racket } from '../engine/racket';

export const addEventForMove = (e: any, player: Racket, height: number) => {
    if (e.key === 'ArrowDown') {
        if (player.y + player.size < height) {
            player.move(1);
        }
    } else if (e.key === 'ArrowUp') {
        if (player.y > 0) {
            player.move(-1);
        }
    } 
}

export const addEventForMoveStop = (e: any, player: Racket, height: number) => {
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