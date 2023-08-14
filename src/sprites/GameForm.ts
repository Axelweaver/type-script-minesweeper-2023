import { type IRectangle } from '../types';
import { calcFormRect } from '../helpers';
import { GameFormInfoPanel, BombsField } from '../sprites';

export default class GameForm {
    readonly rect: IRectangle;
    readonly infoPanel: GameFormInfoPanel;
    readonly bombsField: BombsField;

    constructor (
        canvasWidth: number,
        canvasHeight: number,
        rowsCount: number,
        columnsCount: number,
        bombsCount: number
    ) {
        this.rect = calcFormRect(
            canvasWidth,
            canvasHeight,
            rowsCount,
            columnsCount
        );

        this.infoPanel = new GameFormInfoPanel(
            this.rect.positionX,
            this.rect.positionY,
            columnsCount,
            bombsCount
        );

        this.bombsField = new BombsField(
            this.rect.positionX,
            this.rect.positionY,
            rowsCount,
            columnsCount,
            bombsCount
        );
    }
}
