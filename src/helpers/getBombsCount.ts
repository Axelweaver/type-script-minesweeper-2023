import { type Bomb } from 'types';

export default function getBombsCount (
    bombs: Bomb[],
    rowIndex: number,
    columnIndex: number
): number {
    return bombs.filter((bomb: Bomb): boolean =>
        bomb.rowIndex > rowIndex - 2 &&
        bomb.rowIndex < rowIndex + 2 &&
        bomb.columnIndex > columnIndex - 2 &&
        bomb.columnIndex < columnIndex + 2
    ).length;
}
