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
        if(rowIndex < 0 || columnIndex < 0 || 
            rowIndex >= this.rowsCount ||
            columnIndex >= this.columnsCount) {
            return;
        }
        console.log('openCell', rowIndex, columnIndex);
        const cell = this._cells[rowIndex][columnIndex];

        if(cell.state !== CellState.Closed) {
            return;
        }
        
        console.log('cell state: ', cell.state);

        let count = 0;

        this._bombs.forEach((bomb: Bomb): void => {
            if(bomb.rowIndex > rowIndex - 2 &&
                bomb.rowIndex < rowIndex + 2 &&
                bomb.columnIndex > columnIndex - 2 &&
                bomb.columnIndex < columnIndex + 2) {
                    ++count;
                }
        });


        if(count > 0) {
            cell.state = CellState.Digit;
            cell.value = count;
            console.log('bombs count around: ', count);
            return;
        }
        cell.state = CellState.Empty;
        console.log('openCell empty', rowIndex, columnIndex, 'count: ', count);
        this.checkAround(rowIndex, columnIndex);
    }

    checkAround(rowIndex: number, columnIndex: number): void {
        for (let i = rowIndex - 1; i < rowIndex + 2; ++i) {
            for (let j = columnIndex - 1; j < columnIndex + 2; ++j) {
                if(i < 0 || j < 0 || i >= this.rowsCount ||
                    j >= this.columnsCount ||
                    rowIndex === i && columnIndex === j) {
                    continue;
                }
                this.openCell(i, j);
                // const openCellFunc = (): void => {
                //     this.openCell(i, j).bind(this);
                // };                
                // setTimeout(openCellFunc, 1);
            }
        }
    }

    openBombs(rowIndex: number, columnIndex: number): void {
        this._bombs.forEach((bomb: Bomb): void => {
            const cell = this._cells[bomb.rowIndex][bomb.columnIndex];
            if(cell.state !== CellState.Bomb) {
                cell.state = CellState.Bomb;
            }
        });
        this._cells[rowIndex][columnIndex].state = CellState.CurrentBomb;
    }

    setCellState(rowIndex: number, columnIndex: number, state: CellState): void {
        this._cells[rowIndex][columnIndex].state = state;
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

    get bombs(): Bomb[] {
        return this._bombs;
    }
}