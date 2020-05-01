export default class game {

  constructor(boxLength = 10, gameContainer='game-container') {
    this.boxLength = boxLength;
    this.dataPoints = [...Array(boxLength)].map(x=>Array(boxLength).fill(0));
    this.snakeSize = 0;
    this.snake = [];
    this.gameContainer = gameContainer;
    this.direction = 0;
    this.block = this.generateNextPoint();
    this.interval = null;
  }

  generateNextPoint() {
    return [Math.floor(Math.random() * this.boxLength),Math.floor(Math.random() * this.boxLength)] ;
  }

  moveSnake() {
    const [x, y] = this.head;
    console.log("game -> moveSnake -> this.head", this.head)
    switch (this.direction) {
      case 0:
        this.head = [x-1, y]
      case 1:
        this.head = [x, y+1]
      case 2:
        this.head = [x-1, y]
      case 3:
        this.head = [x, y-1]
      default:
        console.log("game -> moveSnake -> this.head before render", this.head)
        this.renderSnake()
        if(x < 0 || y < 0 || x >= this.boxLength || y >= this.boxLength) {
          this.resetGame()
        }
        break;
    }
  }

  startGame() {
    this.snakeSize = 1;
    this.snake = this.generateNextPoint();
    this.head = [...this.snake];
    this.renderBlock();
    this.renderSnake();
    this.interval = setInterval(() => {
      this.moveSnake();
    }, 1000, this);
  }

  renderSnake() {
    const boxes = document.querySelectorAll(`#${this.gameContainer} .box`);
    boxes[(this.head[0]+this.head[1])* this.boxLength].classList.add("snake");
  }

  renderBlock() {
    const boxes = document.querySelectorAll(`#${this.gameContainer} .box`);
    boxes[(this.block[0]+this.block[1])*this.boxLength].classList.add("block");
  }

  resetGame() {
    clearInterval(this.interval)
    alert("Game Over")
    console.log("game -> resetGame -> Game Over",)
  }
}