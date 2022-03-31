// import { ICanvas_Mode } from '../../types/IModes/ICanvas';
import { createElement, getElement } from '../../utils';
import html2canvas from 'html2canvas';

/** stylesheet */
import '../../styles/style.scss';

var markMode = 'mark';
const clearMarkers = (markerName: string) => {
    const markers = document.getElementsByClassName(markerName);
    while (markers[0]) {
        markers[0].parentNode.removeChild(markers[0]);
    }
};

const delMarker = (e: any) => {
    return (e.srcElement.parentElement.style.display = 'none');
};

function initDraw(canvas) {
    function setMousePosition(e) {
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) {
            //Moz
            mouse.x = ev.layerX;
            mouse.y = ev.layerY;
        } else if (ev.clientX) {
            //IE
            mouse.x = ev.layerX;
            mouse.y = ev.layerY;
        }
    }

    var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    };
    var element = null;
    var delBtn = null;

    canvas.onmousemove = function (e) {
        setMousePosition(e);
        if (element !== null) {
            element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
            element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
            element.style.left = mouse.x - mouse.startX < 0 ? mouse.x + 'px' : mouse.startX + 'px';
            element.style.top = mouse.y - mouse.startY < 0 ? mouse.y + 'px' : mouse.startY + 'px';
        }
    };

    canvas.onclick = function (e) {
        if (element !== null) {
            element = null;
            canvas.style.cursor = 'default';
        } else if (e.target.name === 'delMarker') {
            element = null;
            canvas.style.cursor = 'default';
        } else {
            mouse.startX = mouse.x;
            mouse.startY = mouse.y;
            element = document.createElement('div');
            delBtn = document.createElement('button');
            element.className = markMode === 'mark' ? 'rectangle' : 'censored';
            delBtn.setAttribute('name', 'delMarker');
            delBtn.className = '__snipping_marker_delete';
            delBtn.innerHTML = 'X';
            delBtn.addEventListener('click', delMarker);
            element.appendChild(delBtn);
            element.style.left = mouse.x + 'px';
            element.style.top = mouse.y + 'px';
            canvas.appendChild(element);
            canvas.style.cursor = 'crosshair';
        }
    };
}

const takeScreenShot = () => {
    const mainContainer = document.getElementsByClassName('snippingFeedBackContainer')[0];
    (mainContainer as any).style.display = 'none';
    const snippingContent = document.getElementsByClassName('snippingContent')[0];
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

        (document.getElementById('screenshot') as HTMLImageElement).src = canvas.toDataURL('image/png');
        initDraw(snippingContent);
    });
};
const done = () => {
    clearMarkers('__snipping_marker_delete');
    const snippingContent = document.getElementsByClassName('snippingContent')[0];
    html2canvas(snippingContent as HTMLElement, {
        useCORS: true
    }).then(function (canvas) {
        (document.getElementById('screenshot') as HTMLImageElement).src = canvas.toDataURL('image/png');
        clearMarkers('rectangle');
        clearMarkers('censored');
    });
};

const initEvents = () => {
    const retake__screenshotBtn = document.getElementsByClassName('__screenshotBtn')[0];
    const doneBtn = document.getElementsByClassName('__doneBtn')[0];
    const __markBtn = document.getElementsByClassName('__markBtn')[0];
    const __cencorBtn = document.getElementsByClassName('__cencorBtn')[0];
    // const ____snipping_marker_delete = document.getElementsByClassName('__snipping_marker_delete')[0];
    retake__screenshotBtn.addEventListener('click', () => {
        clearMarkers('rectangle');
        clearMarkers('censored');
        getElement('.snippingFeedBackContainer')[0].style.display = 'none';
        getElement('.snipping__captureScreenshot')[0].style.display = 'block';
    });

    doneBtn.addEventListener('click', () => {
        done();
    });
    __markBtn.addEventListener('click', () => {
        markMode = 'mark';
        __cencorBtn.classList.remove('__snipping_button_active');
        __markBtn.classList.add('__snipping_button_active');
    });
    __cencorBtn.addEventListener('click', () => {
        markMode = 'censored';
        __cencorBtn.classList.add('__snipping_button_active');
        __markBtn.classList.remove('__snipping_button_active');
    });
};

const createUI = () => {};

const initialize = () => {
    const snipping__captureScreenshot = createElement('button');
    snipping__captureScreenshot.innerHTML = 'Capture Screenshot';
    snipping__captureScreenshot.classList.add('snipping__captureScreenshot');
    document.body.appendChild(snipping__captureScreenshot);
    snipping__captureScreenshot.addEventListener('click', () => {
        snipping__captureScreenshot.style.display = 'none';
        takeScreenShot();
    });
};

const snipping = (): void => {
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
        initialize();
        createUI();
        initEvents();
    }
};

export { snipping, takeScreenShot };
