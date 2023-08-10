import {  IRectangle, ITextInfo, GameSquare } from "./types";

export class MainView {
    canvas: HTMLCanvasElement;
    private readonly _context: CanvasRenderingContext2D | null;
    private readonly _gameField: IRectangle;
    private readonly _nextFigureField: IRectangle;
    private readonly _scoreField: IRectangle;
    private readonly _soundButtonField: IRectangle;
    private readonly _textInfo: ITextInfo;
    private readonly _secondaryTextInfo: ITextInfo;
    private readonly _gameSquare: GameSquare;


    constructor (canvasName: string) {
        this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
        this._context = this.canvas.getContext('2d');

    }
}