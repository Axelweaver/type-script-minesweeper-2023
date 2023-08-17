import { type IRectangle } from 'types';

export default function drawFilledRect (
    context: CanvasRenderingContext2D | null,
    rect: IRectangle,
    color: string): void {
    if (context == null) {
        return;
    }
    context.fillStyle = color;
    context.fillRect(
        rect.positionX,
        rect.positionY,
        rect.width,
        rect.height
    );
}
