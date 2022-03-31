/** stylesheet */
import '../../styles/style.scss';
import { ICanvas_Mode } from '../../types/IModes/ICanvas';
declare class snipping {
    buttonLabel: string;
    markMode: ICanvas_Mode.IMarkMode;
    snippingHeaderHTML: string;
    constructor(config: ICanvas_Mode.IConfig);
    _clearMarkers(markerName: string): void;
    _delMarker(e: any): string;
    _initDraw(canvas: any): void;
    _takeScreenShot: () => void;
    _done(): void;
    _initEvents(): void;
    _prepareDom(): void;
    _prepareSnapper(): void;
    init(): void;
}
export { snipping };
