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

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

render.canvas.width = element.clientWidth
render.canvas.height = element.clientHeight

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
    count += 1
    if (test > 5) {
        // Matter.Body.setPosition(ground, {x: 400, y: ypos+offset})
        test = 0
    }
    test += 1
    // Matter.Body.set(boxA, "position", {x: 400, y: ypos})
    // ypos += 1;
    Engine.update(engine, [delta=updateTime], [correction=1]);        
    requestAnimationFrame(draw);
}