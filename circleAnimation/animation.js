//javascript for animation.html
var obArray = [];
var x = 0;
var rate;
function setup() {
	var cvs = createCanvas(windowWidth * 0.6, windowHeight * 0.6);
	cvs.position(0, 65);
	rate = createSlider(1, 20, 1);
	rate.position(0, height + 85);
}
function Circle() {
	this.x = mouseX;
	this.y = mouseY;
	this.diameter = 0;
	this.col = color(random(255), random(255), random(255));
	this.move = function() {
		this.diameter += rate.value();
	}
	this.display = function() {
		fill(this.col);
		ellipse(this.x, this.y, this.diameter, this.diameter)	
	}
}

function mousePressed() {
	if (mouseX <= width & mouseY <= height) {
		var c = new Circle;
		obArray.push(c);
	}
}

function draw() {
	background(217, 224, 221);	
	for(var i = 0; i < obArray.length; i++) {
		obArray[i].display();
		obArray[i].move();		
	}
}
