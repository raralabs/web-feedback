import { ICallback, ICanvasMode, IFeedbackData } from '../../types/IModes/ICanvas';

/** utils & resources */
import { getIcon } from '../../res';
import { dataURLtoFile, getElement, style, _createElement } from '../../utils';

/** stylesheet */
import '../../styles/style.scss';
// import { takeScreenshotCanvas } from '../../utils/Screenshot';
import { toPng } from 'html-to-image';
import { takeScreenshotCanvas } from '../../utils/Screenshot';

class Snipping {
  buttonLabel: string;
  markMode: ICanvasMode.IMarkMode;
  annotateLists: HTMLElement[];
  snippingHeaderHTML: string;
  buttonPosition: 'left' | 'bottom' | 'custom';
  textAnnotateCount: number;
  fileName: string;
  feedbackBtn: any;
  isSendingSnap: boolean;

  constructor(config?: ICanvasMode.IConfig) {
    const { buttonLabel, initialMarkMode, buttonPosition, fileName } = config || {};
    this.buttonLabel = buttonLabel || 'Report Bug/Feedback';
    this.markMode = initialMarkMode || 'mark';
    this.buttonPosition = buttonPosition || 'bottom';
    this.fileName = fileName || 'feedbackImage.png';
    this.annotateLists = [];
    // this.feedbackBtn = feedbackBtn;

    this.isSendingSnap = false;

    /** internal configs */
    this.snippingHeaderHTML = `
    
    <div class="__annotateTools">
    
        <button title="close annotate mode" class="__screenshotBtn __snipping_button_default_active">
         ${getIcon('close')}
        </button>

        <button title="undo" class="__undoBtn">
        ${getIcon('undo')}
        <sub class="__undoElCounts">${this.annotateLists?.length !== 0 ? this.annotateLists?.length : ''}</sub>
        </button>

        <button title="toggle mark annotate mode" class="__markBtn __snipping_button_active">
        ${getIcon('markAnnotate')}
        </button>

        <button title="toggle censor annotate mode" class="__cencorBtn">
        ${getIcon('censorAnnotate')}
        </button>

        <button title="toggle text annotate mode" class="__textBtn">
        ${getIcon('textAnnotate')}
        </button>
        <button title="Download as image" class="__downloadAsImage">
        ${getIcon('download')}
        </button>
        <button title="submit screenshot" class="_feedbackSubmitBtn __snipping_button_default_active">
        ${getIcon('right')}
        </button>
        </div>`;

    this.textAnnotateCount = 1;
  }

  _clearMarkers(markerName: string) {
    const markers: any = document.getElementsByClassName(markerName);
    while (markers[0]) {
      markers[0].parentNode.removeChild(markers[0]);
    }
  }

  _delMarker(e: MouseEvent, annotateLists: HTMLElement[]) {
    if (annotateLists.length > 0) {
      const currentAnnotateIndex = annotateLists.findIndex((annotate) => annotate === (e as any).srcElement.parentElement);
      if (currentAnnotateIndex !== -1) {
        annotateLists[currentAnnotateIndex].style.display = 'none';
        annotateLists.splice(currentAnnotateIndex, 1);
        this.annotateLists = annotateLists;
        getElement('.__undoElCounts')[0].innerHTML = annotateLists.length.toString();
      }
    }
    return ((e as any).srcElement.parentElement.style.display = 'none');
  }

  _initDraw(canvas: HTMLDivElement) {
    const that = this;
    const mouse = {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      initialX: 0,
      initialY: 0
    };
    const setMousePosition = (e: MouseEvent) => {
      const ev: any = e || window.event; // Moz || IE
      if (ev.pageX) {
        // Moz
        mouse.x = ev.layerX;
        mouse.y = ev.layerY;
      } else if (ev.clientX) {
        // IE
        mouse.x = ev.layerX;
        mouse.y = ev.layerY;
      }
    };

    const setInitialPosition = (e: MouseEvent) => {
      const ev: any = e || window.event; // Moz || IE
      if (ev.pageX) {
        // Moz
        mouse.initialX = ev.layerX;
        mouse.initialY = ev.layerY;
      } else if (ev.clientX) {
        // IE
        mouse.initialX = ev.layerX;
        mouse.initialY = ev.layerY;
      }
    };

    let _marker: HTMLDivElement | null = null;
    let _textAnnotateEl: HTMLDivElement | null = null;
    let _delBtn: HTMLButtonElement | null = null;
    let __editableTextAnnotate: HTMLButtonElement | null = null;

    canvas.onmousemove = (e) => {
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

    canvas.onmouseup = () => {
      canvas.style.cursor = 'default';
      _marker = null;
    };

    canvas.onmousedown = (e: MouseEvent) => {
      setInitialPosition(e);
      if ((e?.target as HTMLDivElement).className === '__annotateTextTool') return null;
      if ((e?.target as HTMLParagraphElement).className === '__annotateTextToolInput') return null;
      if (_marker !== null) {
        _marker = null;
        canvas.style.cursor = 'default';
      } else if ((e?.target as HTMLInputElement)?.name === 'delMarker') {
        _marker = null;
        canvas.style.cursor = 'default';
      } else {
        canvas.style.cursor = 'crosshair';
        if (that.markMode !== 'text') {
          mouse.startX = mouse.x;
          mouse.startY = mouse.y;
          /** mark delete button */
          _delBtn = _createElement({
            Tag: 'button',
            innerHTML: 'X',
            name: 'delMarker',
            className: 'delMarker',
            classlist: ['__snipping_marker_delete']
          });
          (_delBtn as HTMLButtonElement).addEventListener('click', (e) => {
            that._delMarker(e, that.annotateLists);
          });
          _marker = _createElement({
            Tag: 'div'
          });
          (_marker as HTMLDivElement).classList.add(that.markMode === 'mark' ? 'rectangle' : 'censored');

          (_marker as HTMLDivElement).appendChild(_delBtn as Node);
          (_marker as HTMLDivElement).style.left = mouse.x + 'px';
          (_marker as HTMLDivElement).style.top = mouse.y + 'px';
          canvas.appendChild(_marker as Node);
          that.annotateLists.push(_marker as HTMLDivElement);
          getElement('.__undoElCounts')[0].innerHTML = that.annotateLists.length.toString();
        } else {
          mouse.startX = mouse.x;
          mouse.startY = mouse.y;
          /** mark delete button */
          _delBtn = _createElement({
            Tag: 'button',
            innerHTML: `
            <span class="_textAnnotateCount">#</span>
            <span class="_textAnnotateDelete">
            <svg width="20" height="20" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 0.25C16.4869 0.249946 17.9161 0.825916 18.9875 1.85701C20.0588 2.88811 20.6891 4.29415 20.746 5.78L20.75 6H28C28.3197 6.00103 28.6269 6.12454 28.8583 6.34513C29.0898 6.56571 29.2279 6.86659 29.2443 7.1859C29.2607 7.5052 29.1541 7.81865 28.9465 8.06178C28.7388 8.30491 28.4459 8.45923 28.128 8.493L28 8.5H26.909L25.206 31.07C25.1253 32.1387 24.6438 33.1375 23.8579 33.8663C23.072 34.5951 22.0398 35 20.968 35H9.032C7.96021 35 6.92799 34.5951 6.14211 33.8663C5.35622 33.1375 4.8747 32.1387 4.794 31.07L3.09 8.5H2C1.69054 8.50014 1.39203 8.38549 1.16223 8.17823C0.932437 7.97097 0.787688 7.68583 0.756 7.378L0.75 7.25C0.75 6.603 1.242 6.07 1.872 6.007L2 6H9.25C9.25 4.47501 9.8558 3.01247 10.9341 1.93414C12.0125 0.855802 13.475 0.25 15 0.25V0.25ZM24.402 8.5H5.598L7.288 30.882C7.32127 31.3218 7.51942 31.7329 7.84279 32.0329C8.16616 32.3329 8.5909 32.4997 9.032 32.5H20.968C21.4093 32.5 21.8343 32.3333 22.1578 32.0333C22.4814 31.7332 22.6797 31.322 22.713 30.882L24.403 8.5H24.402ZM18.25 13.75C18.897 13.75 19.43 14.242 19.494 14.872L19.5 15V26C19.5015 26.3214 19.3791 26.6311 19.1583 26.8646C18.9374 27.0982 18.6351 27.2377 18.3141 27.2542C17.9931 27.2706 17.6781 27.1628 17.4345 26.9531C17.1909 26.7434 17.0374 26.4479 17.006 26.128L17 26V15C17 14.31 17.56 13.75 18.25 13.75ZM11.75 13.75C12.397 13.75 12.93 14.242 12.994 14.872L13 15V26C13.0015 26.3214 12.8791 26.6311 12.6583 26.8646C12.4374 27.0982 12.1351 27.2377 11.8141 27.2542C11.4931 27.2706 11.1781 27.1628 10.9345 26.9531C10.6909 26.7434 10.5374 26.4479 10.506 26.128L10.5 26V15C10.5 14.31 11.06 13.75 11.75 13.75ZM15 2.75C14.1699 2.74995 13.3712 3.06755 12.7678 3.63767C12.1644 4.20779 11.802 4.98719 11.755 5.816L11.75 6H18.25C18.25 5.13805 17.9076 4.3114 17.2981 3.7019C16.6886 3.09241 15.862 2.75 15 2.75V2.75Z" fill="white"/>
            </svg>
            </span>
            `,
            name: 'delMarker',
            classlist: ['__snipping_marker_delete __snipping_marker_textAnnotateCount']
          });
          (_delBtn as HTMLButtonElement).addEventListener('click', (e) => {
            that._delMarker(e, that.annotateLists);
          });
          _textAnnotateEl = _createElement({
            Tag: 'div',
            classList: ['__annotateTextTool']
          });
          __editableTextAnnotate = _createElement({
            Tag: 'p',
            classList: ['__annotateTextToolInput']
          });

          __editableTextAnnotate?.setAttribute('contenteditable', 'true');
          __editableTextAnnotate?.setAttribute('autofocus', 'true');

          (_textAnnotateEl as HTMLDivElement).appendChild(_delBtn as Node);
          (_textAnnotateEl as HTMLDivElement).appendChild(__editableTextAnnotate as Node);
          (_textAnnotateEl as HTMLDivElement).style.left = mouse.initialX + 'px';
          (_textAnnotateEl as HTMLDivElement).style.top = mouse.initialY + 'px';
          canvas.appendChild(_textAnnotateEl as Node);
          that.annotateLists.push(_textAnnotateEl as HTMLDivElement);
          getElement('.__undoElCounts')[0].innerHTML = that.annotateLists.length.toString();
          canvas.style.cursor = 'default';
          that.textAnnotateCount += 1;
          __editableTextAnnotate?.focus();
          return 0;
        }
      }
    };
  }

  resetSnap = () => {
    // reset annotate list
    this.annotateLists.map((aL) => {
      aL.style.display = 'none';
      return 0;
    });
    this.annotateLists = [];
    getElement('.__undoElCounts')[0].innerHTML = this.annotateLists.length.toString();

    // reset text annotate count
    this.textAnnotateCount = 1;
    // this._clearMarkers();
  };

  _takeScreenShot = async () => {
    getElement('._snapLoader')[0].style.display = 'none';
    console.log('Taking Screenshot v2.0.4');
    this.resetSnap();
    const func = this;
    const mainContainer = getElement('.snippingFeedBackContainer')[0];
    (mainContainer as any).style.display = 'none';
    const snippingContent = getElement('.snippingContent')[0];
    getElement('.snippingFeedBackContainerOverlay')[0].style.display = 'block';
    try {
      const canv = await takeScreenshotCanvas() as HTMLCanvasElement;
      if (canv) {
        getElement('.snippingFeedBackContainerOverlay')[0].style.display = 'none';
        (mainContainer as any).style.display = 'flex';
        (document.getElementById('screenshot') as HTMLImageElement).src = canv.toDataURL('image/png');
        func._initDraw(snippingContent);
      } else {
        getElement('.snippingFeedBackContainerOverlay')[0].style.display = 'none';
        getElement('.snippingFeedBackContainer')[0].style.display = 'none';
        getElement('.snipping__captureScreenshotBtn')[0].style.display = 'block';
        getElement('._snapLoader')[0].style.display = 'none';
      }
    } catch (err) {
      console.error('Error: ' + err);
    }
  };

  _done(cb: ICallback) {
    if (this.isSendingSnap) {
      // snap sent already
      return;
    }
    this.isSendingSnap = true;
    const that = this;
    that._clearMarkers('__snipping_marker_delete');
    const snippingContent = document.getElementsByClassName('snippingContent')[0];
    const fileName = this.fileName;
    getElement('._snapLoader')[0].style.display = 'none';
    toPng(snippingContent as HTMLElement, {
      height: window.innerHeight,
      skipAutoScale: true,
      filter(domNode) {
        return !domNode.classList?.contains('delMarker');
      }
    })
      .then(function (dataUrl) {
        const image = dataUrl;
        that._clearMarkers('rectangle');
        that._clearMarkers('censored');
        getElement('.snippingFeedBackContainer')[0].style.display = 'none';
        getElement('.snipping__captureScreenshotBtn')[0].style.display = 'block';
        that.resetSnap();
        dataURLtoFile(image, fileName).then((responese) => {
          const data: IFeedbackData = {
            base64Image: image,
            image: responese
          };
          cb(data);
          that.isSendingSnap = false;
        });
        (document.getElementById('screenshot') as HTMLImageElement).src = image;
      })
      .catch(function (error) {
        console.error('error', error);
      });
  }

  _download() {
    const fileName = this.fileName;
    toPng(document.body, {
      height: window.innerHeight,
      skipAutoScale: true,
      filter(domNode) {
        return !domNode.classList?.contains('delMarker');
      }
    })
      .then(function (dataUrl) {
        // const image = dataUrl;
        const image = dataUrl.replace('image/png', 'image/octet-stream');
        const __imageDownloader = _createElement({
          Tag: 'a',
          href: image,
          download: fileName
        });
        document.body.appendChild(__imageDownloader);
        __imageDownloader.click();
        document.body.removeChild(__imageDownloader);
        getElement('.__downloadAsImage')[0].disabled = false;
      })
      .catch(function (error) {
        console.error('error', error);
      });
  }

  __changeActiveTool = (el: HTMLElement, inActiveEl: Array<HTMLElement>) => {
    el.classList.add('__snipping_button_active');
    inActiveEl?.map((el) => {
      el.classList.remove('__snipping_button_active');
      return 0;
    });
  };

  _initEvents(cb: ICallback) {
    const retakeScreenshotBtn = getElement('.__screenshotBtn')[0];
    const doneBtn = getElement('._feedbackSubmitBtn')[0];

    /** annotate tools buttons */
    const __undoBtn = getElement('.__undoBtn')[0];
    const __markBtn = getElement('.__markBtn')[0];
    const __cencorBtn = getElement('.__cencorBtn')[0];
    const __textBtn = getElement('.__textBtn')[0];
    const __downloadAsImage = getElement('.__downloadAsImage')[0];

    retakeScreenshotBtn.addEventListener('click', () => {
      this._clearMarkers('rectangle');
      this._clearMarkers('censored');
      getElement('.snippingFeedBackContainer')[0].style.display = 'none';
      getElement('.snipping__captureScreenshotBtn')[0].style.display = 'block';
      getElement('._snapLoader')[0].style.display = 'none';
    });

    doneBtn.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      this._done(cb);
    });
    __undoBtn.addEventListener('click', () => {
      if (this.annotateLists.length > 0) {
        const currentAnnotateLists = this.annotateLists;
        const lastAnnotateList = currentAnnotateLists.pop() as HTMLElement;
        lastAnnotateList.style.display = 'none';
        getElement('.__undoElCounts')[0].innerHTML = this.annotateLists.length.toString();
      }
    });
    __markBtn.addEventListener('click', () => {
      this.markMode = 'mark';
      this.__changeActiveTool(__markBtn, [__cencorBtn, __textBtn]);
    });
    __cencorBtn.addEventListener('click', () => {
      this.markMode = 'censored';
      this.__changeActiveTool(__cencorBtn, [__markBtn, __textBtn]);
    });
    __textBtn.addEventListener('click', () => {
      this.markMode = 'text';
      this.__changeActiveTool(__textBtn, [__markBtn, __cencorBtn]);
    });
    __downloadAsImage.addEventListener('click', () => {
      __downloadAsImage.disabled = true;
      this._download();
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

    const _containerOverlay = _createElement({
      Tag: 'div',
      classList: ['snippingFeedBackContainerOverlay']
    });
    style(_containerOverlay, {
      display: 'none'
    });

    /** feedback container */
    const _snippingContainer = _createElement({
      Tag: 'div',
      classList: ['snippingContainer'],
      id: 'snippingContainer'
    });

    style(_snippingContainer, {
      width: '100%',
      height: '100%'
    });

    /** snipping header */
    const _snippingHeader = _createElement({
      Tag: 'div',
      classList: ['snippingHeader'],
      innerHTML: this.snippingHeaderHTML
    });

    /** snipping content */
    const _snippingContent = _createElement({
      Tag: 'div',
      classList: ['snippingContent'],
      id: 'snippingContent'
    });
    style(_snippingContent, {
      width: '100%',
      height: '100%'
    });

    const _snapedImg: any = _createElement({
      Tag: 'img',
      id: 'screenshot'
    });

    /** rendering elements */
    _snippingContainer.appendChild(_snippingHeader);
    _snippingContent.appendChild(_snapedImg);
    _snippingContainer.appendChild(_snippingContent);
    _container.appendChild(_snippingContainer);
    document.body.appendChild(_container);
    document.body.appendChild(_containerOverlay);
  }

  _prepareSnapper() {
    const _snapButtonContainer = this.feedbackBtn
      ? this.feedbackBtn
      : _createElement({
        Tag: 'div',
        classList: [`snipping__captureScreenshotContainer_${this.buttonPosition}`]
      });
    const _loader = _createElement({
      Tag: 'div',
      classList: ['_snapLoader'],
      innerHTML: getIcon('loader')
    });
    style(_loader, {
      display: 'none'
    });
    const _snapButton = _createElement({
      Tag: 'button',
      innerHTML: this.buttonLabel,
      classList: ['snipping__captureScreenshotBtn']
    });

    _snapButton.addEventListener('click', () => {
      _snapButton.style.display = 'none';
      // _loader.style.display = 'block';
      this._takeScreenShot();
    });
    _snapButtonContainer.appendChild(_snapButton);
    _snapButtonContainer.appendChild(_loader);
    document.body.appendChild(_snapButtonContainer);
  }

  init(cb: ICallback) {
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      this._prepareSnapper();
      this._prepareDom();
      this._initEvents(cb);
    }
  }
}

export { Snipping };
