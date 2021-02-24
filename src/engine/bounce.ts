import { OBSTACLES } from '../variables';

export function bounce(
    deltaX: number, 
    deltaY: number, 
    obstacleType: number,
    isMoving : boolean = false
    ) {
    if (obstacleType === OBSTACLES.WALL) {
        return [deltaX, -deltaY];
    } else if (obstacleType ===  OBSTACLES.RACKET) {
        if (isMoving) {
            return [-deltaX, deltaY * 1.5];
        }
        return [-deltaX, Math.sign(deltaY)];
    } else {
        throw new Error('Wrong obstacle type');
    }
};

export function bounceCorner(deltaX: number, deltaY: number, corner: -1 | 1 ) {
    if (corner === Math.sign(deltaY)) {
        return [- deltaX, deltaY * 0.4];
    } else {
        return [- deltaX, deltaY * 2];
    }
}