import Snake from './snake';
export default class game {

  constructor(boxLength = 10, gameContainer='game-container') {
    this.dataPoints = [...Array(boxLength)].map(x=>Array(boxLength).fill(0));
    this.gameContainer = gameContainer;
    this.boxLength = boxLength;
    this.block = this.generateNextPoint();
    this.interval = null;
    this.snake = new Snake(boxLength, gameContainer);
  }

  generateNextPoint() {
    return [Math.floor(Math.random() * this.boxLength),Math.floor(Math.random() * this.boxLength)] ;
  }

  initGame() {
    const boardSize = this.boxLength * this.boxLength;
    const gameContainer = document.getElementById(this.gameContainer)
    const boxes =  `<div class='box'></div>`.repeat(boardSize);
    gameContainer.innerHTML = boxes
    const head = this.generateNextPoint();
    this.snake.initSnake([...head]);
    this.renderBlock();
    this.snake.renderSnake();
  }

  startGame() {
    this.interval = setInterval(() => {  
      if(!this.snake.moveSnake()) {
        return this.resetGame()
      }
      if(!this.eatBlock()) {
        this.snake.removeTail();
      }
      this.snake.renderSnake();
    }, 1000, this);
  }

  renderBlock() {
    const boxes = [...document.querySelectorAll(`#${this.gameContainer} .box`)];
    boxes.map((box)=> box.classList.remove('block'));
    boxes[(this.block[0] * this.boxLength +this.block[1])].classList.add("block");
  }

  eatBlock() {
    const [headX, headY] = this.snake.head;
    const [blockX, blockY] = this.block;
    if(headX === blockX && headY === blockY) {
      this.block = this.generateNextPoint();
      this.snake.snakeSize += 1;
      this.renderBlock();
      return true
    }
    return false
  }

  resetGame() {
    clearInterval(this.interval)
    alert("Game Over")
  }

  pauseGame() {
    clearInterval(this.interval)
  }
      
}