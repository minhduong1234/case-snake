const canvas = document.getElementById("cv");
const game_width = 600;
const UNIT = 30;
const Snake_Color = "white";
canvas.width = canvas.height = game_width;
const ctx = canvas.getContext('2d');
const Background_Color = 'black';
ctx.fillStyle = Background_Color;
ctx.fillRect(0, 0, game_width, game_width);
const GAME_DELAY = 100;

const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40



class vector2d {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

let currentDirection = new vector2d(-1, 0)
  
  
class Snake {
    constructor() {
        this.body = [
            new vector2d(UNIT * 6, UNIT * 3),
            new vector2d(UNIT * 7, UNIT * 3),
            new vector2d(UNIT * 8, UNIT * 3),

        ]
        this.head = this.body[0]
        this.speed = new vector2d(-1, 0)
      
    }
    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.body[0].x, this.body[0].y, UNIT, UNIT);
        ctx.fillStyle = Snake_Color
        for (let i = 1; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, UNIT, UNIT);
        }
        
    }

    clear() {
        ctx.fillStyle = Background_Color;
        ctx.fillRect(this.body[0].x, this.body[0].y, UNIT, UNIT);
        ctx.fillStyle = Background_Color
        for (let i = 1; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, UNIT, UNIT);
        }
    }
    handleBound () {
        if(this.head.x < 0) {
            this.head.x = game_width - UNIT
        }
        if (this.head.x > game_width - UNIT) {
            this.head.x = 0
        }
        if(this.head.y < 0) {
            this.head.y = game_width - UNIT
        }
        if (this.head.y > game_width - UNIT) {
            this.head.y = 0
        }
    }
    

    move() {
        this.clear()

        for (let i = this.body.length - 1; i >= 1; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        this.body[0].x += this.speed.x * UNIT;
        this.body[0].y += this.speed.y * UNIT;
        this.handleBound()

        this.draw()

    }
    checkEat(food) {
        let head = this.body[0]
        return food.x === head.x && food.y === head.y
    }

    grow() { 
        this.clear()
        // tăng thêm chiều dài cho răn
        let snakeLength = this.body.length
        let mountX = this.body[snakeLength - 1].x -this.body[snakeLength - 2 ].x
        let mountY = this.body[snakeLength - 1].y -this.body[snakeLength - 2 ].y

        let newPart = new vector2d(
            this.body[snakeLength - 1].x + mountX,
            this.body[snakeLength - 1].y + mountY,

        )
        this.body.push(newPart) 
            this.draw()
    }
    
}

class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, UNIT, UNIT)
    }
    clear() {
        ctx.fillStyle = Background_Color;
        ctx.fillRect(this.x, this.y, UNIT, UNIT)
    }

    getRandomNumber() {
        let randomNumber = Math.floor(Math.random() * game_width)
        randomNumber -= randomNumber % UNIT
        return randomNumber
    }
    spawn() {
        this.clear()
        this.x = this.getRandomNumber()
        this.y = this.getRandomNumber()
        this.draw()

    }
   
}

let player = new Snake()
player.draw()
let food = new Food()
food.spawn()



setInterval(() => {
    player.move()
    if (player.checkEat(food)) {
        player.grow()
        food.spawn()
    }

}, GAME_DELAY);

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case LEFT:
            if (currentDirection.x === 1) break
            player.speed = new vector2d(-1, 0)
            currentDirection = new vector2d(-1, 0)
            break;
        case RIGHT:
            if (currentDirection.x === -1) break
            player.speed = new vector2d(1, 0)
            currentDirection = new vector2d(1, 0)
            break;
        case UP:
            if (currentDirection.y === 1) break
            player.speed = new vector2d(0, -1)

            currentDirection = new vector2d(0, -1)
            break;
        case DOWN:
            if (currentDirection.y === -1) break
            player.speed = new vector2d(0, 1)
            currentDirection = new vector2d(0, 1)
            break;
        default:
            break;
    }
}