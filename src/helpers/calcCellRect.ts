import { IRectangle } from '../types';
import { CELL_SIZE, FORM_SHADOW_WIDTH } from '../setup';

export default function calcCellRect(
    fieldPositionX: number,
    fieldPositionY: number,
    rowIndex: number,
    columnIndex: number
): IRectangle {
    return {
        positionX: fieldPositionX + FORM_SHADOW_WIDTH + (CELL_SIZE + 1) * columnIndex,
        positionY: fieldPositionY + FORM_SHADOW_WIDTH + (CELL_SIZE + 1) * rowIndex,
        width: CELL_SIZE,
        height: CELL_SIZE
    };
}