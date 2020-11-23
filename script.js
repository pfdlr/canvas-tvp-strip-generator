const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const chooseImage = document.querySelector('.choose-image');


const save = document.getElementById('save-button');
const clear = document.getElementById("clear-button");
const input = document.querySelector('input#tx')
let tx;
let setImage = 'ma.jpg';
const widthCanvas = 1008;
const heightCanvas = 630;
const ratio = widthCanvas / heightCanvas;

chooseImage.addEventListener('click', (e) => {
    e.stopPropagation();
    setImage = e.target.getAttribute('src');
    draw();
})

const setWidth = () => {
    if (window.innerWidth < widthCanvas) {
        return window.innerWidth
    }
}

const setHeight = (ratio) => {
    if (window.innerWidth < widthCanvas) {
        return window.innerWidth / ratio
    }
}

const setCanvasDimentions = () => {
    canvas.width = setWidth() || widthCanvas;
    canvas.height = setHeight(ratio) || heightCanvas;
}

setCanvasDimentions();

window.addEventListener('resize', () => {
    setCanvasDimentions();
    draw();
})

// live writing
input.addEventListener('input', (e) => {
    e.preventDefault();
    tx = e.target.value
    draw();
})

// Clear input and rendered text
clear.addEventListener('click', (e) => {
    e.preventDefault();
    tx = "";
    input.value = "";
    draw();
})

// save image
save.addEventListener('click', (e) => {
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), 'tvp.jpg');
    } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = canvas.toDataURL('image/jpg');
        a.download = "tvp.jpg";
        a.click();
        document.body.removeChild(a);
    }
})



// draw image
const draw = () => {
    if (canvas.getContext) {
        const img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            if (tx) {
                text(tx);
            }
        };
        img.src = setImage;
    }
    else {
        console.log("ERROR");
    }
}

//text settings
const text = (tx) => {
    ctx.fillStyle = '#fff';
    ctx.font = "40px Arial"
    ctx.fillText(tx.toUpperCase(), canvas.width / 5.2, canvas.height / 1.227, canvas.width / 1.4);
}

draw();