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
    Digit,
    Bomb,
    Empty,
    Flag,
    Unknown
}

export type ClickFunc = (x: number, y: number) => void;

export type MouseEventHandler = (e: MouseEvent) => void;

export type FieldCell = {
    state: CellState,
    value: number
}