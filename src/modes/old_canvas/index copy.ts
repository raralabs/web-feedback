// import { ICanvas_Mode } from '../../types/IModes/ICanvas';
import { createElement } from '../../utils';
import html2canvas from 'html2canvas';

/** stylesheet */
import '../../styles/style.scss';

function initDraw() {
    const canvas: any = document.getElementById('cnv');
    let ctx = canvas.getContext('2d');
    ctx.rect(100, 100, 10, 10);
    ctx.stroke();
    // var offsetX = canvas.offsetLeft;
    // var offsetY = canvas.offsetTop;
    var isDrawing = false;
    var startX;
    var startY;
    function getOffset(el: any) {
        var _x = 0;
        var _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }

    canvas.addEventListener('mousedown', function (e) {
        const mouseX = +e.offsetX - getOffset(canvas).left;
        const mouseY = +e.offsetY - getOffset(canvas).top;
        // Put your mousedown stuff here
        if (isDrawing) {
            isDrawing = false;
            ctx.beginPath();
            ctx.rect(startX, startY, mouseX - startX, mouseY - startY);
            ctx.strokeStyle = 'yellow';
            ctx.stroke();
            ctx.lineWidth = 5;
            ctx.fillStyle = 'transparent';
            ctx.fill();
            canvas.style.cursor = 'default';
        } else {
            isDrawing = true;
            startX = mouseX;
            startY = mouseY;
            canvas.style.cursor = 'crosshair';
        }
    });
}

const takeScreenShot = () => {
    const mainContainer = document.getElementsByClassName('snippingFeedBackContainer')[0];
    (mainContainer as any).style.display = 'none';
    const container = document.getElementsByClassName('snippingContainer')[0];
    html2canvas(document.body, {
        useCORS: true,
        x: window.scrollX,
        y: window.scrollY,
        width: window.innerWidth,
        height: window.innerHeight
    }).then(function (canvas) {
        (mainContainer as any).style.display = 'flex';
        canvas.setAttribute('id', 'cnv');
        canvas.style.width = '100%';
        canvas.style.height = '90%';
        container.appendChild(canvas);
        initDraw();
    });
};
// const initCanvas = async () => {
//     takeScreenShot();
// };

const createUI = () => {
    /**
     * main container
     */
    const container = createElement('div');
    container.classList.add('snippingFeedBackContainer');
    // container.style.height = document.body.scrollHeight + 'px';
    // container.style.width = window.innerWidth + 'px';

    /**
     * feedback container
     */
    const snippingContainer = createElement('div');
    snippingContainer.classList.add('snippingContainer');
    snippingContainer.setAttribute('id', 'snippingContainer');
    snippingContainer.style.width = '80%';
    snippingContainer.style.height = '85%';

    /**
     * button element
     */
    const button = createElement('button');
    button.classList.add('screenshotBtn');
    button.innerHTML = 'Retake Screenshot';
    button.addEventListener('click', takeScreenShot);
    // button.addEventListener('click', takeScreenShot);

    /**
     * canvas element
     */
    console.log(snippingContainer.scrollHeight);
    const canvas = createElement('canvas');
    canvas.setAttribute('id', 'snippingCanvas');

    /**
     * rendering elements
     */
    snippingContainer.appendChild(button);
    // snippingContainer.appendChild(canvas);
    container.appendChild(snippingContainer);
    document.body.appendChild(container);
};

const snipping = (): void => {
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
        createUI();
        // initCanvas();
    }
};

export { snipping };
