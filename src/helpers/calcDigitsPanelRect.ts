import { TOP_INFO_HEIGHT, INFO_PANEL_PADDING } from '../setup';
import { type IRectangle } from '../types';

export default function calcDigitsPanelRect (
    topPanelX: number,
    topPanelY: number,
    topPanelWidth: number,
    isPositionLeft: boolean = true
): IRectangle {
    const height = TOP_INFO_HEIGHT - INFO_PANEL_PADDING * 2;
    const width = Math.floor(height / 2) * 3;
    const positionX = isPositionLeft
        ? topPanelX + INFO_PANEL_PADDING
        : topPanelX + topPanelWidth - width - INFO_PANEL_PADDING - 2;

    return {
        positionX,
        positionY: topPanelY + INFO_PANEL_PADDING,
        width,
        height
    };
}
