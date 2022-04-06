/** check id document is ready or not */
const isDocumentReady = (): boolean => {
    return document.readyState === 'complete';
};

const createElement = (ElementName: string): HTMLElement => {
    return document.createElement(ElementName);
};

/** get elements by queryselector */
const getElement = (query: string): any => {
    return document.querySelectorAll(query);
};

/**
 *
 * getbouding information for element
 *
 */
const getDimensionOfElement = (elName: string) => {
    return document.getElementsByClassName(elName)[0].getBoundingClientRect();
};

const style = (element: HTMLElement, style: any) => {
    for (const property in style) element.style[property as any] = style[property];
};

const _createElement = (initObj: any) => {
    var element = document.createElement(initObj.Tag);
    for (var prop in initObj) {
        if (prop === 'childNodes') {
            initObj.childNodes.forEach(function (node: Node) {
                element.appendChild(node);
            });
        } else if (prop === 'attributes') {
            initObj.attributes.forEach(function (attr: any) {
                element.setAttribute(attr.key, attr.value);
            });
        } else element[prop] = initObj[prop];
    }

    return element;
};

export { createElement, isDocumentReady, getDimensionOfElement, getElement, style, _createElement };
