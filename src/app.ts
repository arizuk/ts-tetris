import './app.scss';
import Game from './game';
import htmlRenderer from './htmlRenderer';

const game = new Game()
game.init()
htmlRenderer.init(game);

const FPS = 3;
const gameLoop = () => {
  game.update();
  htmlRenderer.update();
};
setInterval(gameLoop, 1000/FPS);