import '../../styles/style.scss';
import html2canvas from 'html2canvas';

let paths = [];
const mouseMove = (event: any) => {
    event.target.style.boxShadow = 'inset 0px 0px 1px 2px yellow';
};

const mouseOut = (event: any) => {
    if (!paths.includes(event.target)) event.target.style.boxShadow = 'none';
};
const createElement = (ElementName: string): any => {
    return document.createElement(ElementName);
};

const drawPaths = () => {
    if (paths.length != 0) {
        console.log(paths.flat());
        paths.flat().map((item: any, index: number) => {
            item.style.boxShadow = 'inset 0px 0px 1px 2px yellow';
        });
    }
};

const deleteTarget = (event: any) => {
    const target = event.srcElement.parentElement;
    target.classList.remove('selected');
    event.target.display = 'none';
    const newPaths = paths?.filter((item: any) => item != target);
    paths = [];
    paths.push(newPaths.flat());
    drawPaths();
};
const addDeleteBtn = (event: any) => {
    const deleteBtn = createElement('span');
    deleteBtn.innerHTML = 'X';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click', deleteTarget);
    event.target.appendChild(deleteBtn);
};
const onWindowclick = (event: any) => {
    if (!event.target.classList.contains('selected')) {
        event.target.boxShadow = 'inset 0px 0px 1px 2px yellow';
        event.target.style.postion = 'relative';
        event.target.classList.add('selected');
        addDeleteBtn(event);

        paths.push(event.target);

        drawPaths();
    }
    if (event.target.classList.contains('deleteBtn')) {
        event.target.parentElement.removeChild(event.target);
    }
};
const takeScreenShot = () => {
    const container = document.getElementsByClassName('feedbackContainer')[0];
    (container as any).style.display = 'none';
    html2canvas(document.body, {
        useCORS: true,
        x: window.scrollX,
        y: window.scrollY,
        width: window.innerWidth,
        height: window.innerHeight
    }).then(function (canvas) {
        document.body.appendChild(canvas);
        (container as any).style.display = 'block';

        console.log(canvas.toDataURL('image/png'));

        (document.getElementById('screenshot') as HTMLImageElement).src = canvas.toDataURL('image/png');
    });
};
const keyDown = (event: any) => {
    event.preventDefault();
    const { key } = event;
    if (key === ' ') {
        takeScreenShot();
    }
};

const init = (): void => {
    if (typeof document !== 'undefined') {
        window?.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseout', mouseOut);
        window.addEventListener('click', onWindowclick);
        window.addEventListener('keydown', keyDown);

        const div: HTMLElement = createElement('div');
        const feedBack: HTMLElement = createElement('div');
        const button: HTMLElement = createElement('button');
        const img: HTMLImageElement = createElement('img');
        div.classList.add('feedbackContainer');
        div.style.height = document.body.scrollHeight + 'px';
        div.style.width = window.innerWidth + 'px';

        feedBack.classList.add('feedback');
        /** button */
        button.classList.add('screenshotBtn');
        button.innerHTML = 'Take Screenshot';
        button.addEventListener('click', takeScreenShot);

        /** img */
        img.setAttribute('id', 'screenshot');

        feedBack.appendChild(button);
        feedBack.appendChild(img);
        div.appendChild(feedBack);
        document.body.appendChild(div);

        // html2canvas(document.body, {
        //     useCORS: true
        // }).then(function (canvas) {
        //     document.body.appendChild(canvas);
        // });
    }
};

export { init };
