import './app.scss';
import Game from './game';
import gameRenderer from './gameRenderer';
import rotateRenderer from './rotateRenderer';

const game = new Game()
game.init()
gameRenderer.init();

const FPS = 3;
const gameLoop = () => {
  game.update();
  gameRenderer.update(game);
};
setInterval(gameLoop, 1000/FPS);