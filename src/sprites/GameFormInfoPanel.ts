import { IRectangle } from '../types';
import { calcInfoPanelRect } from '../helpers';

export default class GameFormInfoPanel {
    readonly rect: IRectangle;
    constructor(
        formPositionX: number,
        formPositionY: number,
        columnsCount: number) {
            this.rect = calcInfoPanelRect(
                formPositionX,
                formPositionY,
                columnsCount
            );
    }
}