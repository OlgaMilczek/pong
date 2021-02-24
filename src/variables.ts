export const WIDTH = window.innerWidth - 5;
export const HEIGHT = window.innerHeight - 5;
export const BALL_SIZE = 30;
export const RACKET_SIZE = 180;
export const RACKET_WEIGHT = 10;
export const INITIAL_VELOCITY = 3;
export const RACKET_OFFSET = 100;

export const TOLERANCE = 30;

export enum OBSTACLES {
    'WALL' = 0,
    'RACKET' = 1,
}

export enum DIRECTIONS {
    'UP' = 1,
    'DOWN' = -1,
};