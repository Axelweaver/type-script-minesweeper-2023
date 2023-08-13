import { IRectangle } from '../types';
import { SMILE_FILL_COLOR } from '../setup';

export default function drawHappySmile(    
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
    const eyeRadius = radius / 8;

    context.fillStyle = SMILE_FILL_COLOR;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#000';
    context.stroke();

    context.beginPath();
    context.lineWidth = 2;
    context.arc(centerX, centerY, smileRadius, Math.PI / 6, Math.PI - Math.PI / 6, false);
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