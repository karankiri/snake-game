import '../css/index.scss';
import game from './game';
document.addEventListener("DOMContentLoaded", function(event) {
  let newGame = new game(10, 'game-container');
  document.getElementById('reset').onclick = () => {
    newGame.initGame();
  }

  document.getElementById('play').onclick = (event) => {
    const text = event.target.innerText;
    if(text === 'Play') {
      event.target.innerHTML = 'Pause'
      newGame.startGame();
    } else {
      event.target.innerHTML = 'Play'
      newGame.pauseGame();
    }
  }
});