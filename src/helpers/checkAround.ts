export default function checkAround (
    rowIndex: number,
    columnIndex: number,
    rowsCount: number,
    columnsCount: number,
    checkFunc: (ri: number, ci: number) => void
): void {
    const PI = Math.PI;
    let angle = 0;
    while (angle < 2 * PI) {
        const ri = rowIndex + Math.round(Math.sin(angle));
        const ci = columnIndex + Math.round(Math.cos(angle));
        if (ri >= 0 && ri < rowsCount && ci >= 0 && ci < columnsCount) {
            //         this.getCellState(ri, ci) === CellState.Closed)
            // this.openCell(ri, ci);
            checkFunc(ri, ci);
        }
        angle += PI / 4;
    }
}
