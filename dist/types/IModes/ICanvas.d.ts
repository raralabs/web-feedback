declare type appId = string | number;
export declare namespace ICanvas_Mode {
    interface IConfig {
        button?: boolean;
        buttonLabel?: string;
        initialMarkMode?: IMarkMode;
        appId: appId;
    }
    type IMarkMode = 'mark' | 'censored' | 'text';
}
export interface feedbackData {
    appId: appId;
}
export {};
