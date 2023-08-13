import { IRectangle } from '../types';
import { 
    TOP_INFO_HEIGHT, 
    CELL_SIZE, 
    SIDE_PANEL_PADDING, 
    TOP_PANEL_PADDING,
    FORM_SHADOW_WIDTH
} from '../setup';

export default function calcFormRect (
    canvasWidth: number,
    canvasHeight: number,
    columnsCount: number,
    rowsCount: number): IRectangle {
        const rect: IRectangle = {
            positionX: 0,
            positionY: 0,
            width: (CELL_SIZE + 1) * columnsCount + SIDE_PANEL_PADDING * 2 + FORM_SHADOW_WIDTH * 4,
            height: (CELL_SIZE + 1) * rowsCount + TOP_PANEL_PADDING * 3 + TOP_INFO_HEIGHT 
            + FORM_SHADOW_WIDTH * 4
        };

        rect.positionX = Math.floor(canvasWidth / 2) - Math.floor(rect.width / 2);
        rect.positionY = Math.floor(canvasHeight / 2) - Math.floor(rect.height / 2)

        return rect;
}