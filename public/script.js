var mtrx = document.getElementById("matrix");
var mtrx_x = mtrx.getContext("2d");

var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
matrix = matrix.split("");

var font_size = 10;
var columns;
var drops = [];

function resizeCanvas() {
    mtrx.width = window.innerWidth;
    mtrx.height = window.innerHeight;

    columns = mtrx.width / font_size;
    drops = [];
    for (var x = 0; x < columns; x++) {
        drops[x] = 1;
    }
}

// Initial canvas setup
resizeCanvas();

var draw = function() {
    mtrx_x.fillStyle = "rgba(0, 0, 0, 0.05)";
    mtrx_x.fillRect(0, 0, mtrx.width, mtrx.height);
    mtrx_x.fillStyle = "#0f0";
    mtrx_x.font = font_size + "px arial";
    for (var i = 0; i < drops.length; i++) {
        var text = matrix[Math.floor(Math.random() * matrix.length)];
        mtrx_x.fillText(text, i * font_size, drops[i] * font_size);
        drops[i]++;
        if (drops[i] * font_size > mtrx.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
    }
}

setInterval(draw, 35);

// Add event listener for window resize
window.addEventListener('resize', resizeCanvas);

var sslStatus = document.getElementById("sslStatus");
if (window.location.protocol === "https:") {
    sslStatus.textContent = "SSL is used";
    sslStatus.style.color = "green";
} else {
    sslStatus.textContent = "SSL is not used";
    sslStatus.style.color = "red";
}