import { Color, cssColor } from './color';
import Game, { TetraminoState } from './game';

class GameRenderer {
  private canvas : HTMLCanvasElement;
  private debugPanel : HTMLElement;
  private game : Game;

  private canvasSize = [300, 600];

  init() : void {
    this.layout();
  }

  private layout() {
    const container = document.createElement('div');
    container.setAttribute('id', 'game-container');

    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvas');
    this.canvas.width = this.canvasSize[0];
    this.canvas.height = this.canvasSize[1];

    this.debugPanel = document.createElement('div');
    this.debugPanel.setAttribute('id', 'debug-panel');

    container.appendChild(this.canvas);
    container.appendChild(this.debugPanel);

    document.body.appendChild(container);
  }

  private debug(game: Game) {
    const debugAttrs = [
    ];

    this.debugPanel.innerHTML = '<ul></ul>';
    debugAttrs.forEach((attr) => {
      const li = document.createElement('li');
      li.innerHTML = `${attr[0]}: ${attr[1]}`;
      this.debugPanel.appendChild(li);
    });
  }

  update(game: Game) {
    const ctx = this.canvas.getContext('2d');

    const bs = {
      w: this.canvasSize[0] / game.gridSize[0],
      h: this.canvasSize[1] / game.gridSize[1],
    };

    // background
    for (let i = 0; i < game.gridSize[0]; i += 1) {
      for (let j = 0; j < game.gridSize[1]; j += 1) {
        ctx.clearRect(i * bs.w, j * bs.h, bs.w, bs.h);
        ctx.strokeRect(i * bs.w, j * bs.h, bs.w, bs.h);
      }
    }

    const current : TetraminoState = game.current;
    ctx.fillStyle = cssColor[current.color];
    current.tiles.forEach((tile) => {
      const x = current.pos.x + tile[0];
      const y = current.pos.y + tile[1];
      ctx.fillRect(x * bs.w, y * bs.h, bs.w, bs.h);
      ctx.strokeRect(x * bs.w, y * bs.h, bs.w, bs.h);
    });

    this.debug(game);
  }
}

export default new GameRenderer();
