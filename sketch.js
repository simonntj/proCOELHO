const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, fruit, ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink, eat, sad;

var ventilador;

var musica1
var musica2
var musica3
var musica4

function preload() {
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;

  musica1 = loadSound("sound1.mp3");
  musica2 = loadSound("rope_cut.mp3");
  musica3 = loadSound("eating_sound.mp3");
  musica4 = loadSound("mixkit-slow-sad-trombone-fail-472.wav");
}

function setup() {
  createCanvas(500, 700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(220, 30);
  button.size(50, 50);
  button.mouseClicked(drop);


  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(430, 620, 100, 100);
  bunny.scale = 0.2;
  sad.frameDelay = 20;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying', sad);
  bunny.changeAnimation('blinking');

  rope = new Rope(7, { x: 245, y: 30 });
  ground = new Ground(200, 690, 600, 20);

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);

  ventilador = createImg("pngtree-fan-png-image_7080015.png");
  ventilador.position(10,250);
  ventilador.size(200,200);
  ventilador.mouseClicked(assoprar);
}

function draw() {
  background(51);
  image(bg_img, width / 2, height / 2, 490, 690);

  if (fruit != null) {

    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }

  if (colidir(fruit, bunny) == true) {
    bunny.changeAnimation('eating');

    musica3.play();
  }

  if (colidir(fruit, ground.body) == true) {
    bunny.changeAnimation('crying');
    
    musica4.play();
  }


  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

}

function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con = null;

  musica2.play()
}

function colidir(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 90) {
      World.remove(engine.world,fruit);
      fruit = null;
      return true

    }
    else {
      return false;
    }

  }

}
function assoprar(){
Matter.Body.applyForce(fruit, {x: 0, y: 0}, {x: 0.05, y: 0});

}