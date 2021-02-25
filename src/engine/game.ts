import { Ball } from './ball';
import { Racket } from './racket';

import { drawLine } from '../display/renderHelperFunctions';

import { OBSTACLES, TOLERANCE, PLAYERS } from '../variables';

export class Game {
    private ball: Ball;
    private player: Racket; 
    private computer: Racket;
    
    private isGameOver = false;
    private initialDeltas = [1, -1];
    private winner = PLAYERS.NONE;

    constructor(
        private width: number,
        private height: number,
        private ballSize: number,
        private racketSize: number,
        private racketOffset: number,
        private racketWeight: number,
        private initialVelocity: number,
    ) {
        this.ball = new Ball(
            this.width / 2, 
            this.height / 2, 
            this.initialDeltas[0], 
            this.initialDeltas[1], 
            this.ballSize, 
            this.initialVelocity );

        this.player = new Racket(
            this.racketOffset, 
            this.height / 2 - this.racketSize  / 2,
            PLAYERS.PLAYER,
            this.racketSize , 
            this.racketWeight);

        this.computer = new Racket(
            this.width - this.racketOffset,
            this.height / 2 - this.racketSize  / 2,
            PLAYERS.COMPUTER,
            this.racketSize,
            this.racketWeight);
    }

    checkForBallMoves() {
        if (this.ball.y - this.ballSize < 0 || this.ball.y + this.ballSize >= this.height ) {
            //Piłka jest odbita przez ścianę
            this.bounce(null, OBSTACLES.WALL);
            return true;
        }
        if (this.ball.x + this.ballSize >= this.computer.x && this.ball.deltaX > 0) {
            return this.makeMove( this.computer, this.player );;
        }
        if (this.ball.x - this.ballSize <= this.player.x + this.racketWeight && this.ball.deltaX < 0) { 
            return this.makeMove( this.player, this.computer );
        }
        return false;
    }

    getGameOver() {
        return this.isGameOver;
    }

    getComputerScore() {
        return this.computer.getScore().toString();
    }

    getPlayerScore() {
        return this.player.getScore().toString();
    }

    getWinner() {
        return this.winner;
    }

    runComputerMove() {
        if (this.ball.x > this.width / 2 && this.ball.deltaX > 0 ) {
            this.computer.moveComputer(this.height, this.ball.y, this.ball.deltaY );
        }
    }

    setEventForMove = (e: KeyboardEvent ) => {
        if (e.key === 'ArrowDown') {
            if (this.player.y + this.racketSize < this.height) {
                this.player.move(1, this.ball.deltaY);
            }
        } else if (e.key === 'ArrowUp') {
            if (this.player.y > 0) {
                this.player.move(-1, this.ball.deltaY);
            }
        } 
    }
    
    setEventForMoveStop = (e: KeyboardEvent ) => {
        if (e.key === 'ArrowDown') {
            if (this.player.y + this.racketSize < this.height) {
                this.player.setMoveStop();
            }
        } else if (e.key === 'ArrowUp') {
            if (this.player.y > 0) {
                this.player.setMoveStop();
            }
        }
    }

    private bounceCorner(corner: -1 | 1 ) {
        if (corner === Math.sign(this.ball.deltaY)) {
            this.ball.deltaX = -this.ball.deltaX;
            this.ball.deltaY = this.ball.deltaY * 0.4;
            return;
        } else {
            this.ball.deltaX = -this.ball.deltaX;
            this.ball.deltaY = this.ball.deltaY * 2;
            return;
        }
    }
    
    private bounce( currentPlayer: Racket | null, obstacleType: number ) {
        if (obstacleType === OBSTACLES.WALL && currentPlayer === null ) {
            this.ball.deltaY = -this.ball.deltaY;
            return;
        } else if (obstacleType ===  OBSTACLES.RACKET && currentPlayer !== null ) {
            if ( currentPlayer.getIsMoving() ) {
                this.ball.deltaX = -this.ball.deltaX;
                this.ball.deltaY  = 1.5 * this.ball.deltaY;
                return;
            }
            this.ball.deltaX = -this.ball.deltaX, 
            this.ball.deltaY = Math.sign(this.ball.deltaY);
            return;
        } else {
            throw new Error('Wrong obstacle type');
        }
    }
    
    private checkForGameOver( currentPlayer:Racket ) {
        if (currentPlayer.getScore() === 21 ) {
            return true;
        }
        return false;
    }
        
    private findIsCorner = ( currentPlayer: Racket ): number => {
        if (Math.abs((this.ball.y + this.ballSize) - currentPlayer.y) <= TOLERANCE) {
            return 1;
        }
        else if (Math.abs((this.ball.y - this.ballSize) - (this.player.y + this.racketSize)) <= TOLERANCE) {
            return -1;
        }
        return 0;
    }

    private makeMove = ( currentPlayer: Racket, opponent: Racket ) => {
        if (this.ball.y + this.ballSize >= currentPlayer.y && this.ball.y - this.ballSize <= currentPlayer.y + this.racketSize) {
            if (this.findIsCorner( currentPlayer ) === -1) {
                this.bounceCorner( -1 );
            } else if ( this.findIsCorner( currentPlayer ) === 1) {
                this.bounceCorner(1);
            } else {
                this.bounce(currentPlayer, OBSTACLES.RACKET);
            }
            this.ball.increaseVelocity();
            return true;
        } else {
            opponent.increaseScore();
            if ( this.checkForGameOver(opponent) ) {
                this.setGameOver();
                this.setWinner(opponent);
                return false;
            } else {
                //NOWA RUNDA
                this.startNewRound();
                return false;
            }
        }
    }

    private setGameOver() {
        this.isGameOver = true;
    }

    private setWinner( currentPlayer: Racket ) {
        this.winner = currentPlayer.name;
    }

    private startNewRound() {
        this.ball.resetBallPosition(this.width / 2, this.height/ 2);
        this.ball.resetVelocity(this.initialVelocity);
        this.ball.deltaX = -this.ball.deltaX;
        this.ball.deltaY = Math.sign(this.ball.deltaY);
    }

    //Funkcje odpowiedziane za renderowanie
    private drawCourt = (
        ctx: CanvasRenderingContext2D)  =>  {
    
        ctx.fillStyle = 'rgb(60, 68, 64)';
        ctx.fillRect(0, 0, this.width, this.height);
    
        drawLine(ctx, this.width/ 2, this.height, []);
        drawLine(ctx, this.racketOffset + this.racketWeight - 1, this.height, [20, 15]);
        drawLine(ctx, this.width - this.racketOffset + 1, this.height, [20, 15]);
    }

    render(ctx: CanvasRenderingContext2D) {
        this.drawCourt(ctx);

        this.ball.move();

        this.player.render(ctx, 'rgb(71, 33, 30)', 'rgb(85, 43, 40)');
        this.computer.render(ctx,  'rgb(26, 49, 75)', ' rgb(37, 61, 88)');
        this.ball.render(ctx)
    }
}