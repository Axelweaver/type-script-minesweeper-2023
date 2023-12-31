import { type IRectangle } from 'types';
import { SMILE_FILL_COLOR } from 'setup';

export default function drawCoolFaceSmile (
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
    const eyeRadius = radius / 3.4;
    const PI = Math.PI;

    context.fillStyle = SMILE_FILL_COLOR;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * PI, false);
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#000';
    context.stroke();

    context.beginPath();
    context.lineWidth = 2;
    context.arc(centerX, centerY, smileRadius, PI / 6, PI - PI / 6, false);
    context.stroke();

    context.fillStyle = '#000';
    context.fillRect(
        centerX - eyeRadius * 2.4,
        centerY - eyeRadius * 1.4,
        eyeRadius * 4.7,
        eyeRadius / 2
    );

    context.beginPath();
    context.lineWidth = 1;
    context.arc(
        centerX - smileRadius / 1.6,
        centerY - smileRadius / 2,
        eyeRadius,
        0,
        PI,
        false);
    context.fill();

    context.beginPath();
    context.lineWidth = 1;
    context.arc(
        centerX + smileRadius / 1.6,
        centerY - smileRadius / 2,
        eyeRadius,
        0,
        PI,
        false);
    context.fill();

    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(
        centerX - eyeRadius * 2.2,
        centerY - eyeRadius * 1.4
    );
    context.lineTo(
        centerX - radius,
        centerY
    );
    context.stroke();

    context.beginPath();
    context.moveTo(
        centerX + eyeRadius * 2.2,
        centerY - eyeRadius * 1.4
    );
    context.lineTo(
        centerX + radius,
        centerY
    );
    context.stroke();
}
