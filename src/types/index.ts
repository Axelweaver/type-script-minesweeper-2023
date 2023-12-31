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
    CurrentBomb,
    Empty,
    Flag,
    WrongFlag,
    Unknown
}
export enum MouseButtonState {
    Left,
    Right,
    Both,
    Middle
}
export interface MouseClickState {
    x: number
    y: number
    button: MouseButtonState
}
export interface CellClickState {
    rowIndex: number
    columnIndex: number
    isLeftButton: boolean
    state: CellState
}
export interface CellInfo {
    rowIndex: number
    columnIndex: number
    state: CellState
}
export type ClickFunc = (clickState: MouseClickState) => void;

export type MouseEventHandler = (e: MouseEvent) => void;

export interface FieldCell {
    state: CellState
    value: number
};

export interface Bomb {
    rowIndex: number
    columnIndex: number
};

export enum SmileButtonState {
    Happy,
    Surprised,
    Dead,
    CoolFace
}
