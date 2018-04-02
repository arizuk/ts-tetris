import Color from './color'
import Game, { TetraminoState } from './game'

const colorCode = {
  [Color.Red]: 'red',
  [Color.Yellow]: 'yellow',
  [Color.Magenta]: 'magenta',
  [Color.Blue]: 'blue',
  [Color.Cyan]: 'cyan',
  [Color.Green]: 'green',
  [Color.Orange]: 'orange',
};

type BlockSize = [number, number];


class HTMLRenderer {
  private canvas : HTMLCanvasElement;
  private debugPanel : HTMLElement;
  private game : Game;

  private canvasSize: [number, number];

  constructor() {
    this.canvasSize = [300, 600];
  }

  init(game: Game) : void {
    this.game = game;
    this.layout();
  }

  private layout() {
    const container = document.createElement('container');
    container.setAttribute('id', 'container');

    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvas');
    this.canvas.setAttribute('width', `${this.canvasSize[0]}px`);
    this.canvas.setAttribute('height', `${this.canvasSize[1]}px`);

    this.debugPanel = document.createElement('div')
    this.debugPanel.setAttribute('id', 'debug-panel')

    container.appendChild(this.canvas);
    container.appendChild(this.debugPanel);

    document.body.appendChild(container);
  }

  private debug() {
    const debugAttrs = [
      ['next', this.game.next.index]
    ];

    this.debugPanel.innerHTML = '<ul></ul>';
    debugAttrs.forEach((attr) => {
      const li = document.createElement('li');
      li.innerHTML = `${attr[0]}: ${attr[1]}`;
      this.debugPanel.appendChild(li);
    });
  }

  update() {
    const ctx = this.canvas.getContext('2d');

    const bs : BlockSize = [
      this.canvasSize[0] / this.game.gridSize[0],
      this.canvasSize[1] / this.game.gridSize[1],
    ];

    // background
    for (let i = 0; i < this.game.gridSize[0]; i++) {
      for (let j = 0; j < this.game.gridSize[1]; j++) {
        ctx.clearRect(i * bs[0], j * bs[1], bs[0], bs[1]);
        ctx.strokeRect(i * bs[0], j * bs[1], bs[0], bs[1]);
      }
    }

    const current : TetraminoState = this.game.current;
    ctx.fillStyle = colorCode[current.color];
    current.tiles.forEach((row, i) => {
      row.forEach((v, j) => {
        if (v == 0) return true;
        const x = current.pos.x + i
        const y = current.pos.y + j
        ctx.fillRect(x * bs[0], y * bs[1], bs[0], bs[1]);
        ctx.strokeRect(x * bs[0], y * bs[1], bs[0], bs[1]);
      });
    });

    this.debug();
  }
}

export default new HTMLRenderer();
