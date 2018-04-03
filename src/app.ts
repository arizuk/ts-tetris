import './app.scss';
import Game from './game';
import gameRenderer from './gameRenderer';
// import rotateRenderer from './rotateRenderer';
import controller from './controller';

const game = new Game();

game.init();
gameRenderer.init();
controller.init();

const FPS = 5;
const gameLoop = () => {
  const keyCommands = controller.fetchKeyCommands();
  game.update(keyCommands);
  gameRenderer.update(game);
};

setInterval(gameLoop, 1000 / FPS);
