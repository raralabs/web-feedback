export namespace ICanvasMode {
  export type IMarkMode = 'mark' | 'censored' | 'text';
  export interface IConfig {
    button?: boolean; // enables floating button
    buttonLabel?: string; // text for floating button
    initialMarkMode?: IMarkMode; // mark or censored
    buttonPosition?: 'left' | 'bottom'; // position of form
    fileName?: string; // name of file
  }
}

export interface IFeedbackData {
  base64Image: string;
  image: File;
}

export interface ICallback {
  (data: IFeedbackData): void;
}
