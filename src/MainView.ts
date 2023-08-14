import { IRectangle, FieldCell, CellState, SmileButtonState } from './types';
import { 
    CANVAS_ID, 
    FOREGROUND_COLOR,
    LIGHT_CORNER_COLOR,
    DARK_CORNER_COLOR,
    FORM_SHADOW_WIDTH,
    CELL_SHADOW_WIDTH,
    CELL_BORDER_COLOR,
    COUNTER_BACKGROUND_COLOR,
    BUTTON_SHADOW_WIDTH
} from './setup';
import { 
    drawCorner,
    drawFilledRect,
    drawEmptyRect,
    clearRect,
    drawDigit,
    drawHappySmile,
    drawSuprisedSmile,
    drawDeadSmile,
    drawCoolFaceSmile,
    drawCellFlag,
    drawCellBomb,
    drawCellDigit,
    drawText
} from './helpers';
import { GameForm, GameFormInfoPanel, BombsField, DigitsPanel } from './sprites';

export default class MainView {
    canvas: HTMLCanvasElement;
    private readonly _context: CanvasRenderingContext2D | null;

    constructor () {
        this.canvas = document.querySelector(CANVAS_ID) as HTMLCanvasElement;
        this._context = this.canvas.getContext('2d');

        drawText(
            this._context,
            { positionX: -30,
                positionY: -30,
                fontSize: 16,
                font: '16px Minesweeper',
                align: 'left'},
            '#000',
            'Start game!'
        )
    }

    drawRectWithShadow(
        rect: IRectangle, 
        color: string, 
        shadowColor1: string, 
        shadowColor2: string,
        shadowWidth: number): void {

        drawFilledRect(
            this._context,
            rect,
            color
        );

        drawCorner(
            this._context,
            rect,
            shadowColor1,
            shadowColor2,
            shadowWidth
        );
    }

    drawGameForm(form: GameForm): void {
        this.drawRectWithShadow(
            form.rect,
            FOREGROUND_COLOR,
            LIGHT_CORNER_COLOR,
            DARK_CORNER_COLOR,
            FORM_SHADOW_WIDTH            
        );
        this.drawInfoPanel(form.infoPanel);
        this.drawBombsField(form.bombsField);
    }

    drawInfoPanel(panel: GameFormInfoPanel): void {
        this.drawRectWithShadow(
            panel.rect,
            FOREGROUND_COLOR,
            DARK_CORNER_COLOR,
            LIGHT_CORNER_COLOR,
            FORM_SHADOW_WIDTH                      
        );
        this.drawDigitsPanel(panel.bombsCounter);
        this.drawDigitsPanel(panel.timer);
        this.drawSmileButton(panel.button);
    }

    drawBombsField(field: BombsField): void {
        this.drawRectWithShadow(
            field.rect,
            FOREGROUND_COLOR,
            DARK_CORNER_COLOR,
            LIGHT_CORNER_COLOR,
            FORM_SHADOW_WIDTH            
        );
        this.drawCells(field);
    }

    drawCells(field: BombsField): void {
        field.cells.forEach((row: FieldCell[], rowIndex: number): void => {
            row.forEach((column: FieldCell, columnIndex: number): void => {
                this.drawCell(field, rowIndex, columnIndex);
            });
        });
    }

    drawCell(field: BombsField, rowIndex: number, columnIndex: number): void {
        const cellRect = field.getCellRect(rowIndex, columnIndex);
        const cell = field.cells[rowIndex][columnIndex];
        const drawCellButton = (): void => {
            this.drawRectWithShadow(
                cellRect,
                FOREGROUND_COLOR,
                LIGHT_CORNER_COLOR,
                DARK_CORNER_COLOR,
                CELL_SHADOW_WIDTH
            );             
        };
        const drawEmptyCell = (color: string): void => {
            drawFilledRect(
                this._context,
                cellRect,
                color
            );
            drawEmptyRect(
                this._context,
                cellRect,
                CELL_BORDER_COLOR
            );
        };
        switch (cell.state) {
            case CellState.Closed:
                drawCellButton();
                break;
            case CellState.Empty:
                drawEmptyCell(FOREGROUND_COLOR);
                break;
            case CellState.Bomb:
                drawEmptyCell(FOREGROUND_COLOR);
                drawCellBomb(this._context, cellRect);
                break;
            case CellState.CurrentBomb:
                drawEmptyCell('#CC0000');
                drawCellBomb(this._context, cellRect);
                break;
            case CellState.Flag:
                drawCellButton();
                drawCellFlag(this._context, cellRect);
                break;
            case CellState.Digit:
                drawEmptyCell(FOREGROUND_COLOR);
                drawCellDigit(this._context, cellRect, cell.value);
            default:
                break;
        }

    }

    drawCellPressed(field: BombsField, rowIndex: number, columnIndex: number): void {
        const cellRect = field.getCellRect(rowIndex, columnIndex);        
        this.drawRectWithShadow(
            cellRect,
            FOREGROUND_COLOR,
            DARK_CORNER_COLOR,
            LIGHT_CORNER_COLOR,
            CELL_SHADOW_WIDTH
        ); 
    }

    clearCell(field: BombsField, rowIndex: number, columnIndex: number): void {
        const cellRect = field.getCellRect(rowIndex, columnIndex);
        clearRect(this._context, cellRect);
    }

    clearRect(rect: IRectangle):void {
        clearRect(this._context, rect);
    }

    drawDigitsPanel(panel: DigitsPanel): void {
        this.drawRectWithShadow(
            panel.rect,
            COUNTER_BACKGROUND_COLOR,
            DARK_CORNER_COLOR,
            LIGHT_CORNER_COLOR,
            1
        );
        this.drawDigits(panel.digitRects, panel.values);
    }

    drawDigits(rects: IRectangle[], digits: number[]): void {
        rects.forEach((row: IRectangle, rowIndex: number): void => {
            drawDigit(this._context, row, digits[rowIndex]);
        });
    }

    drawDigit(rect: IRectangle, digit: number): void {
        drawDigit(this._context, rect, digit);
    }

    drawSmileButton(
        rect: IRectangle, 
        state: SmileButtonState = SmileButtonState.Happy
        ): void {
        this.drawRectWithShadow(
            rect,
            FOREGROUND_COLOR,
            LIGHT_CORNER_COLOR,
            DARK_CORNER_COLOR,
            BUTTON_SHADOW_WIDTH
        );

        switch(state) {
            case SmileButtonState.Happy:
                drawHappySmile(this._context, rect);
                break;
            case SmileButtonState.Surprised:
                drawSuprisedSmile(this._context, rect);
                break;
            case SmileButtonState.Dead:
                drawDeadSmile(this._context, rect);
                break;
            case SmileButtonState.CoolFace:
                drawCoolFaceSmile(this._context, rect);
                break;
            default:
                drawHappySmile(this._context, rect);
                break;
        }
    }

    drawSmileButtonPressed(rect: IRectangle): void {
        this.drawRectWithShadow(
            rect,
            FOREGROUND_COLOR,
            DARK_CORNER_COLOR,
            LIGHT_CORNER_COLOR,
            Math.round(BUTTON_SHADOW_WIDTH / 2)
        );
        drawSuprisedSmile(this._context, rect);
    }

    get canvasRect (): DOMRect {
        return this.canvas.getBoundingClientRect();
    }

    get context(): CanvasRenderingContext2D {
        return this._context;
    }
}