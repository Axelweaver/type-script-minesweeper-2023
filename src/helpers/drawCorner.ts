import { IRectangle } from '../types';

export default function drawCorner (
    context: CanvasRenderingContext2D | null,
    rect: IRectangle,
    firstColor: string,
    secondColor: string,
    shadowWidth: number): void {
    if (context == null) {
        return;
    }

    for(let i = 0; i <= shadowWidth; ++i) {
        context.strokeStyle = firstColor;
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(rect.positionX + i, rect.positionY + rect.height - i);
        context.lineTo(rect.positionX + i, rect.positionY + i);
        context.lineTo(rect.positionX + rect.width - i, rect.positionY + i);
        context.stroke();

        context.strokeStyle = secondColor;
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(rect.positionX + i, rect.positionY + rect.height - i);
        context.lineTo(rect.positionX - i + rect.width, rect.positionY + rect.height - i);
        context.lineTo(rect.positionX - i + rect.width, rect.positionY + i);
        context.stroke();
    }
}
