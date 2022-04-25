/** stylesheet */
import '../../styles/style.scss';
import { ICanvasMode } from '../../types/IModes/ICanvas';
declare class Snipping {
    buttonLabel: string;
    markMode: ICanvasMode.IMarkMode;
    annotateLists: any[];
    snippingHeaderHTML: string;
    appId: string | number;
    enableForm: boolean;
    buttonPosition: 'left' | 'bottom';
    textAnnotateCount: number;
    constructor(config: ICanvasMode.IConfig);
    _clearMarkers(markerName: string): void;
    _delMarker(e: any): string;
    _initDraw(canvas: HTMLDivElement): void;
    _takeScreenShot: () => void;
    _done(cb: Function): void;
    __changeActiveTool: (el: HTMLElement, inActiveEl: Array<HTMLElement>) => void;
    _initEvents(cb: Function): void;
    _prepareDom(): void;
    _prepareSnapper(): void;
    init(cb: Function): void;
}
export { Snipping };
