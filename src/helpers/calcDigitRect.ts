import { TOP_INFO_HEIGHT, INFO_PANEL_PADDING } from '../setup';
import { type IRectangle } from '../types';

export default function calcDigitRect (
    digitsPanelX: number,
    digitsPanelY: number,
    numberDigit: number
): IRectangle {
    const height = TOP_INFO_HEIGHT - INFO_PANEL_PADDING * 2;
    const width = Math.floor(height / 2);
    return {
        positionX: digitsPanelX + width * numberDigit,
        positionY: digitsPanelY,
        width,
        height
    };
}
