/** check id document is ready or not */
declare const isDocumentReady: () => boolean;
declare const createElement: (ElementName: string) => HTMLElement;
/** get elements by queryselector */
declare const getElement: (query: string) => any;
/**
 *
 * getbouding information for element
 *
 */
declare const getDimensionOfElement: (elName: string) => DOMRect;
/**
 *
 * clear markers (rectangle and censored)
 */
declare const clearMarkers: (markerName: string) => void;
declare const style: (element: HTMLElement, style: any) => void;
declare const _createElement: (initObj: any) => any;
export { createElement, isDocumentReady, getDimensionOfElement, getElement, clearMarkers, style, _createElement };
