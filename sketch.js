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
let ground,bunny;
var rope,fruit,fruit_con;
var button;

function preload(){
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  bunny_img = loadImage('Rabbit-01.png');
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(200,690,600,20);

  rope = new Rope(6, {x:245 , y:30});

  var fruitOption = {
    density : 0.001
  }

  fruit = Bodies.circle(300,300,20,fruitOption);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  
 
  rectMode(CENTER);
  ellipseMode(RADIUS);

  bunny = createSprite(250,620,100,100);
  bunny.addImage("headsUp",bunny_img);
  bunny.scale = 0.2;

  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  imageMode(CENTER);
  textSize(50)
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,500,700);
  Engine.update(engine);

  ground.show();
  rope.show();
  
  image(food,fruit.position.x,fruit.position.y,70,70);

  drawSprites();
}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}


