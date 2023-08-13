import MainView from './MainView';
import { GameForm } from './sprites';
import MouseClickHandler from './MouseClickHandler';
import { CellState, CellClickState } from './types';

const view = new MainView();
const clickHanlder = new MouseClickHandler(view.canvasRect);
const gameForm = new GameForm(
    view.canvas.width,
    view.canvas.height,
    9,
    9,
    10
);

view.drawGameForm(gameForm);
let firstClick = false;
let lastClickCell: CellClickState;
let lastLeftClick = false;

const mouseDownFunc = (x: number, y: number, isLeftButton: boolean): void => {

    console.log('mouseDownFunc', x, y, isLeftButton);
    if(gameForm.bombsField.isFieldClick(x, y)) {
        lastClickCell = gameForm.bombsField.clickHanlder(x, y);
        if(isLeftButton) {
            view.clearCell(gameForm.bombsField, lastClickCell.rowIndex, lastClickCell.columnIndex);
            view.drawCellPressed(gameForm.bombsField, lastClickCell.rowIndex, lastClickCell.columnIndex);
            lastLeftClick = true;
        }
    }
}

const mouseUpFunc = (x: number, y: number, isLeftButton: boolean): void => {
    console.log('mouseUpFunc', x, y, isLeftButton);
    console.log('lastClickCell', lastClickCell);
    if(lastClickCell) {

        const cellPos = gameForm.bombsField.clickHanlder(x, y);
        console.log('cellPos', cellPos);
        if(cellPos.rowIndex === lastClickCell.rowIndex &&
            cellPos.columnIndex === lastClickCell.columnIndex) {
            console.log('similar cell');
            if(isLeftButton) {
                const cell = gameForm.bombsField.cells[cellPos.rowIndex][cellPos.columnIndex];
                if(cell.state === CellState.Closed) {
                    cell.state = CellState.Empty;                    
                } else {
                    cell.state = CellState.Closed;
                }

             
            }
        }
        view.clearCell(gameForm.bombsField, lastClickCell.rowIndex, lastClickCell.columnIndex);
        view.drawCell(gameForm.bombsField, lastClickCell.rowIndex, lastClickCell.columnIndex);
    }

    lastClickCell = undefined;
    lastLeftClick = false;
}

const interval = setInterval(function(){
    gameForm.infoPanel.timer.increase();
    view.clearRect(gameForm.infoPanel.timer.rect);
    view.drawDigitsPanel(gameForm.infoPanel.timer);
},1000);


view.canvas.addEventListener('mousedown', clickHanlder.getEventHadler(mouseDownFunc));
view.canvas.addEventListener('mouseup', clickHanlder.getEventHadler(mouseUpFunc));
view.canvas.oncontextmenu = (e:MouseEvent): void => { e.preventDefault(); };

