export declare namespace ICanvas_Mode {
    interface IConfig {
        button?: boolean;
        buttonLabel?: string;
        initialMarkMode: IMarkMode;
    }
    type IMarkMode = 'mark' | 'censored';
}
