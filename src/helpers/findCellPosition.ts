import { type IRectangle, type CellClickState, CellState } from '../types';
import { FORM_SHADOW_WIDTH, CELL_SIZE } from '../setup';

export default function findCellPosition (
    positionX: number,
    positionY: number,
    field: IRectangle
): CellClickState {
    return {
        rowIndex: Math.floor(
            (positionY - field.positionY - FORM_SHADOW_WIDTH) / (CELL_SIZE + 1)
        ),
        columnIndex: Math.floor(
            (positionX - field.positionX - FORM_SHADOW_WIDTH) / (CELL_SIZE + 1)
        ),
        isLeftButton: false,
        state: CellState.Closed
    };
}
