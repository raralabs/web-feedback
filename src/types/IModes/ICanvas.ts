type appId = string | number;
export namespace ICanvas_Mode {
    export interface IConfig {
        button?: boolean; // enables floating button
        buttonLabel?: string; // text for floating button
        initialMarkMode?: IMarkMode; // mark or censored
        appId: appId;
    }
    export type IMarkMode = 'mark' | 'censored' | 'text';
}

export interface feedbackData {
    appId: appId;
}
