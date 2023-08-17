import { type IRectangle } from 'types';
import { FLAG_FILL_COLOR } from 'setup';

export default function drawCellFlag (
    context: CanvasRenderingContext2D | null,
    rect: IRectangle
): void {
    if (context == null) {
        return;
    }
    const bodyPadding = rect.width / 5.8;
    const linePadding = rect.width / 16;
    const bottomPadding = linePadding * 2.8;
    const centerX = rect.positionX + rect.width / 2;
    const centerY = rect.positionY + rect.height / 2;

    context.lineWidth = rect.width / 14;
    context.strokeStyle = '#000';
    context.beginPath();
    context.moveTo(centerX, centerY + linePadding * 0.8);
    context.lineTo(centerX, rect.positionY + rect.height - linePadding * 2.8);
    context.stroke();

    context.fillStyle = '#000';
    context.fillRect(
        rect.positionX + linePadding * 2.4,
        rect.positionY + rect.height - linePadding * 3.6,
        rect.width - linePadding * 4.8,
        bottomPadding * 0.5
    );

    context.beginPath();
    context.moveTo(
        rect.positionX + linePadding * 2.4,
        rect.positionY + rect.height - linePadding * 3.6
    );
    context.lineTo(
        centerX,
        centerY + linePadding * 2.2
    );
    context.lineTo(
        rect.positionX + rect.width - linePadding * 2.4,
        rect.positionY + rect.height - linePadding * 3.6
    );
    context.lineTo(
        rect.positionX + linePadding,
        rect.positionY + rect.height - linePadding * 3.6
    );
    context.fill();

    context.beginPath();
    context.fillStyle = FLAG_FILL_COLOR;
    context.moveTo(centerX + rect.width / 22, centerY + linePadding * 1.4);
    context.lineTo(
        rect.positionX + linePadding * 2,
        centerY - bodyPadding
    );
    context.lineTo(
        centerX + rect.width / 22,
        rect.positionY + linePadding * 2
    );
    context.lineTo(centerX + rect.width / 22, centerY + linePadding * 1.4);
    context.fill();
}
