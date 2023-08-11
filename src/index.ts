import MainView from './MainView';
import MouseClickHandler from './MouseClickHandler';

const view = new MainView();
const clickHanlder = new MouseClickHandler(view.canvasRect);


view.drawGameField();

view.canvas.addEventListener('click', clickHanlder.getEventHadler(
    (x: number, y: number): void => console.log(x, y)
));