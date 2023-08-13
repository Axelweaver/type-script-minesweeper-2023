import { calcDigitRect, calcDigitsPanelRect } from '../helpers';

export default class DigitsPanel {
    readonly rect: IRectangle;
    readonly digitRects: IRectangle[];
    private _value: number;

    constructor(
        topPanelX: number,
        topPanelY: number,
        topPanelWidth: number,
        initialValue: number = 0,
        isPositionLeft: boolean = true){
        this._value = initialValue;
        this.rect = calcDigitsPanelRect(
            topPanelX,
            topPanelY,
            topPanelWidth,
            isPositionLeft
        );
        this.digitRects = [];
        for(let i = 0; i < 3; ++i) {
            this.digitRects.push(
                calcDigitRect(
                    this.rect.positionX,
                    this.rect.positionY,
                    i
                )
            );
        }
    }

    increase(): void {
        ++this._value;
        console.log('icrease', this._value);
    }

    decrease(): void {
        --this._value;
    }

    get values(): number[] {
        if(this._value < 0) {
            return [0, 0, 0];
        }
        if(this._value > 999) {
            return [9, 9, 9];
        }
        const values: number[] = [];
        let coef = 100;
        let tmpValue = this._value;
        while (values.length < 3) {
            const digit = Math.trunc(tmpValue / coef);
            values.push(digit);
            tmpValue = tmpValue - digit * coef;
            coef = coef / 10;
        }
        return values;
    }
}