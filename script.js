const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const generate = document.getElementById("generate-button");
generate.style.display = "none"; //hide generate buuton
const clear = document.getElementById("clear-button");
const input = document.querySelector('input#tx')
let tx;

const widthCanvas = 1120;
const heightCanvas = 700;
const factor = () => widthCanvas / heightCanvas;
const ratio = factor();

const setWidth = () => {
    if (window.innerWidth < widthCanvas) {
        console.log("Szerokosc :", window.innerWidth);
        return window.innerWidth
    }

}
const setHeight = (ratio) => {
    if (window.innerWidth < widthCanvas) {
        console.log("Wysokosc :", window.innerWidth / ratio);
        return window.innerWidth / ratio
    }
}


const setCanvasDimentions = () => {

    console.log(ratio)
    canvas.width = setWidth() || widthCanvas;
    canvas.height = setHeight(ratio) || heightCanvas;
}
setCanvasDimentions();

window.addEventListener('resize', () => {
    setCanvasDimentions();
    render();
})

/* **Handlers for version with generate button and enter key** */
/*
generate.addEventListener('click', (e) => {
    render();
})
input.addEventListener('keyup', (e) => {
    if (e.key === 13) {
        render();
    }
})
*/

// live writing
input.addEventListener('input', (e) => {
    e.preventDefault();
    console.log(e.target.value)
    tx = e.target.value
    render();
})

// Clear input and rendered text
clear.addEventListener('click', (e) => {
    e.preventDefault();
    tx = "";
    input.value = "";
    render();
})

const render = () => {
    generate.style.display = "none"; //hide generate button
    draw();
}

const imgWidth = setWidth() || widthCanvas;
const imgHeight = setHeight(ratio) || heightCanvas;
const draw = () => {
    if (canvas.getContext) {
        const img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            if (tx) {
                text(tx);
            }

        };
        img.src = "./mx.jpg"
    }
    else {
        console.log("ERROR");
    }
}

const text = (tx) => {
    console.log(tx);
    ctx.fillStyle = '#fff';
    ctx.font = "40px Arial"
    ctx.fillText(tx.toUpperCase(), canvas.width / 5.2, canvas.height / 1.227, canvas.width / 1.4);
}
draw();