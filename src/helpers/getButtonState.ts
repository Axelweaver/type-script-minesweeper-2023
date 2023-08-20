import { MouseButtonState } from 'types';

export default function getButtonState (event: MouseEvent): MouseButtonState {
    if (event.type === 'mousedown') {
        switch (event.buttons) {
            case 1:
                return MouseButtonState.Left;
            case 2:
                return MouseButtonState.Right;
            case 3:
                return MouseButtonState.Both;
            case 4:
                return MouseButtonState.Middle;
            default:
                return MouseButtonState.Left;
        }
    }

    switch (event.button) {
        case 0:
            return MouseButtonState.Left;
        case 2:
            return MouseButtonState.Right;
        case 1:
            return MouseButtonState.Middle;
        default:
            return MouseButtonState.Left;
    }
}
