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