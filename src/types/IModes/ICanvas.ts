export namespace ICanvas_Mode {
    export interface IConfig {
        button?: boolean; // enables floating button
        buttonLabel?: string; // text for floating button
        initialMarkMode?: IMarkMode; // mark or censored
    }
    export type IMarkMode = 'mark' | 'censored';
}
