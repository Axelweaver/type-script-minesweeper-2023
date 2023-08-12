import MainView from './MainView';
import { GameForm } from './sprites';
import MouseClickHandler from './MouseClickHandler';
import { CellState } from './types';

const view = new MainView();
const clickHanlder = new MouseClickHandler(view.canvasRect);
const gameForm = new GameForm(
    view.canvas.width,
    view.canvas.height,
    9,
    9
);

view.drawGameForm(gameForm);

const clickFunc = (x: number, y: number): void => {


    if(gameForm.bombsField.isFieldClick(x, y)) {
        const cellPos = gameForm.bombsField.clickHanlder(x, y);
        const cell = gameForm.bombsField.cells[cellPos.rowIndex][cellPos.columnIndex];
        cell.state = CellState.Empty;
        view.clearCell(gameForm.bombsField, cellPos.rowIndex, cellPos.columnIndex);
        view.drawCell(gameForm.bombsField, cellPos.rowIndex, cellPos.columnIndex);

    }
}

// view.canvas.addEventListener('click', clickHanlder.getEventHadler(
//     (x: number, y: number): void => {
//         console.log(x, y);
//         console.log(gameForm.bombsField.clickHanlder(x, y));
//     }
// ));

view.canvas.addEventListener('click', clickHanlder.getEventHadler(clickFunc));