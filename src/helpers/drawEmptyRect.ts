export default function drawEmptyRect (
    context: CanvasRenderingContext2D | null,
    color: string,
    x: number,
    y: number,
    width: number,
    height: number): void {
    if (context == null) {
        return;
    }

    context.strokeStyle = color;
    context.strokeRect(x, y, width, height);
}
