import { type IRectangle } from '../types';
import {
    TOP_INFO_HEIGHT,
    CELL_SIZE,
    SIDE_PANEL_PADDING,
    TOP_PANEL_PADDING,
    FORM_SHADOW_WIDTH
} from '../setup';

export default function calcBombsFieldRect (
    formPositionX: number,
    formPositionY: number,
    rowsCount: number,
    columnsCount: number): IRectangle {
    return {
        positionX: formPositionX + SIDE_PANEL_PADDING + FORM_SHADOW_WIDTH,
        positionY: formPositionY + TOP_PANEL_PADDING + TOP_INFO_HEIGHT + FORM_SHADOW_WIDTH * 4,
        width: (CELL_SIZE + 1) * columnsCount + FORM_SHADOW_WIDTH * 2,
        height: (CELL_SIZE + 1) * rowsCount + FORM_SHADOW_WIDTH * 2
    };
}
