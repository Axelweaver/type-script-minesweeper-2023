import { type IRectangle } from 'types';
import { SMILE_FILL_COLOR } from 'setup';

export default function drawSuprisedSmile (
    context: CanvasRenderingContext2D | null,
    rect: IRectangle
): void {
    if (context == null) {
        return;
    }
    const bodyPadding = rect.width / 7;
    const centerX = rect.positionX + rect.width / 2;
    const centerY = rect.positionY + rect.height / 2;
    const radius = rect.width / 2 - bodyPadding;
    const smileRadius = rect.width / 5;
    const eyeRadius = radius / 6;

    context.fillStyle = SMILE_FILL_COLOR;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#000';
    context.stroke();

    context.beginPath();
    context.lineWidth = 1;
    context.arc(centerX, centerY + smileRadius / 1.8, eyeRadius * 1.4, 0, 2 * Math.PI, false);
    context.stroke();

    context.fillStyle = '#000';
    context.beginPath();
    context.lineWidth = 1;
    context.arc(
        centerX - smileRadius / 2,
        centerY - smileRadius / 2,
        eyeRadius,
        0,
        2 * Math.PI,
        false);
    context.fill();

    context.beginPath();
    context.lineWidth = 1;
    context.arc(
        centerX + smileRadius / 2,
        centerY - smileRadius / 2,
        eyeRadius,
        0,
        2 * Math.PI,
        false);
    context.fill();
}
