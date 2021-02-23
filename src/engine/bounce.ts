const OBSTACLES = [
    'wall',
    'racket'
];

export function bounce(
    deltaX: number, 
    deltaY: number, 
    obstacleType: string, 
    isMoving : boolean = false
    ) {
    if (obstacleType === OBSTACLES[0]) {
        return [deltaX, -deltaY];
    } else if (obstacleType ===  OBSTACLES[1]) {
        if (isMoving) {
            return [-deltaX, deltaY * 1.2];
        }
        return [-deltaX, Math.sign(deltaY)];
    } else {
        throw new Error('Wrong obstacle type');
    }
};

export function bounceCorner(deltaX: number, deltaY: number, corner: -1 | 1 ) {
    if (corner === Math.sign(deltaY)) {
        return [- deltaX, deltaY * 0.7];
    } else {
        return [- deltaX, deltaY * 1.4];
    }
}