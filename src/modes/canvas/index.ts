import { getElement, style, _createElement } from '../../utils';
import html2canvas from 'html2canvas';

/** stylesheet */
import '../../styles/style.scss';
import { ICanvasMode } from '../../types/IModes/ICanvas';

class Snipping {
  buttonLabel: string;
  markMode: ICanvasMode.IMarkMode;
  snippingHeaderHTML: string;
  appId: string | number;

  constructor(config: ICanvasMode.IConfig) {
    const { buttonLabel, initialMarkMode, appId } = config;
    this.buttonLabel = buttonLabel || 'Send Feedback';
    this.markMode = initialMarkMode || 'mark';
    this.snippingHeaderHTML = `
        <div>
        <button class="__screenshotBtn">Retake screenshot</button>
        </div>
        <div class="__annotateTools">
        <button class="__markBtn __snipping_button_active">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.54375 2.17969H10.9078V0H6.54375V2.17969ZM2.17969 19.6359H0V24H4.36406V21.8203H2.17969V19.6359ZM6.54375 24H10.9078V21.8203H6.54375V24ZM2.17969 13.0922H0V17.4562H2.17969V13.0922ZM2.17969 6.54375H0V10.9078H2.17969V6.54375ZM0 4.36406H2.17969V2.17969H4.35938V0H0V4.36406ZM21.8203 10.9078H24V6.54375H21.8203V10.9078ZM13.0922 24H17.4562V21.8203H13.0922V24ZM19.6359 0V2.17969H21.8156V4.35938H24V0H19.6359ZM21.8203 17.4562H24V13.0922H21.8203V17.4562ZM21.8203 21.8203H19.6406V24H24V19.6359H21.8203V21.8203ZM13.0922 2.17969H17.4562V0H13.0922V2.17969Z" fill="black"/>
        </svg>

        </button>
        <button class="__cencorBtn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 3.9375C0 1.7625 1.41 0 3.15 0H20.85C22.59 0 24 1.7625 24 3.9375V20.0625C24 22.2375 22.59 24 20.85 24H3.15C2.31457 24 1.51335 23.5852 0.922614 22.8467C0.331874 22.1083 0 21.1068 0 20.0625V3.9375Z" fill="black"/>
        </svg>

        </button>
        <button class="__textBtn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.803 16.9111V7.08711C21.3511 6.94823 21.8526 6.6666 22.2565 6.2709C22.6604 5.87519 22.9522 5.37955 23.1022 4.83441C23.2523 4.28927 23.2552 3.71411 23.1107 3.16747C22.9663 2.62082 22.6795 2.12222 22.2797 1.72241C21.8799 1.32261 21.3813 1.03587 20.8347 0.891391C20.288 0.746912 19.7129 0.74985 19.1677 0.899906C18.6226 1.04996 18.1269 1.34178 17.7312 1.74565C17.3355 2.14952 17.0539 2.65102 16.915 3.19911H7.09102C6.95213 2.65102 6.6705 2.14952 6.2748 1.74565C5.8791 1.34178 5.38345 1.04996 4.83831 0.899906C4.29318 0.74985 3.71801 0.746912 3.17137 0.891391C2.62473 1.03587 2.12613 1.32261 1.72632 1.72241C1.32651 2.12222 1.03978 2.62082 0.895297 3.16747C0.750818 3.71411 0.753756 4.28927 0.903812 4.83441C1.05387 5.37955 1.34568 5.87519 1.74955 6.2709C2.15342 6.6666 2.65493 6.94823 3.20302 7.08711V16.9111C2.65493 17.05 2.15342 17.3316 1.74955 17.7273C1.34568 18.123 1.05387 18.6187 0.903812 19.1638C0.753756 19.709 0.750818 20.2841 0.895297 20.8308C1.03978 21.3774 1.32651 21.876 1.72632 22.2758C2.12613 22.6756 2.62473 22.9624 3.17137 23.1068C3.71801 23.2513 4.29318 23.2484 4.83831 23.0983C5.38345 22.9483 5.8791 22.6564 6.2748 22.2526C6.6705 21.8487 6.95213 21.3472 7.09102 20.7991H16.915C17.0539 21.3472 17.3355 21.8487 17.7312 22.2526C18.1269 22.6564 18.6226 22.9483 19.1677 23.0983C19.7129 23.2484 20.288 23.2513 20.8347 23.1068C21.3813 22.9624 21.8799 22.6756 22.2797 22.2758C22.6795 21.876 22.9663 21.3774 23.1107 20.8308C23.2552 20.2841 23.2523 19.709 23.1022 19.1638C22.9522 18.6187 22.6604 18.123 22.2565 17.7273C21.8526 17.3316 21.3511 17.05 20.803 16.9111ZM20.003 2.39911C20.3195 2.39911 20.6288 2.49295 20.8919 2.66876C21.1551 2.84457 21.3601 3.09446 21.4812 3.38682C21.6023 3.67918 21.634 4.00089 21.5723 4.31126C21.5105 4.62163 21.3582 4.90672 21.1344 5.13048C20.9106 5.35425 20.6255 5.50663 20.3152 5.56837C20.0048 5.63011 19.6831 5.59842 19.3907 5.47732C19.0984 5.35622 18.8485 5.15114 18.6727 4.88803C18.4969 4.62491 18.403 4.31556 18.403 3.99911C18.403 3.57477 18.5716 3.1678 18.8716 2.86774C19.1717 2.56768 19.5787 2.39911 20.003 2.39911V2.39911ZM2.40302 3.99911C2.40302 3.68266 2.49686 3.37332 2.67267 3.1102C2.84848 2.84708 3.09836 2.64201 3.39073 2.52091C3.68309 2.39981 4.00479 2.36812 4.31516 2.42986C4.62553 2.49159 4.91063 2.64398 5.13439 2.86774C5.35815 3.09151 5.51054 3.3766 5.57228 3.68697C5.63401 3.99734 5.60233 4.31904 5.48123 4.61141C5.36013 4.90377 5.15505 5.15365 4.89193 5.32946C4.62881 5.50527 4.31947 5.59911 4.00302 5.59911C3.57867 5.59911 3.17171 5.43054 2.87165 5.13048C2.57159 4.83043 2.40302 4.42346 2.40302 3.99911V3.99911ZM4.00302 21.5991C3.68657 21.5991 3.37723 21.5053 3.11411 21.3295C2.85099 21.1537 2.64591 20.9038 2.52481 20.6114C2.40371 20.319 2.37203 19.9973 2.43376 19.687C2.4955 19.3766 2.64788 19.0915 2.87165 18.8677C3.09541 18.644 3.38051 18.4916 3.69087 18.4299C4.00124 18.3681 4.32295 18.3998 4.61531 18.5209C4.90767 18.642 5.15756 18.8471 5.33337 19.1102C5.50918 19.3733 5.60302 19.6827 5.60302 19.9991C5.60302 20.4235 5.43445 20.8304 5.13439 21.1305C4.83433 21.4305 4.42737 21.5991 4.00302 21.5991ZM16.915 19.1991H7.09102C6.94737 18.6488 6.65966 18.1468 6.25752 17.7446C5.85537 17.3425 5.3533 17.0548 4.80302 16.9111V7.08711C5.3533 6.94347 5.85537 6.65576 6.25752 6.25361C6.65966 5.85146 6.94737 5.3494 7.09102 4.79911H16.915C17.0587 5.3494 17.3464 5.85146 17.7485 6.25361C18.1507 6.65576 18.6527 6.94347 19.203 7.08711V16.9111C18.6527 17.0548 18.1507 17.3425 17.7485 17.7446C17.3464 18.1468 17.0587 18.6488 16.915 19.1991V19.1991ZM20.003 21.5991C19.6866 21.5991 19.3772 21.5053 19.1141 21.3295C18.851 21.1537 18.6459 20.9038 18.5248 20.6114C18.4037 20.319 18.372 19.9973 18.4338 19.687C18.4955 19.3766 18.6479 19.0915 18.8716 18.8677C19.0954 18.644 19.3805 18.4916 19.6909 18.4299C20.0012 18.3681 20.323 18.3998 20.6153 18.5209C20.9077 18.642 21.1576 18.8471 21.3334 19.1102C21.5092 19.3733 21.603 19.6827 21.603 19.9991C21.603 20.4235 21.4344 20.8304 21.1344 21.1305C20.8343 21.4305 20.4274 21.5991 20.003 21.5991Z" fill="black"/>
        <path d="M16 8H8V9.6H11.2V16.8H12.8V9.6H16V8Z" fill="black"/>
        </svg>

        </button>
        </div>`;
    this.appId = appId;
  }

  _clearMarkers(markerName: string) {
    const markers: any = document.getElementsByClassName(markerName);
    while (markers[0]) {
      markers[0].parentNode.removeChild(markers[0]);
    }
  }

  _delMarker(e: any) {
    return (e.srcElement.parentElement.style.display = 'none');
  }

  _initDraw(canvas: HTMLDivElement) {
    const that = this;
    function setMousePosition(e: MouseEvent) {
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
    }

    const mouse = {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0
    };
    let _marker: HTMLDivElement | null = null;
    let _delBtn: HTMLButtonElement | null = null;
    let __editableTextAnnotate: HTMLButtonElement | null = null;

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

    canvas.onclick = function (e: MouseEvent) {
      console.log(e);
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
            classlist: ['__snipping_marker_delete']
          });
          (_delBtn as HTMLButtonElement).addEventListener('click', that._delMarker);
          _marker = _createElement({
            Tag: 'div'
          });
          (_marker as HTMLDivElement).classList.add(that.markMode === 'mark' ? 'rectangle' : 'censored');

          (_marker as HTMLDivElement).appendChild(_delBtn as Node);
          (_marker as HTMLDivElement).style.left = mouse.x + 'px';
          (_marker as HTMLDivElement).style.top = mouse.y + 'px';
          canvas.appendChild(_marker as Node);
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
          (_delBtn as HTMLButtonElement).addEventListener('click', that._delMarker);
          _marker = _createElement({
            Tag: 'div',
            classList: ['__annotateTextTool']
          });
          __editableTextAnnotate = _createElement({
            Tag: 'p',
            innerHTML: 'Your text',
            classList: ['__annotateTextToolInput']
          });

          __editableTextAnnotate?.setAttribute('contenteditable', 'true');

          (_marker as HTMLDivElement).appendChild(_delBtn as Node);
          (_marker as HTMLDivElement).appendChild(__editableTextAnnotate as Node);
          (_marker as HTMLDivElement).style.left = mouse.x + 'px';
          (_marker as HTMLDivElement).style.top = mouse.y + 'px';
          canvas.appendChild(_marker as Node);
        }
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

  _done(cb: Function) {
    const that = this;
    that._clearMarkers('__snipping_marker_delete');
    const snippingContent = document.getElementsByClassName('snippingContent')[0];
    const feedbackTitle = getElement('._feedbackInfoInput')[0];
    const feedbackDescription = getElement('._feedbackInfoTextarea')[0];

    html2canvas(snippingContent as HTMLElement, {
      useCORS: true
    }).then(function (canvas) {
      const image = canvas.toDataURL('image/png');
      const data = {
        // image,
        appId: that.appId,
        title: feedbackTitle.value,
        description: feedbackDescription.value
      };
      (document.getElementById('screenshot') as HTMLImageElement).src = image;
      that._clearMarkers('rectangle');
      that._clearMarkers('censored');
      cb(data);
    });
  }

  __changeActiveTool = (el: HTMLElement, inActiveEl: Array<HTMLElement>) => {
    el.classList.add('__snipping_button_active');
    inActiveEl?.map((el) => {
      el.classList.remove('__snipping_button_active');
      return 0;
    });
  };

  _initEvents(cb: Function) {
    const retakeScreenshotBtn = getElement('.__screenshotBtn')[0];
    const doneBtn = getElement('._feedbackSubmitBtn')[0];

    /** annotate tools buttons */
    const __markBtn = getElement('.__markBtn')[0];
    const __cencorBtn = getElement('.__cencorBtn')[0];
    const __textBtn = getElement('.__textBtn')[0];

    retakeScreenshotBtn.addEventListener('click', () => {
      this._clearMarkers('rectangle');
      this._clearMarkers('censored');
      getElement('.snippingFeedBackContainer')[0].style.display = 'none';
      getElement('.snipping__captureScreenshotContainer')[0].style.display = 'block';
    });

    doneBtn.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      this._done(cb);
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
      height: '95%'
    });

    /** snipping header */
    const _snippingHeader = _createElement({
      Tag: 'div',
      classList: ['snippingHeader'],
      innerHTML: this.snippingHeaderHTML
    });

    /** snipping info area */
    const _snippingInfo = _createElement({
      Tag: 'div',
      classList: ['_snippingInfo'],
      innerHTML: `<div>
            <header>
            <h1>Rara Feedback Portal</h1>
            </header>
            <form>
            <label>
             <p>Title</p>
             <input class="_feedbackInfoInput" input type="text" placeholder="Describe your feedback"/>
            </label>
            <label>
            <p>Description</p>
            <textarea class="_feedbackInfoTextarea" textarea class="__feedback_description" placeholder="Your Feedback here!"/>What's your issue?

            What did you expect?
            
            
            ---
            💡 Note
            Give as much info as you want to help our devs fix the issue.</textarea>
            </label>
            <button type="button" class="_feedbackSubmitBtn">Submit</button>
            </form>
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
      height: '95%'
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
    _container.appendChild(_snippingInfo);
    document.body.appendChild(_container);
  }

  _prepareSnapper() {
    const _snapButtonContainer = _createElement({
      Tag: 'div',
      classList: ['snipping__captureScreenshotContainer']
    });
    const _snapButton = _createElement({
      Tag: 'button',
      innerHTML: this.buttonLabel,
      classList: ['snipping__captureScreenshotBtn']
    });

    _snapButton.addEventListener('click', () => {
      _snapButtonContainer.style.display = 'none';
      this._takeScreenShot();
    });
    _snapButtonContainer.appendChild(_snapButton);
    document.body.appendChild(_snapButtonContainer);
  }

  //! TODO
  init(cb: Function) {
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      this._prepareSnapper();
      this._prepareDom();
      // ! TODO
      this._initEvents(cb);
    }
  }
}

export { Snipping };
