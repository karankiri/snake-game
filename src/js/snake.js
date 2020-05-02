export default class Snake {
  constructor(boxLength = 10, gameContainer='game-container') {
    this.snakeSize = 0;
    this.snake = [];
    this.direction = 0;
    this.head = []
    this.gameContainer = gameContainer;
    this.boxLength = boxLength;
    document.addEventListener('keyup', (event)=>this.changeDirection(event))
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
    this.snake = [[...this.head], ...this.snake];
  }

  renderSnake() {
    const boxes = [...document.querySelectorAll(`#${this.gameContainer} .box`)];
    boxes.map((box)=> box.classList.remove('snake'));
    for(let item of this.snake) {
      boxes[(item[0] * this.boxLength + item[1])].classList.add("snake");
    }
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
}