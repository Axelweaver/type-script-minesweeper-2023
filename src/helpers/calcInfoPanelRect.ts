import { IRectangle } from '../types';
import { 
    TOP_INFO_HEIGHT, 
    CELL_SIZE, 
    SIDE_PANEL_PADDING, 
    TOP_PANEL_PADDING,
    FORM_SHADOW_WIDTH
} from '../setup';

export default function calcInfoPanelRect(
    formPositionX: number,
    formPositionY: number,
    columnsCount: number): IRectangle {
    
        const rect: IRectangle = {
        positionX: formPositionX + SIDE_PANEL_PADDING + FORM_SHADOW_WIDTH,
        positionY: formPositionY + TOP_PANEL_PADDING + FORM_SHADOW_WIDTH,
        width: CELL_SIZE * columnsCount + FORM_SHADOW_WIDTH * 2,
        height: TOP_INFO_HEIGHT
    };

    return rect;
}