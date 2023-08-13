import { IRectangle } from '../types';
import { calcInfoPanelRect } from '../helpers';
import { DigitsPanel } from '../sprites';

export default class GameFormInfoPanel {
    readonly rect: IRectangle;
    readonly timer: DigitsPanel;
    readonly bombsCounter: DigitsPanel;

    constructor(
        formPositionX: number,
        formPositionY: number,
        columnsCount: number,
        bombsCount: number
        ) {
        this.rect = calcInfoPanelRect(
            formPositionX,
            formPositionY,
            columnsCount
        );
        this.bombsCounter = new DigitsPanel(
            this.rect.positionX,
            this.rect.positionY,
            this.rect.width,
            bombsCount
        );
        this.timer = new DigitsPanel(
            this.rect.positionX,
            this.rect.positionY,
            this.rect.width,
            0,
            false
        );
    }
}