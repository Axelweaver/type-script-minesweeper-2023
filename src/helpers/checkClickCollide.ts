import { IRectangle } from '../types';

export default function checkClickCollide (
    positionX: number,
    positionY: number,
    rect: IRectangle
): boolean {

    return positionX > rect.positionX &&
    positionX < rect.positionX + rect.width &&
    positionY > rect.positionY &&
    positionY < rect.positionY + rect.height;
}