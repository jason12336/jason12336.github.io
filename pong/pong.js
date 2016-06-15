//javascript for pong.html

var playerScore = computerScore = 0;
var obArray = [];
var start = 0;
function setup() {
	var cnv = createCanvas(550, 450);
	cnv.position(windowWidth / 2 - 275, 85);
	var b = new Ball;
	obArray.push(b);
	var c = new Computer;
	obArray.push(c);
	var s = createButton('Start');
	s.position(windowWidth / 2 - 330, 300);
	s.mousePressed(buttonStart);
}

function buttonStart() {
		start = 1;
}

function Ball() {
	this.x = random(10, width - 10);
	this.y = random(100, height / 2);
	this.dx = this.dy = 6;
	this.diameter = 20;
	this.display = function() {
		noStroke();
		fill(255);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}
	this.move = function() {
		if (this.x <= 0 + this.diameter / 2 | this.x >= width - this.diameter / 2) {
			this.dx = -this.dx;
		}
		else if (this.y >= height - this.diameter / 2) {
			computerScore++;
			console.log(computerScore);
			this.dy = -this.dy;
			reset();
		}
		else if (this.y <= 0 + this.diameter / 2) {
			playerScore++;
			console.log(playerScore);
			this.dy = -this.dy;
			reset();
		}

		this.x += this.dx;
		this.y += this.dy;
	}
}		

function reset() {
	var ball = obArray[0];
	ball.x = random(10, width - 10);
	ball.y = random(100, height / 2);
}

function Computer() {
	this.length = 80;
	this.width = 15;
	this.x = width / 2;
	this.y = 10;
	this.move = function() {
		if (obArray[0].x > this.x + this.length / 2 && obArray[0].y <= height / 2) {
			this.dx = 8; 
			this.x += this.dx;
		}
		if (obArray[0].x < this.x + this.length / 2 && obArray[0].y <= height / 2) {
			this.dx = -8;
			this.x += this.dx
		}
	}
	this.display = function() {
		fill(255);
		noStroke();
		rect(this.x, this.y, this.length, this.width);
	}
}

function checkCollision() {
	var ball = obArray[0];
	var computer = obArray[1];	
	if (ball.x >= mouseX && ball.x <= mouseX + 80 && ball.y >= height - 25 - ball.diameter / 2) {
		ball.dy = -ball.dy;
	}
	else if (ball.x >= computer.x && ball.x <= computer.x + 80 && ball.y <= 25 + ball.diameter / 2) {
		ball.dy = -ball.dy;
	}
}

function mousePressed() {
	reset();
}

function keyTyped() {
	if (key === 's' && start == 0) {
		start = 1;
	}
	else if (key === 's' && start == 1){
		start = 0;
	}
}

function checkScore() {
	if (computerScore == 10) {
		alert('You lose');
		location.reload();
	}
	else if (playerScore == 10) {
		alert('You win');
		location.reload();
	}
}
		

function draw() {
	background(0);
	checkScore();
	if (start) {
		for (var i = 0; i < obArray.length; i++) {
			obArray[i].display();
			obArray[i].move();
		}
		fill(255);
		noStroke();
		rect(mouseX, height - 25, 80, 15);
		checkCollision();
		fill(255);
		textSize(30);
		text(playerScore, width / 2 - 10, height / 2 + 100);
		text(computerScore, width / 2 - 10, height / 2 - 100);
		stroke(255);
		strokeWeight(5);
		line(0, height / 2, width, height / 2);	
	}
	else {
		background(0);
		fill(255);
		textSize(30);
		text(playerScore, width / 2 - 10, height / 2 + 100);
		text(computerScore, width / 2 - 10, height / 2 - 100);
		text('PRESS (S)', width / 2 - 75, height / 2 - 50);
		text('TO START', width / 2 - 75, height / 2 + 50);
		stroke(255);
		strokeWeight(5);
		line(0, height / 2, width, height / 2);
	}
}
