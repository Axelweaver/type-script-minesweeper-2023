import { IRectangle, CellClickState } from '../types';
import { FORM_SHADOW_WIDTH, CELL_SIZE } from '../setup';

export default function findCellPosition(
    positionX: number, 
    positionY: number,
    field: IRectangle
    ): CellClickState {
    return {
        rowIndex: Math.floor(
            (positionY - field.positionY - FORM_SHADOW_WIDTH) / CELL_SIZE
        ),
        columnIndex: Math.floor(
            (positionX - field.positionX - FORM_SHADOW_WIDTH) / CELL_SIZE
        ),
        isLeftButton: false
    }
}