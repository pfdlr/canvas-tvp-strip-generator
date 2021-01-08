const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 1008;
canvas.height = 630;

const chooseImage = document.querySelector('.choose__image');
const imagesList = document.querySelectorAll('.image__box')


const save = document.getElementById('save-button');
const clear = document.getElementById("clear-button");
const input = document.querySelector('input#tx')
let tx;
let setImage = 'images/ma.jpg';


chooseImage.addEventListener('click', (e) => {
    e.stopPropagation();
    imagesList.forEach((image) => image.classList.remove("active"))
    e.target.parentNode.classList.add("active");
    setImage = e.target.getAttribute('src');
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

// timestamp for filename
let ts = new Date()
let date = ts.toLocaleDateString().replaceAll(".", "");
let time = ts.toLocaleTimeString().replaceAll(":", "");
let stamp = `${date}${time}`;

// save image
save.addEventListener('click', (e) => {
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), `tvp-${stamp}.jpg`);
    } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = canvas.toDataURL('image/jpeg');
        a.download = `tvp-${stamp}.jpg`;
        debugger
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
    ctx.font = "3rem Arial"
    ctx.fillText(tx.toUpperCase(), canvas.width / 5.2, canvas.height / 1.22, canvas.width / 1.4);
}

draw();