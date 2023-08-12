import { IRectangle, FieldCell, CellState, CellClickState } from '../types';
import { calcBombsFieldRect, calcCellRect, findCellPosition, checkClickCollide } from '../helpers';

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
    
    isFieldClick(positionX: number, positionY: number): boolean {
        return checkClickCollide(positionX, positionY, this.rect);
    }

    clickHanlder(positionX: number, positionY: number): CellClickState {
        const position = findCellPosition(
            positionX,
            positionY,
            this.rect
        );

        return position;
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