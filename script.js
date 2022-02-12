var Engine = Matter.Engine
var Render = Matter.Render
var Runner = Matter.Runner
var Bodies = Matter.Bodies
var Composite = Matter.Composite

var element = document.getElementById("renderCanvas")
var engine = Engine.create();
var render = Render.create({
    element: element,
    engine: engine
});

const WIDTH = element.clientWidth
const HEIGHT = element.clientHeight

render.canvas.width = WIDTH
render.canvas.height = HEIGHT

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);

var ground = Bodies.rectangle(400, HEIGHT-50, 1000, 50, { isStatic: true });
var wallLeft = Bodies.rectangle(50, 500, 50, 1000, { isStatic: true });
var wallRight = Bodies.rectangle(WIDTH-50, 500, 50, 1000, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground, wallLeft, wallRight]);

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

var updateTime = 1000/60;

draw();

var ypos = 600
var test = 0
var count = 0
function draw(){
    offset = Math.sin(count) * 20
    if (test > 10 && test < 500) {
        // Matter.Body.setPosition(ground, {x: 400, y: ypos+offset})
        Matter.Body.setVelocity(ground, {x:0, y:-10})
        Matter.Body.setVelocity(wallLeft, {x:5, y:0})
        Matter.Body.setVelocity(wallRight, {x:-5, y:0})
        test = 0
    } else if (test >= 500) {
        Matter.Body.setVelocity(ground, {x:0, y:0})
        Matter.Body.setVelocity(wallLeft, {x:0, y:0})
        Matter.Body.setVelocity(wallRight, {x:0, y:0})
    }
    test += 1
    // Matter.Body.set(boxA, "position", {x: 400, y: ypos})
    // ypos += 1;
    Engine.update(engine, [delta=updateTime], [correction=1]);
    count += 1     
    requestAnimationFrame(draw);
}