import {  IRectangle, ITextInfo, GameSquare } from "./types";
import { BORDER_COLOR, CANVAS_ID } from './setup';
import { drawEmptyRect } from './helpers';

export default class MainView {
    canvas: HTMLCanvasElement;
    private readonly _context: CanvasRenderingContext2D | null;
    private readonly _gameField: IRectangle;
    private readonly _nextFigureField: IRectangle;
    private readonly _scoreField: IRectangle;
    private readonly _soundButtonField: IRectangle;
    private readonly _textInfo: ITextInfo;
    private readonly _secondaryTextInfo: ITextInfo;
    private readonly _gameSquare: GameSquare;


    constructor () {
        this.canvas = document.querySelector(CANVAS_ID) as HTMLCanvasElement;
        this._context = this.canvas.getContext('2d');
        const gameFieldWidth = Math.round(this.canvas.width / 2);
        this._gameField = {
            positionX: Math.round(this.canvas.width / 2) - Math.round(gameFieldWidth / 2),
            positionY: Math.round(this.canvas.height / 2) - Math.round(gameFieldWidth / 2),
            width: gameFieldWidth,
            height: gameFieldWidth 
        };
    }

    clearGameField (): void {
        clearRect(this._context, this._gameField);
    }

    drawGameField (): void {

        drawEmptyRect(
            this._context,
            BORDER_COLOR,
            this._gameField.positionX,
            this._gameField.positionY,
            this._gameField.width,
            this._gameField.height,
            3
        );

    }

    get canvasRect (): DOMRect {
        return this.canvas.getBoundingClientRect();
    }
}