import { IRectangle, FieldCell, CellState, CellClickState, Bomb } from '../types';
import { 
    calcBombsFieldRect, 
    calcCellRect, 
    findCellPosition, 
    checkClickCollide,
    getRandomNumber
} from '../helpers';

export default class BombsField {
    readonly rect: IRectangle;
    private _cells: FieldCell[][];
    private _bombs: Bomb[];
    readonly rowsCount: number;
    readonly columnsCount: number;
    readonly bombsCount: number;
    private _callsCount: number;

    constructor(
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
        this.reset();
        this._callsCount = 0;
    }

    reset(): void {
        this._bombs = [];
        this._cells = [];
        for(let i = 0; i < this.rowsCount; ++i) {
            const row = [];
            for(let j = 0; j < this.columnsCount; ++j) {
                row.push({
                    state: CellState.Closed,
                    value: 0
                });
            }
            this._cells.push(row);
        }
    }

    createBombs(rowIndex: number, columnIndex: number): void {
        this._bombs = [];
        
        while(this._bombs.length < this.bombsCount) {
            const newRowIndex = getRandomNumber(0, this.rowsCount - 1);
            const newColumnIndex = getRandomNumber(0, this.columnsCount - 1);
            if(rowIndex !== newRowIndex &&
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

    isBomb(rowIndex: number, columnIndex: number): boolean {
        if(!this._bombs || !this._bombs.length) {
            return false;
        }

        return this._bombs.some((bomb: Bomb): boolean =>
            bomb.rowIndex === rowIndex &&
            bomb.columnIndex === columnIndex
        );
    }

    openCell(rowIndex: number, columnIndex: number): void {
        console.log('openCell call', ++this._callsCount);
        if(rowIndex < 0 || columnIndex < 0 || 
            rowIndex >= this.rowsCount ||
            columnIndex >= this.columnsCount ||
            this.isBomb(rowIndex, columnIndex)) {
            return;
        }

        console.log('openCell rowIndex: ', rowIndex, 'columnIndex: ', columnIndex);
        
        const cellState = this.getCellState(rowIndex, columnIndex);
        if(cellState !== CellState.Closed) {
            return;
        }
        
        console.log('cell state: ', cellState);

        let count = this._bombs.filter((bomb: Bomb): boolean => 
            bomb.rowIndex > rowIndex - 2 &&
            bomb.rowIndex < rowIndex + 2 &&
            bomb.columnIndex > columnIndex - 2 &&
            bomb.columnIndex < columnIndex + 2
            ).length;

        if(count > 0) {
            const cell = this._cells[rowIndex][columnIndex];
            cell.state = CellState.Digit;
            cell.value = count;
            console.log('bombs count around: ', count);
            return;
        }
        // it's empty cell
        this.setCellState(rowIndex, columnIndex, CellState.Empty);
        console.log('openCell empty', rowIndex, columnIndex, 'count: ', this._callsCount);

        const PI = Math.PI;
        let angle = 0;
        while (angle < 2 * PI) {
            const ri = rowIndex + Math.round(Math.sin(angle));
            const ci = columnIndex + Math.round(Math.cos(angle));
            if(ri >= 0 && ri < this.rowsCount && ci >=0 && ci < this.columnsCount &&
                this.getCellState(ri, ci) === CellState.Closed) {
                this.openCell(ri, ci);
            }
            angle += PI / 4;
        }
    }

    getCellState(rowIndex: number, columnIndex: number): CellState {
        return this._cells[rowIndex][columnIndex].state;
    }

    openBombs(rowIndex: number, columnIndex: number): void {
        this._bombs.forEach((bomb: Bomb): void => {
            const cell = this._cells[bomb.rowIndex][bomb.columnIndex];
            if(cell.state !== CellState.Bomb) {
                cell.state = CellState.Bomb;
            }
            if(bomb.rowIndex == rowIndex &&
                bomb.columnIndex == columnIndex) {
                cell.state = CellState.CurrentBomb;
            }
        });
     }

    setCellState(rowIndex: number, columnIndex: number, state: CellState): void {
        this._cells[rowIndex][columnIndex].state = state;
    }

    isFieldClick(positionX: number, positionY: number): boolean {
        return checkClickCollide(positionX, positionY, this.rect);
    }

    clickHanlder(positionX: number, positionY: number): CellClickState {
        const cellState = findCellPosition(
            positionX,
            positionY,
            this.rect
        );
        cellState.state = this.getCellState(cellState.rowIndex, cellState.columnIndex);
        return cellState;
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

    get bombs(): Bomb[] {
        return this._bombs;
    }
}