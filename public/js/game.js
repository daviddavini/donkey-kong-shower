//import { text } from "express";

//import { text } from "express";

let synth, soundLoop;
let gameState = 'MENU';
let notePattern = [
62, 62, 74, 74, 69, 69, 69, 68,
68, 67, 67, 65, 65, 62, 65, 67,
60, 60, 74, 74, 69, 69, 69, 68,
68, 67, 67, 65, 65, 62, 65, 67,
59, 59, 74, 74, 69, 69, 69, 68,
68, 67, 67, 65, 65, 62, 65, 67,
58, 58, 74, 74, 69, 69, 69, 68,
68, 67, 67, 65, 65, 62, 65, 67];


class Player {
  constructor(name, score) {
      this.name = name;
      this.score = score;
  }
}

//estabilish musical notes bar for the players to see the notes (keys) they need to hit for points 
var musicalnotesbar =function(x,y) {
  this.x=x;
  this.y=y;
};

//the musical notes bar is being shown on the canvas
musicalnotesbar.prototype.draw=function() {
  fill(28, 27, 24);
  rectMode(CENTER);
  rect(this.x,this.y, 400, 50);
};

let button;
let bruh, crash, kick, snare, hihat, metronome;

function preload() {
  bruh = loadSound('../audio/bruh.mp3');
  crash = loadSound('../audio/crash.mp3');
  kick = loadSound('../audio/kick.mp3');
  snare = loadSound('../audio/snare.mp3');
  hihat = loadSound('../audio/hihat.wav');
  metronome = loadSound('../audio/metronome-click.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  button = createImg('../img/blursed_donkey_kong.jpg');
  button.size(100, 100);
  button.position(windowWidth / 2, windowHeight / 2);
  button.center();
  button.mousePressed(changeBG);
  let beatsPerMinute = 100;
  let intervalInSeconds = 60 / beatsPerMinute;
  soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);
}

function changeBG() {
  let val = color(random(60), random(60), random(60));
  background(val);
  bruh.play();
  gameState = 'ACTUAL_GAME';
  button.hide();
  soundLoop.start();
}

function draw() {
  switch (gameState)
  {
    case 'MENU':
      background(30);
      fill(255);
      textSize(40);
      textAlign(CENTER, CENTER);
      text("Donkey Kong Shower!", windowWidth / 2, windowHeight * 0.15);
      textSize(20);
      text("Click the image to play.", windowWidth / 2, windowHeight * 0.25);
      break;
    case 'ACTUAL_GAME':
      background(255);
      fill(0);
      textSize(16);
      text("W = Hi-Hat / A = Snare / S = Kick / D = Crash / M = Mute Metronome", windowWidth / 2, 50);
      var sample_bar = new musicalnotesbar(windowWidth / 2, 100);
      sample_bar.draw();
      break;
  }
}

function keyPressed() {
  if (gameState === 'ACTUAL_GAME') {
    switch (key) {
      case 'w':
        hihat.play();
        break;
      case 'a':
        snare.play();
        break;
      case 's':
        kick.play();
        break;
      case 'd':
        crash.play();
        break;
      case 'm':
        if (soundLoop.isPlaying) {
          soundLoop.stop();
        } else {
          // start the loop
          soundLoop.start();
        }
        break;
    }
  }
}

/*
musicnotehit=function(musicnote) {
  if ((musicnote.x>= this.x && musicnote.x <= (this.x + 40)) && 
      (musicnote.y>= this.y && musicnote.y <=(this.y+40))){
        musicnote.y=-4000;
        this.musicnote++;
      }
};

var musicnote = function(x,y) {
  this.x=x;
  40=y;
  this.Img =getImage("musicnoteimage.jpg");
  this.musicnote=0;
};

musicnote.prototype.draw=function() {
  fill(255,0,0);
  this.x=constrain(this.x,0,notelength-50);
  Image(this.Img,this.x,this.y,40,40);
}

musicnote.prototype.moveleft=function() {
  this.img=getImage("musicnoteimage.jpg");
  this.y-=5;
};
*/


/*
//when the player hits the correct button they get a point
if (keyIsPressed && keyCode ===a){
  player.score=1;
} elif (keyIsPressed && keyCode ===s);{
  player.score=1;
}
elif (keyIsPressed && keyCode ===d);{
  player.score=1;
}
elif (keyIsPressed && keyCode ===w);{
  player.score=1
};
*/

/*
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(canvasPressed);
  colorMode(HSB);
  background(0, 0, 86);
  textAlign(CENTER, CENTER);
  textSize(40);
  text('tap to start/stop', windowWidth/2, windowHeight/2);

  //the looper's callback is passed the timeFromNow
  //this value should be used as a reference point from
  //which to schedule sounds
  let intervalInSeconds = 0.125;
  soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);

  synth = new p5.MonoSynth();
  
  let player1 = new Player("Rthan Yam", 20);
  let player2 = new Player("David Davini", 40);
  let player3 = new Player("DK Shower", 9999);
  
  textSize(15);
  text("Score: "+ player1.score, 120, 30);
  text("Score: "+ player2.score, 120, 45);
  text("Score: "+ player3.score, 120, 60);
  
  console.log('hello world!');
}
*/
/*
function canvasPressed() {
  // ensure audio is enabled
  userStartAudio();

  if (soundLoop.isPlaying) {
    soundLoop.stop();
  } else {
    // start the loop
    soundLoop.start();
  }
}
*/


function onSoundLoop(timeFromNow) {
  metronome.play();
}


var socket = io();

socket.on('log', function(msg){
  console.log("Server Log: " + msg);
  // Print log on screen
})


