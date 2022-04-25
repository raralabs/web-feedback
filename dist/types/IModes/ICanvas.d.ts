declare type appId = string | number;
export declare namespace ICanvasMode {
  type IMarkMode = 'mark' | 'censored' | 'text';
  interface IConfig {
    button?: boolean;
    buttonLabel?: string;
    initialMarkMode?: IMarkMode;
    appId: appId;
    enableForm?: boolean;
    buttonPosition?: 'left' | 'bottom';
  }
}
export interface feedbackData {
  appId: appId;
}
export {};
