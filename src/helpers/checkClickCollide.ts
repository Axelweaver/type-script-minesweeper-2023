import { type IRectangle } from '../types';

export default function checkClickCollide (
    positionX: number,
    positionY: number,
    rect: IRectangle,
    shadowWidth: number = 0
): boolean {
    return positionX > rect.positionX + shadowWidth &&
    positionX < rect.positionX + rect.width - shadowWidth &&
    positionY > rect.positionY + shadowWidth &&
    positionY < rect.positionY + rect.height - shadowWidth;
}
