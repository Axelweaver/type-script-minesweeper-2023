import {
    type IRectangle,
    type FieldCell,
    CellState,
    type CellClickState,
    type Bomb
} from 'types';
import {
    calcBombsFieldRect,
    calcCellRect,
    findCellPosition,
    checkClickCollide,
    getRandomNumber,
    checkAround
} from 'helpers';
import { FORM_SHADOW_WIDTH } from 'setup';

export default class BombsField {
    readonly rect: IRectangle;
    private _cells: FieldCell[][];
    private _bombs: Bomb[];
    readonly rowsCount: number;
    readonly columnsCount: number;
    readonly bombsCount: number;

    constructor (
        formPositionX: number,
        formPositionY: number,
        rowsCount: number,
        columnsCount: number,
        bombsCount: number
    ) {
        this.rowsCount = rowsCount;
        this.columnsCount = columnsCount;
        this.bombsCount = bombsCount;
        this.rect = calcBombsFieldRect(
            formPositionX,
            formPositionY,
            rowsCount,
            columnsCount
        );
        this._bombs = [];
        this._cells = [];
        this.reset();
    }

    reset (): void {
        this._bombs = [];
        this._cells = [];
        for (let i = 0; i < this.rowsCount; ++i) {
            const row = [];
            for (let j = 0; j < this.columnsCount; ++j) {
                row.push({
                    state: CellState.Closed,
                    value: 0
                });
            }
            this._cells.push(row);
        }
    }

    createBombs (rowIndex: number, columnIndex: number): void {
        this._bombs = [];

        while (this._bombs.length < this.bombsCount) {
            const newRowIndex = getRandomNumber(0, this.rowsCount - 1);
            const newColumnIndex = getRandomNumber(0, this.columnsCount - 1);
            if (rowIndex !== newRowIndex &&
                columnIndex !== newColumnIndex &&
                !this._bombs.some((bomb: Bomb): boolean =>
                    bomb.rowIndex === newRowIndex &&
                    bomb.columnIndex === newColumnIndex
                )) {
                this._bombs.push({
                    rowIndex: newRowIndex,
                    columnIndex: newColumnIndex
                });
            }
        }
    }

    isWin (): boolean {
        let openCellsCount = 0;
        this._cells.forEach(
            (row: FieldCell[]): void => {
                row.forEach((column: FieldCell): void => {
                    openCellsCount = column.state === CellState.Empty ||
                column.state === CellState.Digit
                        ? openCellsCount + 1
                        : openCellsCount;
                });
            });
        return (this.rowsCount * this.columnsCount - openCellsCount) === this.bombsCount;
    }

    isBomb (rowIndex: number, columnIndex: number): boolean {
        if (this._bombs?.length === 0) {
            return false;
        }

        return this._bombs.some((bomb: Bomb): boolean =>
            bomb.rowIndex === rowIndex &&
            bomb.columnIndex === columnIndex
        );
    }

    openCell (rowIndex: number, columnIndex: number): void {
        if (rowIndex < 0 || columnIndex < 0 ||
            rowIndex >= this.rowsCount ||
            columnIndex >= this.columnsCount ||
            this.isBomb(rowIndex, columnIndex)) {
            return;
        }
        const cellState = this.getCellState(rowIndex, columnIndex);
        if (cellState !== CellState.Closed) {
            return;
        }
        const count = this._bombs.filter((bomb: Bomb): boolean =>
            bomb.rowIndex > rowIndex - 2 &&
            bomb.rowIndex < rowIndex + 2 &&
            bomb.columnIndex > columnIndex - 2 &&
            bomb.columnIndex < columnIndex + 2
        ).length;

        if (count > 0) {
            const cell = this._cells[rowIndex][columnIndex];
            cell.state = CellState.Digit;
            cell.value = count;
            return;
        }
        // it's empty cell
        this.setCellState(rowIndex, columnIndex, CellState.Empty);
        checkAround(
            rowIndex,
            columnIndex,
            this.rowsCount,
            this.columnsCount,
            (ri: number, ci: number): void => {
                if (this.getCellState(ri, ci) === CellState.Closed) {
                    this.openCell(ri, ci);
                }
            }
        );

        // const PI = Math.PI;
        // let angle = 0;
        // while (angle < 2 * PI) {
        //     const ri = rowIndex + Math.round(Math.sin(angle));
        //     const ci = columnIndex + Math.round(Math.cos(angle));
        //     if (ri >= 0 && ri < this.rowsCount && ci >= 0 && ci < this.columnsCount &&
        //         this.getCellState(ri, ci) === CellState.Closed) {
        //         this.openCell(ri, ci);
        //     }
        //     angle += PI / 4;
        // }
    }

    getCellState (rowIndex: number, columnIndex: number): CellState {
        return this._cells[rowIndex][columnIndex].state;
    }

    openBombs (rowIndex: number, columnIndex: number): void {
        this._bombs.forEach((bomb: Bomb): void => {
            const cell = this._cells[bomb.rowIndex][bomb.columnIndex];
            if (cell.state !== CellState.Bomb) {
                cell.state = CellState.Bomb;
            }
            if (bomb.rowIndex === rowIndex &&
                bomb.columnIndex === columnIndex) {
                cell.state = CellState.CurrentBomb;
            }
        });
    }

    setCellState (rowIndex: number, columnIndex: number, state: CellState): void {
        this._cells[rowIndex][columnIndex].state = state;
    }

    isFieldClick (positionX: number, positionY: number): boolean {
        return checkClickCollide(positionX, positionY, this.rect, FORM_SHADOW_WIDTH);
    }

    clickHanlder (positionX: number, positionY: number): CellClickState {
        const cellState = findCellPosition(
            positionX,
            positionY,
            this.rect
        );
        cellState.state = this.getCellState(cellState.rowIndex, cellState.columnIndex);
        return cellState;
    }

    getCellRect (rowIndex: number, columnIndex: number): IRectangle {
        return calcCellRect(
            this.rect.positionX,
            this.rect.positionY,
            rowIndex,
            columnIndex
        );
    }

    get cells (): FieldCell[][] {
        return this._cells;
    }

    get bombs (): Bomb[] {
        return this._bombs;
    }
}
