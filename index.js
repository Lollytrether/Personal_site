console.log('Happy developing ✨')
function draw() {
    const canvas = document.getElementById("Diamond Thing");

    const ctx = canvas.getContext("2d");


    ctx.rotate(Math.PI/4);
    ctx.fillStyle = "#1a1ef4";
    ctx.fillRect(100, -100, 100, 100);


}

// function draw2() {
//     const canvas_1= document.getElementById("triangle");
//     const ctx_2= canvas_1.getContext("2d");
//     ctx_2.beginPath();
//     ctx_2.moveTo(200, 0);
//     ctx_2.lineTo(200, 20);
//     ctx_2.lineTo(220, -20);
//     ctx_2.fill();
// }
draw();
//draw2();
