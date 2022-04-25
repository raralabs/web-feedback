declare const icons: {
    textAnnotate: string;
    censorAnnotate: string;
    markAnnotate: string;
    right: string;
    close: string;
    undo: string;
};
declare const getIcon: (name: keyof typeof icons) => string;
export { getIcon };
