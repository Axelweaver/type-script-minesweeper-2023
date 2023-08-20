import MainView from './MainView';
import { GameForm } from 'sprites';
import MouseClickHandler from './MouseClickHandler';
import {
    CellState,
    type CellClickState,
    SmileButtonState,
    type CellInfo,
    type MouseClickState,
    MouseButtonState
} from 'types';

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
let lastCellsToCheck: CellInfo[] | null;
let isSmileClick = false;
let timerIntervalId = 0;
let gameOver = false;

function setGameOver (rowIndex: number, columnIndex: number): void {
    gameForm.bombsField.openBombs(rowIndex, columnIndex);
    // stop the timer
    clearInterval(timerIntervalId);
    view.clearRect(gameForm.infoPanel.button);
    view.drawSmileButton(
        gameForm.infoPanel.button,
        SmileButtonState.Dead
    );
    gameOver = true;
}

// function for the timer
const timerTickFunc = (): void => {
    gameForm.infoPanel.timer.increase();
    view.clearRect(gameForm.infoPanel.timer.rect);
    view.drawDigitsPanel(gameForm.infoPanel.timer);
};

// function for down mouse button event
const mouseDownFunc = (clickState: MouseClickState): void => {
    console.log('mousedown', clickState, MouseButtonState[clickState.button]);
    if (gameForm.infoPanel.isButtonClick(clickState.x, clickState.y)) {
        isSmileClick = true;
        view.clearRect(gameForm.infoPanel.button);
        view.drawSmileButtonPressed(gameForm.infoPanel.button);
        return;
    }

    if (gameForm.bombsField.isFieldClick(clickState.x, clickState.y) && !gameOver) {
        lastClickCell = gameForm.bombsField.clickHanlder(clickState.x, clickState.y);
        if (clickState.button === MouseButtonState.Left) {
            // skip it if cell already is opened
            if (lastClickCell.state !== CellState.Closed &&
                lastClickCell.state !== CellState.Digit) {
                lastClickCell = null;
                return;
            }
            if (lastClickCell.state === CellState.Digit) {
                return;
            }
            view.clearCell(gameForm.bombsField, lastClickCell.rowIndex, lastClickCell.columnIndex);
            view.drawCellPressed(gameForm.bombsField, lastClickCell.rowIndex, lastClickCell.columnIndex);
            view.clearRect(gameForm.infoPanel.button);
            view.drawSmileButton(gameForm.infoPanel.button, SmileButtonState.Surprised);
        }
        if (clickState.button === MouseButtonState.Right &&
            lastClickCell.state !== CellState.Closed &&
            lastClickCell.state !== CellState.Flag) {
            lastClickCell = null;
        }
        if (clickState.button === MouseButtonState.Both) {
            lastCellsToCheck = getCellsAround(
                lastClickCell.rowIndex,
                lastClickCell.columnIndex
            );
        }
    }
};
// function for up mouse button event
const mouseUpFunc = (clickState: MouseClickState): void => {
    console.log('mouseup', clickState, MouseButtonState[clickState.button]);
    if (isSmileClick) {
        view.clearRect(gameForm.infoPanel.button);
        view.drawSmileButton(gameForm.infoPanel.button);
        if (gameForm.infoPanel.isButtonClick(clickState.x, clickState.y) &&
            hasFirstClick) {
            // start new game, reset all counters and bombs
            clearInterval(timerIntervalId);
            gameForm.reset();
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
        const cellPos = gameForm.bombsField.clickHanlder(clickState.x, clickState.y);
        if (cellPos.rowIndex === lastClickCell.rowIndex &&
            cellPos.columnIndex === lastClickCell.columnIndex) {
            // console.log('mouseup ', cellPos, clickState);
            if (clickState.button === MouseButtonState.Left) {
                let cellsToCheck: CellInfo[] = [];
                if (cellPos.state === CellState.Closed) {
                    cellsToCheck.push({ ...cellPos });
                }
                if (cellPos.state === CellState.Digit) {
                    cellsToCheck = gameForm.bombsField.checkCellAroundDigit(
                        cellPos.rowIndex,
                        cellPos.columnIndex
                    );
                }

                cellsToCheck.filter((cell: CellInfo): boolean => cell.state === CellState.Closed)
                    .forEach((cell: CellInfo): void => {
                    // ooops.. it's a bomb!
                        if (gameForm.bombsField.isBomb(cell.rowIndex, cell.columnIndex)) {
                            setGameOver(cell.rowIndex, cell.columnIndex);
                        } else if (hasFirstClick) {
                            gameForm.bombsField.openCell(cell.rowIndex, cell.columnIndex);
                        }
                    });

                // set default smile button
                if (!gameOver) {
                    view.clearRect(gameForm.infoPanel.button);
                    if (gameForm.bombsField.isWin()) {
                        view.drawSmileButton(
                            gameForm.infoPanel.button,
                            SmileButtonState.CoolFace
                        );
                        gameOver = true;
                        clearInterval(timerIntervalId);
                    } else {
                        view.drawSmileButton(
                            gameForm.infoPanel.button,
                            SmileButtonState.Happy
                        );
                    }
                }
            }
            if (clickState.button === MouseButtonState.Right &&
                (cellPos.state === CellState.Closed ||
                    cellPos.state === CellState.Flag)) {
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
    lastCellsToCheck = null;
    isSmileClick = false;
};

// mouse click event listeners
view.canvas.addEventListener('mousedown', clickHanlder.getEventHadler(mouseDownFunc));
view.canvas.addEventListener('mouseup', clickHanlder.getEventHadler(mouseUpFunc));
// disable the context menu on right mouse button
view.canvas.oncontextmenu = (e: MouseEvent): void => { e.preventDefault(); };
