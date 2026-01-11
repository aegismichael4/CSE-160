let canvas;
let ctx;

function main() {
    // Retrieve <canvas> element                                  <- (1)
    canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG                          <- (2)
    ctx = canvas.getContext('2d');

    clearCanvas();

    let v = new Vector3([2.25, 2.25, 0]);
    drawVector(v, "red");

}

function handleDrawEvent() {
    clearCanvas();
    drawVector(readVector("v1x", "v1y"), "red");
    drawVector(readVector("v2x", "v2y"), "blue");
}

function readVector(xElemID, yElemID) {
    let vx = document.getElementById(xElemID).value, vy = document.getElementById(yElemID).value;
    return new Vector3([vx, vy, 0]);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color
}

function drawVector(v, color) {

    let originX = canvas.width / 2;
    let originY = canvas.height / 2;

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + v.elements[0] * 20, originY - v.elements[1] * 20);
    ctx.stroke();
}

function handleDrawOperationEvent() {

    clearCanvas();

    let v1 = readVector("v1x", "v1y");
    let v2 = readVector("v2x", "v2y");
    let scalar = document.getElementById("scalar").value;
    drawVector(v1, "red");
    drawVector(v2, "blue");

    let op = document.getElementById("operation").value;

    switch(op) {
        case "add":
            drawVector(v1.add(v2), "green");
            break;
        case "sub":
            drawVector(v1.sub(v2), "green");
            break;
        case "mul":
            drawVector(v1.mul(scalar), "green");
            drawVector(v2.mul(scalar), "green");
            break;
        case "div":
            drawVector(v1.div(scalar), "green");
            drawVector(v2.div(scalar), "green");
            break;
        case "mag":
            console.log("V1 magnitude: " + v1.magnitude() + ", V2 magnitude: " + v2.magnitude());
            break;
        case "nor":
            drawVector(v1.normalize(), "green");
            drawVector(v2.normalize(), "green");
            break;
        case "ang":
            console.log("Angle: " + Vector3.angleBetween(v1, v2));
            break;
        case "are":
            console.log("Area of the triangle: " + Vector3.areaTriangle(v1, v2));
            break;
        
    }
}