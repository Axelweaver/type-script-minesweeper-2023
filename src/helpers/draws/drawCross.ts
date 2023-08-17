import { type IRectangle } from 'types';

export default function drawCross (
    context: CanvasRenderingContext2D | null,
    rect: IRectangle
): void {
    if (context == null) {
        return;
    }
    const linePadding = rect.width / 14;
    const angleLinePadding = linePadding * 2.8;

    context.lineWidth = rect.width / 10;
    context.strokeStyle = '#DD0000';

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

    context.fill();
}
