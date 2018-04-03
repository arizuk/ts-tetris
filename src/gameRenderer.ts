import { Color, cssColor } from './color';
import Game, { TetraminoState } from './game';

interface TileSize {
  w: number;
  h: number;
}

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

  private drawTile(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    ts: TileSize,
    tileColor: Color,
  ) {
    ctx.fillStyle = cssColor[tileColor];
    ctx.fillRect(x * ts.w, y * ts.h, ts.w, ts.h);
    ctx.strokeStyle = '#333';
    ctx.strokeRect(x * ts.w + 3, y * ts.h + 3, ts.w - 6, ts.h - 6);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(x * ts.w, y * ts.h, ts.w, ts.h);
  }

  private drawBlank(ctx: CanvasRenderingContext2D, x: number, y: number, ts: TileSize) {
    ctx.clearRect(x * ts.w, y * ts.h, ts.w, ts.h);
    ctx.strokeStyle = '#444';
    ctx.strokeRect(x * ts.w, y * ts.h, ts.w, ts.h);
  }

  update(game: Game) {
    const ctx = this.canvas.getContext('2d');

    const ts = {
      w: this.canvasSize[0] / game.gridSize[0],
      h: this.canvasSize[1] / game.gridSize[1],
    };

    game.grid.forEach((row, y) => {
      row.forEach((color, x) => {
        if (color !== Color.None) {
          this.drawTile(ctx, x, y, ts, color);
        } else {
          this.drawBlank(ctx, x, y, ts);
        }
      });
    });

    const current : TetraminoState = game.current;
    current.tiles.forEach((tile) => {
      const [x, y] = tile;
      this.drawTile(ctx, x, y, ts, current.color);
    });

    // this.debug(game);
  }
}

export default new GameRenderer();
