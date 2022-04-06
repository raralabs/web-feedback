/** stylesheet */
import '../../styles/style.scss';
import { ICanvasMode } from '../../types/IModes/ICanvas';
declare class snap {
  buttonLabel: string;
  markMode: ICanvasMode.IMarkMode;
  snippingHeaderHTML: string;
  constructor(config: ICanvasMode.IConfig);
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
export { snap };
