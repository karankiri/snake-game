import '../css/index.scss';
import game from './game';
document.addEventListener("DOMContentLoaded", function(event) {
  // Your code to run since DOM is loaded and ready
  console.log("hello world!!!");
  const boardSize = 10 * 10;
  const gameContainer = document.getElementById('game-container')
  // const documentFragment = document.createDocumentFragment();
  // for(let i=0; i < boardSize; i++) {
  //   const boxItem = document.createElement("div");
  //   boxItem.className = "box";
  //   documentFragment.appendChild(boxItem);
  // }
  //gameContainer.append(documentFragment)
  const boxes =  `<div class='box'></div>`.repeat(boardSize);
  gameContainer.innerHTML = boxes
  const newGame = new game(10, 'game-container');
  newGame.startGame()
});