const DEFULT_SIZE = 16;
const DEFULT_COLOR = 'black';
const DEFULT_MODE = 'color'

let currentColor = DEFULT_COLOR;
let currentSize = DEFULT_SIZE;
let currentmode = DEFULT_MODE;

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


const sliderValue = document.getElementById('slidervalue');
const sizeSlider = document.getElementById('slider');
const grid = document.getElementById('grid');
const colorpicker = document.getElementById('colorPick');
const colorbtn = document.getElementById('color');
const rainbowbtn = document.getElementById('rainbow');
const clearbtn = document.getElementById('clear');
const eraserbtn = document.getElementById('eraser');


rainbowbtn.onclick = () => setCurrentMode('rainbow');
colorbtn.onclick = () => setCurrentMode('color');
clearbtn.onclick = () => reloadGrid();
eraserbtn.onclick = () => setCurrentMode('erase');
sizeSlider.onmousemove = (e) => setSliderValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);
colorpicker.oninput = (e) => setCurrentColor(e.target.value);

function changeSize(value){
    setSliderValue(value);
    setCurrentSize(value);
    reloadGrid();
} 

function setSliderValue(size){
    sliderValue.innerHTML = `${size} x ${size}`
}

function setCurrentMode(mode){
    activateMode(mode);
    currentmode = mode;
}


function setCurrentColor(newcolor){
    currentColor = newcolor;
}

function setCurrentSize(newsize){
    currentSize = newsize;
}

function reloadGrid(){
    clearGrid();
    setUpGrid(currentSize);
}

function clearGrid(){
    grid.innerHTML = '';
}

function setUpGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size},1fr)`
    grid.style.gridTemplateRows = `repeat(${size},1fr)`

    for (let i = 0; i < size * size; i++){
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mousedown', changeColor);
        gridElement.addEventListener('mouseover', changeColor);
        grid.appendChild(gridElement);
    }
}

function changeColor(e){
    if (e.type === 'mouseover' && !mouseDown) return

    if(currentmode === 'color'){
        e.target.style.backgroundColor = currentColor
    }else if(currentmode === "rainbow"){
        let randomColor = Math.floor(Math.random() *16777215).toString(16);
        e.target.style.backgroundColor = randomColor;
    }else if (currentmode = 'erase'){
        e.target.style.backgroundColor = 'white'
    }
}

function activateMode(newmode){
    if(currentmode === 'color'){
        colorbtn.classList.remove('active')
    }else if(currentmode === 'rainbow'){
        rainbowbtn.classList.remove('active')
    }else if(currentmode === 'erase'){
        eraserbtn.classList.remove('active')
    }

    if(newmode === 'color'){
        colorbtn.classList.add('active');
    }else if(newmode === 'rainbow'){
        rainbowbtn.classList.add('active')
    }else if(newmode === 'erase'){
        eraserbtn.classList.add('active')
    }
}


window.onload(
    clearGrid(),
    setUpGrid(DEFULT_SIZE)
)

