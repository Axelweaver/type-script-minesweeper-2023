import {
    type IRectangle,
    type FieldCell,
    CellState,
    type CellClickState,
    type Bomb,
    type CellInfo
} from 'types';
import {
    calcBombsFieldRect,
    calcCellRect,
    findCellPosition,
    checkClickCollide,
    getRandomNumber,
    checkAround,
    getBombsCount
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
        const count = getBombsCount(
            this._bombs,
            rowIndex,
            columnIndex
        );

        if (count > 0) {
            const cell = this._cells[rowIndex][columnIndex];
            cell.state = CellState.Digit;
            cell.value = count;
            return;
        }
        // it's cell is empty
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
    }

    getCellState (rowIndex: number, columnIndex: number): CellState {
        return this._cells[rowIndex][columnIndex].state;
    }

    getCellsAround (rowIndex: number, columnIndex: number): CellInfo[] {
        const cellsAround: CellInfo[] = [];
        checkAround(
            rowIndex,
            columnIndex,
            this.rowsCount,
            this.columnsCount,
            (ri: number, ci: number): void => {
                cellsAround.push({
                    rowIndex: ri,
                    columnIndex: ci,
                    state: this._cells[ri][ci].state
                });
            }
        );

        return cellsAround;
    }

    checkCellAroundDigit (rowIndex: number, columnIndex: number): CellInfo[] {
        const cellState = this.getCellState(rowIndex, columnIndex);
        // console.log('openCellAroundDigit', cellState);
        if (cellState !== CellState.Digit) {
            return [];
        }
        const cellsAround: CellInfo[] = this.getCellsAround(rowIndex, columnIndex);

        const digit = this._cells[rowIndex][columnIndex].value;
        const flagsCount = cellsAround.filter(
            (cell: CellInfo): boolean => cell.state === CellState.Flag
        ).length;
        // console.log('openCellAroundDigit', digit, flagsCount);
        if (digit !== flagsCount) {
            return [];
        }

        return cellsAround;
    }

    openBombs (rowIndex: number, columnIndex: number): void {
        this._bombs.forEach((bomb: Bomb): void => {
            const cell = this._cells[bomb.rowIndex][bomb.columnIndex];
            if (cell.state !== CellState.Bomb &&
                cell.state !== CellState.Flag) {
                cell.state = CellState.Bomb;
            }
            if (bomb.rowIndex === rowIndex &&
                bomb.columnIndex === columnIndex) {
                cell.state = CellState.CurrentBomb;
            }
        });
        this._cells.forEach((row: FieldCell[], ri: number): void => {
            row.forEach((cell: FieldCell, ci: number): void => {
                if (cell.state === CellState.Flag &&
                    !this._bombs.some((bomb: Bomb): boolean =>
                        bomb.rowIndex === ri && bomb.columnIndex === ci
                    )) {
                    cell.state = CellState.WrongFlag;
                }
            });
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
