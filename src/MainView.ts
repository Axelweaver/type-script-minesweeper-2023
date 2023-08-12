import { IRectangle, Cell } from './types';
import { 
    CANVAS_ID, 
    FOREGROUND_COLOR,
    LIGHT_CORNER_COLOR,
    DARK_CORNER_COLOR,
    FORM_SHADOW_WIDTH,
    CELL_SHADOW_WIDTH
} from './setup';
import { drawCorner, drawFilledRect } from './helpers';
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

        this.drawRectWithShadow(
            cellRect,
            FOREGROUND_COLOR,
            LIGHT_CORNER_COLOR,
            DARK_CORNER_COLOR,
            CELL_SHADOW_WIDTH
        );
    }

    get canvasRect (): DOMRect {
        return this.canvas.getBoundingClientRect();
    }
}