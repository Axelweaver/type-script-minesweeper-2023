import { type IRectangle } from 'types';
import { CELL_DIGIT_COLORS } from 'setup';

export default function drawCellDigit (
    context: CanvasRenderingContext2D | null,
    rect: IRectangle,
    digit: number
): void {
    if (context == null) {
        return;
    }
    const fontSize = Math.floor(rect.width / 1.5);
    context.fillStyle = CELL_DIGIT_COLORS[digit];
    context.font = `${fontSize}px Minesweeper`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(
        digit.toString(),
        rect.positionX + rect.width / 2,
        rect.positionY + rect.height / 2);
}
