//Scripting file for the canvas game!
//Author: James March 2021

"use strict";

function getName() { //Function assigns entered name to a variable!
    var x = document.getElementById("name").value;
    if (x == ""){ //If no name is entered, an error message is displayed
        document.getElementById("gameFeedback").innerHTML = ("Please enter your name");
        getName();
    } //Doesnt start game until name is entered
    document.getElementById("gameFeedback").innerHTML = ("");
    return x;

}

function rng(n){ //Quick function to make random num generation easier
    var num = Math.floor((Math.random() * n));
    return num;
}

function drawImage(image, x, y) { //Function to load an image onto canvas
    var imageObj = new Image();  
    imageObj.addEventListener('load', function() {
        ctx.drawImage(imageObj, x, y, 150, 100)
    }, false);
    //Since all images for the game have a standardised format for storage
    //Each image can be accessed by just adjusting the below string path
    imageObj.src = '././media/game/'+image+'.jpg';
}

function drawTriangle(x, y){ //Function to draw the triangle on canvas + border
    ctx.fillStyle = 'white';
    ctx.fillRect(x,y,150,100);
    ctx.strokeRect(x,y,150,100);
    ctx.beginPath();
    ctx.moveTo(x+30,y+70);
    ctx.lineTo(x+120,y+70);
    ctx.stroke();
    ctx.lineTo(x+75,y+30);
    ctx.stroke();
    ctx.lineTo(x+30,y+70);
    ctx.stroke();
    ctx.fillStyle = 'green';
    ctx.fill();   
    ctx.fillStyle = 'black';
}

function drawSquare(x, y){ //Function to draw the square on canvas + border
    ctx.fillStyle = 'white';
    ctx.fillRect(x,y,150,100);
    ctx.strokeRect(x,y,150,100);
    ctx.fillStyle = 'red';
    ctx.fillRect((x+50),(y+25),50,50);
    ctx.strokeRect((x+50),(y+25),50,50);
    ctx.fillStyle = 'black';
}

//Function used to generate 3 random but distinct images on canvas
function generateImages(name){ 
    clear();
    var firstNum = rng(images.length);
    var firstImage = images[firstNum];
    var firstX = rng(150);
    var firstY = rng(500);
    switch(firstNum){ //Different methods called depending on if shape or image
        case(4):
            drawTriangle(firstX,firstY);
            break;
        case(5):
            drawSquare(firstX,firstY);
            break;
        default:
            drawImage(firstImage, firstX, firstY);
            break;
    }
    do{
        var secondNum = rng(images.length);
    } while (secondNum == firstNum); //While loop ensures images aren't same
    var secondImage = images[secondNum];
    var secondX = rng(150);
    //Below loop ensures that images will not overlap!
    do{
        var secondY = rng(500);
    } while ((secondY >=  (firstY-100)) && (secondY <= (firstY+100)));
    switch(secondNum){
        case(4):
            drawTriangle(secondX,secondY);
            break;
        case(5):
            drawSquare(secondX,secondY);
            break;
        default:
            drawImage(secondImage, secondX, secondY);
            break;
    }
    do{
        var thirdNum = rng(images.length);
    } while ((thirdNum == firstNum) || (thirdNum == secondNum));
    var thirdImage = images[thirdNum];
    var thirdX = rng(150);
    //Same idea as anti-overlapping while loop for two images but amount of 
    //comparison grows exponentially for each image added, thus the extra lines
    while (true){
        var thirdY = rng(500);
        if(
            ((thirdY <= (secondY-100)) && (thirdY <= (firstY-100))) || //above both
            ((thirdY >= (secondY+100)) && (thirdY >= (firstY+100))) || //below both
            ((thirdY >= (firstY+100)) && (thirdY <= (secondY-100))) || //below first, above second
            ((thirdY >= (secondY+100)) && (thirdY <= (firstY-100)))    //below second, above first
            ){
                break;
        }
    }  
    switch(thirdNum){
        case(4):
            drawTriangle(thirdX,thirdY);
            break;
        case(5):
            drawSquare(thirdX,thirdY);
            break;
        default:
            drawImage(thirdImage, thirdX, thirdY);
            break;
    }

    var selection = rng(2); //Picks a random image to be the correct answer
    //The case switch assigns vars used when detecting the (in)correct selection
    switch (selection){
        case (0):
            chosenImage = firstImage;
            chosenX = firstX;
            chosenY = firstY;
            firstWrongX = secondX;
            firstWrongY = secondY;
            secondWrongX = thirdX;
            secondWrongY = thirdY;
            break;
        case (1):
            chosenImage = secondImage;
            chosenX = secondX;
            chosenY = secondY;
            firstWrongX = firstX;
            firstWrongY = firstY;
            secondWrongX = thirdX;
            secondWrongY = thirdY;
            break;
        case (2):
            chosenImage = thirdImage;
            chosenX = thirdX;
            chosenY = thirdY;
            firstWrongX = firstX;
            firstWrongY = firstY;
            secondWrongX = secondX;
            secondWrongY = secondY;
            break;
    }
    //Lets the user know what image they are expected to click
    document.getElementById("gameFeedback").innerHTML = (name + ", click on the " + chosenImage);
}

//This function is used to check if the user clicked on an image
function checkClick(evt, chosenX, chosenY, firstWrongX, firstWrongY, secondWrongX, secondWrongY, name){
        var pos = getMouseXY(evt);
        var correct = checkContained(pos.x, pos.y, chosenX, chosenY);
        var wrong = (checkContained(pos.x, pos.y, firstWrongX, firstWrongY) 
            || checkContained(pos.x, pos.y, secondWrongX, secondWrongY));
        if (correct || wrong){ //If either a wrong or correct answer is chosen
            answer = correct;
            nextQuestion(answer, name) //returns the answer to the next question
        }
        if (answer == null){ //loops this function until an image is selected
            checkClick(evt, chosenX, chosenY, firstWrongX, firstWrongY, secondWrongX, secondWrongY);
        }
}

//This function defines the screen used when a player submits an answer
function nextQuestion(answer, name){ 
    canvas.removeEventListener('click', function(evt) { checkClick(evt, chosenX, chosenY, firstWrongX, firstWrongY, secondWrongX, secondWrongY, name); });
    document.getElementById("canvas").style.display = "none";
    document.getElementById("gameFeedback").innerHTML = ("Feedback:"); //remove the prompt telling player what to do
    count ++; //Increments the round counter
    document.getElementById("feedback").style.display = "block";
    if (count == 3){ //Special case to be used once game is over
        document.getElementById("questionFeedbackTwo").innerHTML = ("Click to end game");
        document.getElementById("nextQuestion").style.display = "none";
        document.getElementById("endGame").style.display = "block";
    }
    else{ //Otherwise user is redirected to next question
        document.getElementById("questionFeedbackTwo").innerHTML = ("Click to go to next question");
        document.getElementById("nextQuestion").style.display = "block";
        document.getElementById("endGame").style.display = "none";
    }
    //selection statement defines response to user based on their answer
    if (answer){ 
        score++;
        document.getElementById("questionFeedback").innerHTML =('Well done '+
        name + ', you got the correct answer' +'<br>' + 'Your score is '+
        score + '/' + count); //Also gives them their current score
    }
    else{
        document.getElementById("questionFeedback").innerHTML =('Unlucky ' +
         name + ', ' + 'you got the incorrect answer <br> Your score is '+
         score + '/' + count);
    }

}

//This function checks if a click is inside an image
function checkContained(clickX, clickY, borderX, borderY) {
    return (((clickX >= borderX) && (clickX <= (borderX+150))) && ((clickY >= borderY) && (clickY <= (borderY+100))));
  }

//Function used to display canvas initially and remove name input
function showCanvas(){
    document.getElementById("canvas").style.display = "block";
    document.getElementById("gameInput").style.display = "none";
}

//Get mouse function written by Dr Steve Maddock
function getMouseXY(e) {
    var canvas = document.getElementById('canvas');
    var boundingRect = canvas.getBoundingClientRect();
    var offsetX = boundingRect.left;
    var offsetY = boundingRect.top;
    var w = (boundingRect.width-canvas.width)/2;
    var h = (boundingRect.height-canvas.height)/2;
    offsetX += w;
    offsetY += h;
    // use clientX and clientY as getBoundingClientRect is used above
    var mx = Math.round(e.clientX-offsetX);
    var my = Math.round(e.clientY-offsetY);
    return {x: mx, y: my};
}

//Function used to clear the canvas
function clear(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }

//Function that defines what happens at the end of a game
function endGame(name){
    //changes a load of elements to prepare the feedback screen
    document.getElementById("reset").style.display = "block"; //Reset button!
    //also removes all event listeners for the canvas
    canvas.removeEventListener('click', function(evt) { checkClick(evt, chosenX, chosenY, firstWrongX, firstWrongY, secondWrongX, secondWrongY, name); });
    document.getElementById("canvas").style.display = "none";
    document.getElementById("gameFeedback").innerHTML = ("Results:"); //remove the prompt telling player what to do
    document.getElementById("feedback").style.display = "block";
    document.getElementById("nextQuestion").style.display = "none";
    document.getElementById("endGame").style.display = "none";
    document.getElementById("questionFeedback").innerHTML = ("Your final score was " + score + "/" + count)
    //Defines feedback to user, informal as it is intended for children
    switch (score){
        case 0:
            document.getElementById("questionFeedbackTwo").innerHTML = ("Ouch... better luck next time " + name);
            break;
        case 1:
            document.getElementById("questionFeedbackTwo").innerHTML = ("Unlucky, you're on the right track though " + name);
            break;
        case 2:
            document.getElementById("questionFeedbackTwo").innerHTML = ("Sooooo close! you can do it " + name);
            break;
        case 3:
            document.getElementById("questionFeedbackTwo").innerHTML = ("Perfect score! Incredible work " + name);
            break;
    }


}

//Defines what happens when reset button is pressed
function reset() {
    count = 0; //Resets the count and score variables
    score = 0;
    document.getElementById("reset").style.display = "none"; //Hides reset btn
    startGame(); //Restarts the game, assumes name stays the same
}

//Defines what happens when a name is entered
function startGame() {
    document.getElementById("feedback").style.display = "none"; 
    if (count == 3){ //If round 3 is done, the game is ended
        var name = getName();
        endGame(name);
        return;
    }
    else{
        var name = getName(); //Assign user name to a variable
        showCanvas(); //Show the canvas
        clear(); //Clear it (if anything was on before it)
        generateImages(name); //Generate images on the canvas
        //Then add a listener for the images being clicked on...
        canvas.addEventListener('click', function(evt) {(checkClick(evt, chosenX, chosenY, firstWrongX, firstWrongY, secondWrongX, secondWrongY, name)); });
        
    }
}

//Global variables used
//Used by most functions so little to no point making local
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); 
//Array of all possible images on canvas
const images = ["bird", "cat", "dog", "fish", "triangle", "square"];
const selected = [0];
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
var count = 0;
var score = 0;
var loopDone = false;
var chosenImage, chosenX, chosenY, firstWrongX, firstWrongY, secondWrongX, secondWrongY, answer; 
ctx.lineWidth = 2; 
ctx.fillStyle = 'black';