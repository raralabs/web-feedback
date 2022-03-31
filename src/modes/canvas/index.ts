import { getElement, style, _createElement } from '../../utils';
import html2canvas from 'html2canvas';

/** stylesheet */
import '../../styles/style.scss';
import { ICanvas_Mode } from '../../types/IModes/ICanvas';

class snipping {
    buttonLabel: string;
    markMode: ICanvas_Mode.IMarkMode;
    snippingHeaderHTML: string;

    constructor(config: ICanvas_Mode.IConfig) {
        const { buttonLabel, initialMarkMode } = config;
        this.buttonLabel = buttonLabel || 'Capture Screenshot';
        this.markMode = initialMarkMode || 'mark';
        this.snippingHeaderHTML = `
        <div>
        <button class="__screenshotBtn">Retake Screenchot</button>
        <button class="__doneBtn">Done</button>
        </div>
        <div>
        <button class="__markBtn __snipping_button_active">Mark</button>
        <button class="__cencorBtn">Censor</button>
        </div>`;
    }

    _clearMarkers(markerName: string) {
        const markers = document.getElementsByClassName(markerName);
        while (markers[0]) {
            markers[0].parentNode.removeChild(markers[0]);
        }
    }

    _delMarker(e: any) {
        return (e.srcElement.parentElement.style.display = 'none');
    }

    _initDraw(canvas) {
        let that = this;
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
        var _marker = null;
        var _delBtn = null;

        canvas.onmousemove = function (e) {
            setMousePosition(e);
            if (_marker !== null) {
                style(_marker, {
                    width: Math.abs(mouse.x - mouse.startX) + 'px',
                    height: Math.abs(mouse.y - mouse.startY) + 'px',
                    left: mouse.x - mouse.startX < 0 ? mouse.x + 'px' : mouse.startX + 'px',
                    top: mouse.y - mouse.startY < 0 ? mouse.y + 'px' : mouse.startY + 'px'
                });
            }
        };

        canvas.onclick = function (e) {
            if (_marker !== null) {
                _marker = null;
                canvas.style.cursor = 'default';
            } else if (e.target.name === 'delMarker') {
                _marker = null;
                canvas.style.cursor = 'default';
            } else {
                mouse.startX = mouse.x;
                mouse.startY = mouse.y;
                /** mark delete button */
                _delBtn = _createElement({
                    Tag: 'button',
                    innerHTML: 'X',
                    name: 'delMarker',
                    classlist: ['__snipping_marker_delete']
                });
                _delBtn.addEventListener('click', that._delMarker);
                _marker = _createElement({
                    Tag: 'div'
                });
                _marker.classList.add(that.markMode === 'mark' ? 'rectangle' : 'censored');

                _marker.appendChild(_delBtn);
                _marker.style.left = mouse.x + 'px';
                _marker.style.top = mouse.y + 'px';
                canvas.appendChild(_marker);
                canvas.style.cursor = 'crosshair';
            }
        };
    }

    _takeScreenShot = () => {
        const func = this;
        const mainContainer = getElement('.snippingFeedBackContainer')[0];
        (mainContainer as any).style.display = 'none';
        const snippingContent = getElement('.snippingContent')[0];
        html2canvas(document.body, {
            useCORS: true,
            x: window.scrollX,
            y: window.scrollY,
            width: window.innerWidth,
            height: window.innerHeight
        }).then(function (canvas) {
            (mainContainer as any).style.display = 'flex';
            canvas.setAttribute('id', 'cnv');
            style(canvas, {
                width: '100%',
                height: '90%'
            });
            (document.getElementById('screenshot') as HTMLImageElement).src = canvas.toDataURL('image/png');
            func._initDraw(snippingContent);
        });
    };

    _done() {
        let that = this;
        that._clearMarkers('__snipping_marker_delete');
        const snippingContent = document.getElementsByClassName('snippingContent')[0];
        html2canvas(snippingContent as HTMLElement, {
            useCORS: true
        }).then(function (canvas) {
            (document.getElementById('screenshot') as HTMLImageElement).src = canvas.toDataURL('image/png');
            that._clearMarkers('rectangle');
            that._clearMarkers('censored');
        });
    }

    _initEvents() {
        const retake__screenshotBtn = getElement('.__screenshotBtn')[0];
        const doneBtn = getElement('.__doneBtn')[0];
        const __markBtn = getElement('.__markBtn')[0];
        const __cencorBtn = getElement('.__cencorBtn')[0];
        retake__screenshotBtn.addEventListener('click', () => {
            this._clearMarkers('rectangle');
            this._clearMarkers('censored');
            getElement('.snippingFeedBackContainer')[0].style.display = 'none';
            getElement('.snipping__captureScreenshot')[0].style.display = 'block';
        });

        doneBtn.addEventListener('click', () => {
            this._done();
        });
        __markBtn.addEventListener('click', () => {
            this.markMode = 'mark';
            __cencorBtn.classList.remove('__snipping_button_active');
            __markBtn.classList.add('__snipping_button_active');
        });
        __cencorBtn.addEventListener('click', () => {
            this.markMode = 'censored';
            __cencorBtn.classList.add('__snipping_button_active');
            __markBtn.classList.remove('__snipping_button_active');
        });
    }

    _prepareDom() {
        /** main container */
        const _container = _createElement({
            Tag: 'div',
            classList: ['snippingFeedBackContainer']
        });
        style(_container, {
            display: 'none'
        });

        /** feedback container */
        const _snippingContainer = _createElement({
            Tag: 'div',
            classList: ['snippingContainer'],
            id: 'snippingContainer'
        });

        style(_snippingContainer, {
            width: '80%',
            height: '80%'
        });

        /** snipping header */
        const _snippingHeader = _createElement({
            Tag: 'div',
            classList: ['snippingHeader'],
            innerHTML: this.snippingHeaderHTML
        });

        /** snipping info area */
        const _snippingInfo = _createElement({
            Tag: 'header',
            classList: ['snippingInfo'],
            innerHTML: `<div>
            <textarea class="__feedback_description" placeholder="Your Feedback here!"/></textarea>
            </div>`
        });

        /** snipping content */

        const _snippingContent = _createElement({
            Tag: 'div',
            classList: ['snippingContent'],
            id: 'snippingContent'
        });
        style(_snippingContent, {
            width: '100%',
            height: '80%'
        });

        const _snapedImg: any = _createElement({
            Tag: 'img',
            id: 'screenshot'
        });

        /** rendering elements */
        _snippingContainer.appendChild(_snippingHeader);
        _snippingContainer.appendChild(_snippingInfo);
        _snippingContent.appendChild(_snapedImg);
        _snippingContainer.appendChild(_snippingContent);
        _container.appendChild(_snippingContainer);
        document.body.appendChild(_container);
    }

    _prepareSnapper() {
        let _snapButton = _createElement({
            Tag: 'button',
            innerHTML: this.buttonLabel,
            classList: ['snipping__captureScreenshot ']
        });

        _snapButton.addEventListener('click', () => {
            _snapButton.style.display = 'none';
            this._takeScreenShot();
        });
        document.body.appendChild(_snapButton);
    }

    init() {
        if (typeof document !== 'undefined' && typeof window !== 'undefined') {
            this._prepareSnapper();
            this._prepareDom();
            this._initEvents();
        }
    }
}

export { snipping };
