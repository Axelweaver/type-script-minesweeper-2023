import MainView from './MainView';
import { GameForm } from './sprites';
import MouseClickHandler from './MouseClickHandler';
import { CellState, type CellClickState, SmileButtonState } from './types';

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
// game variables
let hasFirstClick = false;
let lastClickCell: CellClickState | null;
let isSmileClick = false;
let timerIntervalId = 0;
let gameOver = false;
// function for the timer
const timerTickFunc = (): void => {
    gameForm.infoPanel.timer.increase();
    view.clearRect(gameForm.infoPanel.timer.rect);
    view.drawDigitsPanel(gameForm.infoPanel.timer);
};

// function for down mouse button event
const mouseDownFunc = (x: number, y: number, isLeftButton: boolean): void => {
    if (gameForm.infoPanel.isButtonClick(x, y)) {
        isSmileClick = true;
        view.clearRect(gameForm.infoPanel.button);
        view.drawSmileButtonPressed(gameForm.infoPanel.button);
        return;
    }

    if (gameForm.bombsField.isFieldClick(x, y) && !gameOver) {
        lastClickCell = gameForm.bombsField.clickHanlder(x, y);
        if (isLeftButton) {
            // skip it if cell already is opened
            if (lastClickCell.state !== CellState.Closed) {
                lastClickCell = null;
                return;
            }
            view.clearCell(gameForm.bombsField, lastClickCell.rowIndex, lastClickCell.columnIndex);
            view.drawCellPressed(gameForm.bombsField, lastClickCell.rowIndex, lastClickCell.columnIndex);
            view.clearRect(gameForm.infoPanel.button);
            view.drawSmileButton(gameForm.infoPanel.button, SmileButtonState.Surprised);
        } else {
            if (lastClickCell.state !== CellState.Closed &&
                lastClickCell.state !== CellState.Flag) {
                lastClickCell = null;
            }
        }
    }
};
// function for up mouse button event
const mouseUpFunc = (x: number, y: number, isLeftButton: boolean): void => {
    if (isSmileClick) {
        view.clearRect(gameForm.infoPanel.button);
        view.drawSmileButton(gameForm.infoPanel.button);
        if (gameForm.infoPanel.isButtonClick(x, y) && hasFirstClick) {
            // start new game, reset all counters and bombs
            clearInterval(timerIntervalId);
            gameForm.infoPanel.timer.reset();
            gameForm.bombsField.reset();
            hasFirstClick = false;
            view.drawGameForm(gameForm);
            gameOver = false;
        }
        isSmileClick = false;
        return;
    }
    // if it's after mouse down click
    if (lastClickCell !== null && !gameOver) {
        // find cell positions and state
        const cellPos = gameForm.bombsField.clickHanlder(x, y);
        if (cellPos.rowIndex === lastClickCell.rowIndex &&
            cellPos.columnIndex === lastClickCell.columnIndex) {
            if (isLeftButton) {
                if (cellPos.state === CellState.Closed) {
                    // ooops.. it's a bomb!
                    if (gameForm.bombsField.isBomb(cellPos.rowIndex, cellPos.columnIndex)) {
                        gameForm.bombsField.openBombs(cellPos.rowIndex, cellPos.columnIndex);
                        // stop the timer
                        clearInterval(timerIntervalId);
                        view.clearRect(gameForm.infoPanel.button);
                        view.drawSmileButton(
                            gameForm.infoPanel.button,
                            SmileButtonState.Dead
                        );
                        gameOver = true;
                    } else if (hasFirstClick) {
                        gameForm.bombsField.openCell(cellPos.rowIndex, cellPos.columnIndex);
                    }
                }
                // set default smile button
                if (!gameOver) {
                    view.clearRect(gameForm.infoPanel.button);
                    if (gameForm.bombsField.isWin()) {
                        view.drawSmileButton(
                            gameForm.infoPanel.button,
                            SmileButtonState.CoolFace
                        );
                        gameOver = true;
                    } else {
                        view.drawSmileButton(
                            gameForm.infoPanel.button,
                            SmileButtonState.Happy
                        );
                        clearInterval(timerIntervalId);
                    }
                }
            } else {
                let newState: CellState = CellState.Closed;

                if (lastClickCell.state === CellState.Closed) {
                    newState = CellState.Flag;
                    gameForm.infoPanel.bombsCounter.decrease();
                }
                if (lastClickCell.state === CellState.Flag) {
                    newState = CellState.Closed;
                    gameForm.infoPanel.bombsCounter.increase();
                }

                if (newState !== lastClickCell.state) {
                    view.clearRect(gameForm.infoPanel.bombsCounter.rect);
                    view.drawDigitsPanel(gameForm.infoPanel.bombsCounter);
                }
                gameForm.bombsField.setCellState(
                    cellPos.rowIndex,
                    cellPos.columnIndex,
                    newState
                );
            }
            if (!hasFirstClick) {
                hasFirstClick = true;
                timerIntervalId = setInterval(timerTickFunc, 1000);
                gameForm.bombsField.createBombs(
                    cellPos.rowIndex,
                    cellPos.columnIndex
                );
                gameForm.bombsField.openCell(cellPos.rowIndex, cellPos.columnIndex);
            }
        }
        // draw changed bomb field
        view.clearRect(gameForm.bombsField.rect);
        view.drawBombsField(gameForm.bombsField);
    }
    // reset variables
    lastClickCell = null;
    isSmileClick = false;
};

// mouse click event listeners
view.canvas.addEventListener('mousedown', clickHanlder.getEventHadler(mouseDownFunc));
view.canvas.addEventListener('mouseup', clickHanlder.getEventHadler(mouseUpFunc));
// disable the context menu on right mouse button
view.canvas.oncontextmenu = (e: MouseEvent): void => { e.preventDefault(); };
