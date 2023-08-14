export interface IRectangle {
    positionX: number
    positionY: number
    width: number
    height: number
}

export interface ITextInfo {
    positionX: number
    positionY: number
    fontSize: number
    font: string
    align: CanvasTextAlign
}

export interface GameSquare {
    width: number
    height: number
}

export enum CellState {
    Closed,
    Pressed,
    Digit,
    Bomb,
    CurrentBomb,
    Empty,
    Flag,
    Unknown
}

export type CellClickState = {
    rowIndex: number;
    columnIndex: number;
    isLeftButton: boolean;
    state: CellState;
}

export type ClickFunc = (x: number, y: number, isLeftButton: boolean) => void;

export type MouseEventHandler = (e: MouseEvent) => void;

export type FieldCell = {
    state: CellState;
    value: number;
}

export type Bomb = {
    rowIndex: number;
    columnIndex: number;
}

export enum SmileButtonState {
    Happy,
    Surprised,
    Dead,
    CoolFace
}