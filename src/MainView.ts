import { IRectangle, FieldCell, CellState } from './types';
import { 
    CANVAS_ID, 
    FOREGROUND_COLOR,
    LIGHT_CORNER_COLOR,
    DARK_CORNER_COLOR,
    FORM_SHADOW_WIDTH,
    CELL_SHADOW_WIDTH,
    CELL_BORDER_COLOR
} from './setup';
import { drawCorner, drawFilledRect, drawEmptyRect, clearRect } from './helpers';
import { GameForm, GameFormInfoPanel, BombsField } from './sprites';

export default class MainView {
    canvas: HTMLCanvasElement;
    private readonly _context: CanvasRenderingContext2D | null;

    constructor () {
        this.canvas = document.querySelector(CANVAS_ID) as HTMLCanvasElement;
        this._context = this.canvas.getContext('2d');

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
        switch (cell.state) {
            case CellState.Closed:
                this.drawRectWithShadow(
                    cellRect,
                    FOREGROUND_COLOR,
                    LIGHT_CORNER_COLOR,
                    DARK_CORNER_COLOR,
                    CELL_SHADOW_WIDTH
                );                
                break;
            case CellState.Empty:
                drawFilledRect(
                    this._context,
                    cellRect,
                    FOREGROUND_COLOR
                );
                drawEmptyRect(
                    this._context,
                    cellRect,
                    CELL_BORDER_COLOR
                );
                break;
            default:
                break;
        }

    }

    clearCell(field: BombsField, rowIndex: number, columnIndex: number): void {
        const cellRect = field.getCellRect(rowIndex, columnIndex);
        clearRect(this._context, cellRect);
    }

    get canvasRect (): DOMRect {
        return this.canvas.getBoundingClientRect();
    }
}