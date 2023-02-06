var blockSize = 25;
var row = 20;
var col = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 9;

//velocity
var velocityX = 0;
var velocityY = 0;

//snake body
var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("gameBoard");
    board.height = row * blockSize;
    board.width = col * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000/10); //100 milliseconds 

}

function update() {
    if (gameOver) {
        return
    } 

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    //for making it longer body
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    } 
    if (snakeBody.length) {
         snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize ;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize); 
    }
    
    //game over conditions
    if (snakeX < 0 || snakeX > col*blockSize || snakeY < 0 || snakeY > row*blockSize) {
        gameOver = true;
        alert("game over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody == [i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("game over");
        }
    }

}
 
//change direction  
function changeDirection(e) {
     if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
     }
     else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
     }
     else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
     }
     if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
     } 
}


function placeFood() {
    //Math(0-1) * col -> (0-19.999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * col) * blockSize;
    foodY = Math.floor(Math.random() * row) * blockSize;
} 