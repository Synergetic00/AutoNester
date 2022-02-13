var Engine = Matter.Engine
var Render = Matter.Render
var Runner = Matter.Runner
var Common = Matter.Common
var Bodies = Matter.Bodies
var MouseConstraint = Matter.MouseConstraint
var Mouse = Matter.Mouse
var Vertices = Matter.Vertices
var Svg = Matter.Svg
var Composite = Matter.Composite

var element = document.getElementById("renderCanvas")
var engine = Engine.create();
var render = Render.create({
    element: element,
    engine: engine,
    options: {
        wireframes: false
    }
});

const WIDTH = element.clientWidth
const HEIGHT = element.clientHeight

engine.positionIterations = 20

render.canvas.width = WIDTH
render.canvas.height = HEIGHT

for (var i = 0; i < 100; i++) {
    var color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);
    var boxA = Bodies.rectangle((WIDTH/2)-(Math.random()*200)-100, 200-(100*i), 50, 50, {
        render: {
            fillStyle: color,
            strokeStyle: 'blue',
            lineWidth: 3
        }
    });
    boxA.friction = 0
    Composite.add(engine.world, [boxA])
}

var ground = Bodies.rectangle(WIDTH/2, HEIGHT-50, WIDTH, 50, { isStatic: true });
var wallLeft = Bodies.rectangle(50, 500, 50, 1000, { isStatic: true });
var wallRight = Bodies.rectangle(WIDTH-50, 500, 50, 1000, { isStatic: true });

wallLeft.friction = 0
wallRight.friction = 0

// add all of the bodies to the world
Composite.add(engine.world, [ground, wallLeft, wallRight]);

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

var select = function(root, selector) {
    return Array.prototype.slice.call(root.querySelectorAll(selector));
};

var loadSvg = function(url) {
    return fetch(url)
        .then(function(response) { return response.text(); })
        .then(function(raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
};

// ([
//     './svg/butterfly.svg',
//     './svg/fbomb.svg',
//     './svg/margarita.svg',
//     './svg/mushroom.svg',
//     './svg/shark.svg',
//     './svg/taco.svg',
//     './svg/turtle.svg',
//     './svg/wine.svg',
// ]).forEach(function(path, i) { 
//     for (var i = 0; i < 10; i++) {
//         loadSvg(path).then(function(root) {
//             var color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);
//             var vertexSets = select(root, 'path').map(function(path) { return Vertices.scale(Svg.pathToVertices(path, 30), 5, 5); });
//             var xstart = (WIDTH/2)+(Math.random()*(WIDTH-200))-((WIDTH-100)/2)
//             var ystart = (Math.random()*1000)-2000
//             Composite.add(engine.world, Bodies.fromVertices(xstart, ystart, vertexSets, {
//                 render: {
//                     fillStyle: color,
//                     strokeStyle: color,
//                     lineWidth: 1
//                 }
//             }, true));
//         });
//     }
// });

function sawtooth (t, inversed) {
	t%=1
	if (t < 0) t += 1
	if (inversed) return -1 + 2*t
	return 1 - 2*t
};

var updateTime = 1000/60;

draw();

var ypos = 600
var test = 0
var count = 0
var cutoff = 1500

const SHAKEAMT = 3

function draw(){
    // offset = Math.sin(count) * 20
    offset = sawtooth(count/100, false) * 100
    if (test > 1 && count < cutoff) {
        
        Matter.Body.set(ground, "position", {x: 400, y: ypos+offset})
        test = 0
    } else if (count >= cutoff) {
        engine.positionIterations = 100
        engine.gravity.scale = 0.000005
    } else if (count >= cutoff + 500) {
        engine.positionIterations = 00
    }
    // if (test > 10 && test < 1000) {
    //     // Matter.Body.setPosition(ground, {x: 400, y: ypos+offset})
    //     Matter.Body.setVelocity(ground, {x:0, y:-SHAKEAMT*2})
    //     Matter.Body.setVelocity(wallLeft, {x:SHAKEAMT, y:0})
    //     Matter.Body.setVelocity(wallRight, {x:-SHAKEAMT, y:0})
    // } else if (test >= 1000) {
    //     Matter.Body.setVelocity(ground, {x:0, y:0})
    //     Matter.Body.setVelocity(wallLeft, {x:0, y:0})
    //     Matter.Body.setVelocity(wallRight, {x:0, y:0})
    // }
    test += 1
    // Matter.Body.set(boxA, "position", {x: 400, y: ypos})
    // ypos += 1;
    Engine.update(engine, [delta=updateTime], [correction=1]);
    count += 1     
    requestAnimationFrame(draw);
}