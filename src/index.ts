import MainView from './MainView';
import { GameForm } from './sprites';
import MouseClickHandler from './MouseClickHandler';
import { CellState, CellClickState, SmileButtonState } from './types';
import { drawCellDigit, drawFilledRect } from './helpers';
import MINESWEEPER_FONT from './css/fonts/mine-sweeper.otf';

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
let isSmileClick = false;
let timerIntervalId = 0;
let gameOver = false;

const timerTickFunc = (): void => {
    gameForm.infoPanel.timer.increase();
    view.clearRect(gameForm.infoPanel.timer.rect);
    view.drawDigitsPanel(gameForm.infoPanel.timer);
};

const mouseDownFunc = (x: number, y: number, isLeftButton: boolean): void => {

    console.log('mouseDownFunc', x, y, isLeftButton);
    if(gameForm.bombsField.isFieldClick(x, y) && !gameOver) {
        lastClickCell = gameForm.bombsField.clickHanlder(x, y);
        if(isLeftButton) {
            view.clearCell(gameForm.bombsField, lastClickCell.rowIndex, lastClickCell.columnIndex);
            view.drawCellPressed(gameForm.bombsField, lastClickCell.rowIndex, lastClickCell.columnIndex);
            lastLeftClick = true;
        }
    }
    if(gameForm.infoPanel.isButtonClick(x, y)) {
        isSmileClick = true;
        view.clearRect(gameForm.infoPanel.button);
        view.drawSmileButtonPressed(gameForm.infoPanel.button);
    }
};

const mouseUpFunc = (x: number, y: number, isLeftButton: boolean): void => {
    console.log('mouseUpFunc', x, y, isLeftButton);
    console.log('lastClickCell', lastClickCell);
    if(lastClickCell && !gameOver) {

        const cellPos = gameForm.bombsField.clickHanlder(x, y);
        console.log('cellPos', cellPos);
        if(cellPos.rowIndex === lastClickCell.rowIndex &&
            cellPos.columnIndex === lastClickCell.columnIndex) {
            console.log('similar cell');
            if(isLeftButton) {
                const cell = gameForm.bombsField.cells[cellPos.rowIndex][cellPos.columnIndex];
                if(cell.state === CellState.Closed) {
                    // cell.state = CellState.Empty;
                    if(gameForm.bombsField.isBomb(cellPos.rowIndex, cellPos.columnIndex)) {
                        console.log('is bomb!', cellPos.rowIndex, cellPos.columnIndex);
                        gameForm.bombsField.openBombs(cellPos.rowIndex, cellPos.columnIndex);

                        clearInterval(timerIntervalId);
                        view.clearRect(gameForm.infoPanel.button);
                        view.drawSmileButton(
                            gameForm.infoPanel.button,
                            SmileButtonState.Dead
                        );
                        gameOver = true;
                    } else {
                        gameForm.bombsField.openCell(cellPos.rowIndex, cellPos.columnIndex);
                    }

                    // gameForm.bombsField.setCellState(
                    //     cellPos.rowIndex,
                    //     cellPos.columnIndex,
                    //     CellState.Empty
                    // );
                } else {
                    gameForm.bombsField.setCellState(
                        cellPos.rowIndex,
                        cellPos.columnIndex,
                        CellState.Flag
                    );
                }

                if(!firstClick) {
                    firstClick = true;
                    timerIntervalId = setInterval(timerTickFunc, 1000);
                    gameForm.bombsField.createBombs(
                        cellPos.rowIndex,
                        cellPos.columnIndex
                    );
                }
            }
        }
        // if(!gameOver) {
        //     view.clearCell(gameForm.bombsField, lastClickCell.rowIndex, lastClickCell.columnIndex);
        //     view.drawCell(gameForm.bombsField, lastClickCell.rowIndex, lastClickCell.columnIndex);            
        // }
        view.clearRect(gameForm.bombsField.rect);
        view.drawBombsField(gameForm.bombsField);
    }
    if(isSmileClick) {
        view.clearRect(gameForm.infoPanel.button);
        view.drawSmileButton(gameForm.infoPanel.button);
        if(gameForm.infoPanel.isButtonClick(x, y) && firstClick) {

            clearInterval(timerIntervalId);
            gameForm.infoPanel.timer.reset();
            gameForm.bombsField.reset();
            firstClick = false;
            view.drawGameForm(gameForm);
            gameOver = false;
        }
    }
    lastClickCell = undefined;
    lastLeftClick = false;
    isSmileClick = false;
    console.log(gameForm.bombsField);
};

view.canvas.addEventListener('mousedown', clickHanlder.getEventHadler(mouseDownFunc));
view.canvas.addEventListener('mouseup', clickHanlder.getEventHadler(mouseUpFunc));
view.canvas.oncontextmenu = (e:MouseEvent): void => { e.preventDefault(); };

const cellRect = {
    positionX: 30,
    positionY: 30,
    width: 40,
    height: 40
}

// drawFilledRect(view._context, bombRect);
// drawCellFlag(view._context, bombRect);
for(let i = 1; i < 9; ++i) {
    const rect = {...cellRect};
    rect.positionX = 41 * i;
    drawFilledRect(view.context, rect, '#ccc');
    drawCellDigit(view.context, rect, i);
}