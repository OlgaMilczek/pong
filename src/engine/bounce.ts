const OBSTACLES = [
    'wall',
    'racket'
];

const ballDeltaX = 1; 
const ballDeltaY = 1;

export function checkCollisions(
    ballX: number, 
    ballY: number, 
    ballRadius: number, 
    width: number, 
    height: number,
    playerRacketX: number, 
    playerRacketY: number,
    computerRacketX: number, 
    computerRacketY: number,
    rocketSize: number) {

    let newDeltaX: number; 
    let newDeltaY: number;
    const isBetweenRockets: boolean = (ballX + ballRadius < computerRacketX) && (ballX - ballRadius > playerRacketX); 


    if (ballY - ballRadius <= 0 && isBetweenRockets) {
        //Piłka jest odbita przez ścianę
        [newDeltaX, newDeltaY] = bounce(ballDeltaX, ballDeltaY, OBSTACLES[0]); 
    } else if (ballY + ballRadius >= height && isBetweenRockets) {
        [newDeltaX, newDeltaY] = bounce(ballDeltaX, ballDeltaY, OBSTACLES[0]); 
    } else if (ballX + ballRadius <= computerRacketX ) {
        if (ballY - ballRadius > computerRacketY && ballY + ballRadius < computerRacketY + rocketSize) {
            [newDeltaX, newDeltaY] = bounce(ballDeltaX, ballDeltaY, OBSTACLES[1]); 
        } else {
            //PUNKY DLA GRACZA.
            //SPRAWDZANIE CZY KTOŚ WYGRAŁ 
            //JEŚLI TAK TO KONIEC GRY. 
            //JEŚLI NIE TO NOWA RUNDA.
        }
    } else if (ballX + ballRadius <= playerRacketX ) {
        if (ballY - ballRadius > playerRacketY && ballY + ballRadius < playerRacketY + rocketSize) {
            [newDeltaX, newDeltaY] = bounce(ballDeltaX, ballDeltaY, OBSTACLES[1]); 
        } else {
            //PUNKY DLA KOMPUTERA.
            //SPRAWDZANIE CZY KTOŚ WYGRAŁ 
            //JEŚLI TAK TO KONIEC GRY. 
            //JEŚLI NIE TO NOWA RUNDA.
        }
    }
    //TO DO: Przekazanie nowych delty do piłki.
};

export function bounce(
    deltaX: number, 
    deltaY: number, 
    obstacleType: string
    ) {
    if (obstacleType === OBSTACLES[0]) {
        return [deltaX, -deltaY];
    } else if (obstacleType ===  OBSTACLES[1]) {
        return [-deltaX, deltaY];
    } else {
        throw new Error('Wrong obstacle type');
    }
};