import MainView from './MainView';
import { GameForm } from './sprites';
import MouseClickHandler from './MouseClickHandler';

const view = new MainView();
const clickHanlder = new MouseClickHandler(view.canvasRect);
const gameForm = new GameForm(
    view.canvas.width,
    view.canvas.height,
    9,
    9
);

view.drawGameForm(gameForm);

view.canvas.addEventListener('click', clickHanlder.getEventHadler(
    (x: number, y: number): void => console.log(x, y)
));