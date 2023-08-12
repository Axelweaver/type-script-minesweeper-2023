import { IRectangle, FieldCell, CellState } from '../types';
import { calcBombsFieldRect, calcCellRect } from '../helpers';

export default class BombsField {
    readonly rect: IRectangle;
    private _cells: FieldCell[][];
    readonly rowsCount: number;
    readonly columnsCount: number;

    constructor(
        formPositionX: number,
        formPositionY: number,
        rowsCount: number,
        columnsCount: number) {
        this.rowsCount = rowsCount;
        this.columnsCount = columnsCount;

        this.rect = calcBombsFieldRect(
            formPositionX,
            formPositionY,
            rowsCount,
            columnsCount
        );

        this._cells = new Array(rowsCount).fill(
            new Array(columnsCount).fill({
                state: CellState.Closed,
                value: 0
            })
        );
    }

    getCellRect(rowIndex: number, columnIndex: number): IRectangle {
        return calcCellRect(
            this.rect.positionX,
            this.rect.positionY,
            rowIndex,
            columnIndex
        );
    }

    get cells(): FieldCell[][] {
        return this._cells;
    }
}