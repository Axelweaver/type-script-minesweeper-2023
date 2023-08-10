export default function drawCorner (
    context: CanvasRenderingContext2D | null,
    firstColor: string,
    secondColor: string,
    x: number,
    y: number,
    width: number,
    height: number): void {
    if (context == null) {
        return;
    }
    const offset = Math.round(width * 0.1);

    context.strokeStyle = firstColor;
    context.beginPath();

    context.lineWidth = 1;
    context.moveTo(x + offset, y + height - offset);
    context.lineTo(x + offset, y + offset);
    context.lineTo(x + width - offset, y + offset);
    context.stroke();

    context.beginPath();
    context.strokeStyle = secondColor;
    context.moveTo(x + offset, y + height - offset);
    context.lineTo(x - offset + width, y + height - offset);
    context.lineTo(x - offset + width, y + offset);

    context.stroke();
}
