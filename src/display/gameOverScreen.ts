import { PLAYERS } from '../variables';

export function showGameOverScreen(
        container: HTMLElement,
        button: HTMLElement,
        canvas: HTMLElement,
        scoreEl: HTMLElement,
        winner: PLAYERS, 
        cb: Function) {
    container.classList.toggle('inactive');
    const heading = container.querySelector('h1');
    const headingSecondary = container.querySelector('h2');
    
    if (heading !== null && headingSecondary !== null ) {
        if ( winner === PLAYERS.PLAYER ) {
            heading.textContent = 'Congratulations!';
            headingSecondary.textContent = 'Do you want to play again?';
            button.textContent = 'Play again';
        } else {
            heading.textContent = 'Game over';
            headingSecondary.textContent = 'Do you want to try again?';
            button.textContent = 'Retry';
        }
    }

    function handleClick() {
            container.classList.toggle('inactive');
            cb();
            canvas.remove();
            scoreEl.remove();
            button.removeEventListener('click', handleClick);
    }

    button.addEventListener('click', handleClick);
}
