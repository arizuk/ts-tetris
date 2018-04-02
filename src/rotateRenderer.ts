import { Color, cssColor } from './color'
import { tetraminos,  Tetramino } from './tetraminos';
import { rotate } from './rotate';

type Size = [number, number];
type Pos = [number, number];

class RotateRenderer {
  private canvas : HTMLCanvasElement;
  private canvasSize = [800, 800];
  private rotation : number;

  constructor() {
    this.rotation = 0;
  }

  init() : void {
    this.layout();
  }

  private layout() {
    const container = document.createElement('div');
    container.setAttribute('id', 'rotate-container');

    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvas');
    this.canvas.width = this.canvasSize[0];
    this.canvas.height = this.canvasSize[1];

    container.appendChild(this.canvas);
    document.body.appendChild(container);
  }

  update() {
    tetraminos.forEach((t, i) => {
      this.render(t, [1, 1], this.rotation, [80, 80], [0, i * 80]);
    });
    this.rotation = this.rotation + 1;
  }

  render(tetramino: Tetramino, center: Pos, rotation: number, canvasSize: Size, offset: Pos) {
    const ctx = this.canvas.getContext('2d');
    const bs = [canvasSize[0]/4, canvasSize[1]/4]

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        ctx.fillStyle = 'white';
        ctx.fillRect(i * bs[0] + offset[0], j * bs[1] + offset[1], bs[0], bs[1]);
        ctx.strokeRect(i * bs[0] + offset[0], j * bs[1] + offset[1], bs[0], bs[1]);
      }
    }

    tetramino.tiles.forEach((tile) => {
      const rotated = rotate(tile as Pos, rotation);
      const x = rotated[0] + center[0];
      const y = rotated[1] + center[1];

      ctx.fillStyle = cssColor[tetramino.color];
      ctx.fillRect(x * bs[0] + offset[0], y * bs[1] + offset[1], bs[0], bs[1]);
      ctx.strokeRect(x * bs[0] + offset[0], y * bs[1] + offset[1], bs[0], bs[1]);
    })
  }
}

export default new RotateRenderer();
