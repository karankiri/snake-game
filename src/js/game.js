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
    document.addEventListener('keyup', (event)=>this.changeDirection(event))
  }

  generateNextPoint() {
    return [Math.floor(Math.random() * this.boxLength),Math.floor(Math.random() * this.boxLength)] ;
  }

  moveSnake() {
    const [x, y] = this.head;
    //console.log("game -> moveSnake -> this.head", this.head)
    console.log("game -> moveSnake -> this.direction", this.direction)
    switch (this.direction) {
      case 0:
        this.head = [x-1, y]
        break;
      case 1:
        this.head = [x, y+1]
        break;
      case 2:
        this.head = [x+1, y]
        break;
      case 3:
        this.head = [x, y-1]
        break;
      default:
        console.log("game -> moveSnake -> this.head before render", this.head)
        break;
    }
    this.snake = [[...this.head], ...this.snake]
    if(!this.eatBlock()) {
      this.snake.pop();
    }
    this.renderSnake()
  }

  startGame() {
    this.snakeSize = 1;
    this.snake = [[...this.generateNextPoint()]];
    this.head = [...this.snake[0]];
    this.renderBlock();
    this.renderSnake();
    this.interval = setInterval(() => {
      this.moveSnake();
    }, 1000, this);
  }

  renderSnake() {
    const [x,y] = this.head;
    if(x < 0 || y < 0 || x >= this.boxLength || y >= this.boxLength) {
      return this.resetGame()
    }
    const boxes = [...document.querySelectorAll(`#${this.gameContainer} .box`)];
    boxes.map((box)=> box.classList.remove('snake'));
    for(let item of this.snake) {
      boxes[(item[0] * this.boxLength + item[1])].classList.add("snake");
    }
  }

  renderBlock() {
    const boxes = [...document.querySelectorAll(`#${this.gameContainer} .box`)];
    boxes.map((box)=> box.classList.remove('block'));
    boxes[(this.block[0] * this.boxLength +this.block[1])].classList.add("block");
  }

  eatBlock() {
    const [headX, headY] = this.head;
    const [blockX, blockY] = this.block;
    if(headX === blockX && headY === blockY) {
      this.block = this.generateNextPoint();
      this.snakeSize += 1;
      this.renderBlock();
      return true
    }
    return false
  }

  resetGame() {
    clearInterval(this.interval)
    alert("Game Over")
  }

  changeDirection(event) {
    switch (event.key) {
      case "ArrowUp":
        this.direction = 0
        break;
      case "ArrowDown":
        this.direction = 2
        break;
      case "ArrowLeft":
        this.direction = 3
        break;
      case "ArrowRight":
        this.direction = 1
        break;
      default:
        break;
    }
  }

  pauseGame() {
    clearInterval(this.interval)
  }

  resumeGame() {
    this.interval = setInterval(() => {
      this.moveSnake();
    }, 1000, this);
  }
      
}