import { IRectangle } from '../types';

export default function drawEmptyRect (
    context: CanvasRenderingContext2D | null,
    rect: IRectangle,
    color: string,
    lineWidth: number = 1): void {
    if (context == null) {
        return;
    }

    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    context.strokeRect(
        rect.positionX, 
        rect.positionY, 
        rect.width, 
        rect.height
    );
}
