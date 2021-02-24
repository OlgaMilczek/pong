export const WIDTH = window.innerWidth * 0.8;
export const HEIGHT = WIDTH * 0.5;

export const BALL_SIZE = 30;
export const INITIAL_VELOCITY = 4;
export const MAX_VELOCITY = 12;

export const RACKET_SIZE = 180;
export const RACKET_WEIGHT = 10;
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