import { type IRectangle } from '../types';
import { BOMB_FILL_COLOR, BOMB_SHADOW_COLOR } from '../setup';

export default function drawCellBomb (
    context: CanvasRenderingContext2D | null,
    rect: IRectangle
): void {
    if (context == null) {
        return;
    }
    const bodyPadding = rect.width / 5.8;
    const linePadding = rect.width / 16;
    const angleLinePadding = linePadding * 2.8;
    const centerX = rect.positionX + rect.width / 2;
    const centerY = rect.positionY + rect.height / 2;
    const radius = rect.width / 2 - bodyPadding;

    const shadowRadius = radius / 3.6;

    context.fillStyle = BOMB_FILL_COLOR;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fill();

    context.lineWidth = rect.width / 14;
    context.strokeStyle = BOMB_FILL_COLOR;
    context.beginPath();
    context.moveTo(rect.positionX + linePadding, centerY);
    context.lineTo(rect.positionX + rect.width - linePadding, centerY);
    context.stroke();

    context.beginPath();
    context.moveTo(centerX, rect.positionY + linePadding);
    context.lineTo(centerX, rect.positionY + rect.height - linePadding);
    context.stroke();

    context.beginPath();
    context.moveTo(rect.positionX + angleLinePadding, rect.positionY + angleLinePadding);
    context.lineTo(
        rect.positionX + rect.width - angleLinePadding,
        rect.positionY + rect.height - angleLinePadding
    );
    context.stroke();

    context.beginPath();
    context.moveTo(
        rect.positionX + rect.width - angleLinePadding,
        rect.positionY + angleLinePadding
    );
    context.lineTo(
        rect.positionX + angleLinePadding,
        rect.positionY + rect.height - angleLinePadding
    );
    context.stroke();

    context.fillStyle = BOMB_SHADOW_COLOR;
    context.beginPath();
    context.arc(
        centerX - bodyPadding / 1.8,
        centerY - bodyPadding / 1.8,
        shadowRadius,
        0,
        2 * Math.PI,
        false
    );
    context.fill();
}
