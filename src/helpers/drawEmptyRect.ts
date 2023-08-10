export default function drawEmptyRect (
    context: CanvasRenderingContext2D | null,
    color: string,
    x: number,
    y: number,
    width: number,
    height: number,
    lineWidth: number = 1): void {
    if (context == null) {
        return;
    }

    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    context.strokeRect(x, y, width, height);
}
