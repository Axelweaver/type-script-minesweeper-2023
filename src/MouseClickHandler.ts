import { type ClickFunc, type MouseEventHandler } from './types';

export default class MouseClickHandler {
    private readonly _canvasRect: DOMRect;

    constructor (canvasRect: DOMRect) {
        this._canvasRect = canvasRect;
        console.log('canvas rect', canvasRect);
    }

    getEventHadler(clickFn: ClickFunc ): MouseEventHandler {
        const canvasLeft = this._canvasRect.left;
        const canvasTop = this._canvasRect.top;

        return function(e: MouseEvent) {
            const x = e.clientX - canvasLeft;
            const y = e.clientY - canvasTop;

            clickFn(x, y);
        };
    }
}