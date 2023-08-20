import { type ClickFunc, type MouseEventHandler, type MouseButtonState } from 'types';

import { getButtonState } from 'helpers';

export default class MouseClickHandler {
    private readonly _canvasRect: DOMRect;

    constructor (canvasRect: DOMRect) {
        this._canvasRect = canvasRect;
    }

    getEventHadler (clickFn: ClickFunc): MouseEventHandler {
        const canvasLeft = this._canvasRect.left;
        const canvasTop = this._canvasRect.top;

        return function (e: MouseEvent) {
            // console.log('type:', e.type, 'button:', e.button, 'buttons', e.buttons);
            const x = e.clientX - canvasLeft;
            const y = e.clientY - canvasTop;
            const state: MouseButtonState = getButtonState(e);
            clickFn({ x, y, button: state });
        };
    }
}
