import { IRectangle } from '../types';
import { TOP_INFO_HEIGHT, INFO_PANEL_PADDING } from '../setup';

export default function calcSmileButtonRect(
    topPanelX: number,
    topPanelY: number,
    topPanelWidth: number
): IRectangle {
    const height = TOP_INFO_HEIGHT - INFO_PANEL_PADDING * 2;
    const positionX = topPanelX + Math.floor(topPanelWidth / 2) - Math.floor(height / 2);
    return {
        positionX,
        positionY: topPanelY + INFO_PANEL_PADDING,
        width: height,
        height
    };
}