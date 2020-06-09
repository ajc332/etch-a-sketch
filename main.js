const container = document.getElementById('container');
const clearButton = document.getElementById('clear');
const colorButton = document.getElementById('color');
const blackButton = document.getElementById('grayscale');
colorClicked = false;

function makeGrid(number) {
    for (let i = 0; i < number * number; i++) {
        let square = document.createElement('div');
        square.style.width = '480' / number + 'px';
        square.style.height ='480' / number + 'px';
        square.className = 'squares';
        container.style.gridTemplateColumns = `repeat(${number}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${number}, 1fr)`;
        container.appendChild(square);
    }
    changeColor();
}

function changeColor() {
    let squares = document.querySelectorAll('.squares');
    if (colorClicked === true) {
        squares.forEach(square => square.addEventListener('mouseenter', () => {
            //square.style.opacity = 1;
            square.style.backgroundColor = randomColor();
        }));
    } else {
        squares.forEach(square => square.addEventListener('mouseenter', () => {
            square.style.backgroundColor = 'black';
            square.style.opacity = +square.style.opacity + 0.1; //Unary plus operator converts square.style.opacity to number (I think)
        }));
    }
}

clearButton.addEventListener('click', () => {
    colorClicked = false;
    const customGrid = prompt('How many squares per side would you like?');
    if (!(customGrid > 0)) {
        alert('Please pick a number greator than 0!');
        deleteGrid();
        makeGrid(16);
    } else {
        deleteGrid();
        makeGrid(customGrid);
    }
});

colorButton.addEventListener('click', () => {
    if (colorClicked === false) {
        colorClicked = true;
    }
    changeColor();
});

blackButton.addEventListener('click', () => {
    if (colorClicked === true) {
        colorClicked = false;
    }
    let squares = document.querySelectorAll('.squares');
    squares.forEach(square => square.addEventListener('mouseenter', () => {
        square.style.opacity = square.style.opacity - 0.1;
    }));
    changeColor();
});

function deleteGrid() {
    while (container.firstChild)
        container.removeChild(container.firstChild);
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
    return rgb;
}

makeGrid(16);