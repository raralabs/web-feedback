type appId = string | number;
export namespace ICanvasMode {
  export type IMarkMode = 'mark' | 'censored' | 'text';
  export interface IConfig {
    button?: boolean; // enables floating button
    buttonLabel?: string; // text for floating button
    initialMarkMode?: IMarkMode; // mark or censored
    appId: appId; // app id
    enableForm?: boolean; // enables form
    buttonPosition?: 'left' | 'bottom'; // position of form
  }
}

export interface feedbackData {
  appId: appId;
}
