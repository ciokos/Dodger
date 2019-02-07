const playerX = 100;
const playerY = 530;
const playerRadius = 30;
const playerSpeed = 3;

const bulletSize = 65;
const bulletSpeed = 5;

let player;
let direction = 0;
let frequency = 50;

let bullets = [];

const classifier = ml5.KNNClassifier();
let video;
let features;

function setup() {
  noLoop();
  createCanvas(400, 600);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  features = ml5.featureExtractor("MobileNet", function() {
    console.log('model ready');
    classifier.load("model.json", function() {
      console.log("classifier loaded");
      goClassify();
      loop();
    });
  });
  background(0);
  player = new Player(playerX, playerY, playerRadius, playerSpeed);
  bullets.push(new Bullet());
}

function draw() {
  if (frameCount % frequency == 0) bullets.push(new Bullet());
  background(0);
  player.show();
  player.move(direction);
  for (let i = bullets.length - 1; i >= 0; i--) {
    if (bullets[i].y > height) bullets.splice(i, 1);
    else {
      bullets[i].show();
      bullets[i].update();
      gameLoss(bullets[i]);
    }
  }
}

function gameLoss(bullet) {
  if (player.x + player.r / 2 < bullet.x) return;
  if (player.x - player.r / 2 > bullet.x + bulletSize) return;
  if (player.y + player.r / 2 < bullet.y) return;
  if (player.y - player.r / 2 > bullet.y + bulletSize) return;
  // console.log('lost');
  noLoop();
}

function goClassify() {
  const logits = features.infer(video);
  classifier.classify(logits, function(error, result) {
    if (error) {
      console.error(error);
    } else {
      if (result.label == 'left') direction = -1;
      else if (result.label == 'right') direction = 1;
      else if (result.label == 'none') direction = 0;
      goClassify();
    }
  });
}
