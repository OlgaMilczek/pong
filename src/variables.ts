export const WIDTH = window.innerWidth * 0.8;
export const HEIGHT = WIDTH * 0.5;

export const BALL_SIZE = 20;
export const INITIAL_VELOCITY = 8;
export const MAX_VELOCITY = 20;

export const RACKET_SIZE = 180;
export const RACKET_WEIGHT = 20;
export const RACKET_OFFSET = 80;

export const TOLERANCE = 20;

export enum OBSTACLES {
    'WALL' = 0,
    'RACKET' = 1,
}

export enum DIRECTIONS {
    'UP' = 1,
    'DOWN' = -1,
};

export enum PLAYERS {
    'PLAYER',
    'COMPUTER',
    'NONE'
};