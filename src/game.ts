import { shuffle } from 'lodash'
import tetraminos from './tetraminos'
import { Tetramino } from './tetraminos'

export interface Pos {
  x: number;
  y: number;
  move: (dx: number, dy: number) => Pos;
}

export interface TetraminoState extends Tetramino {
  pos: Pos;
}

class PosImpl implements Pos {
  constructor(public x: number, public y: number) {}
  move(dx: number, dy: number) : PosImpl {
    return new PosImpl(this.x + dx, this.y + dy);
  }
}

class TetraminoStateImpl implements TetraminoState {
  constructor(public pos: Pos, private tetramino: Tetramino) {}

  get index() : Tetramino['index'] {
    return this.tetramino.index;
  }

  get color() : Tetramino['color'] {
    return this.tetramino.color;
  }

  get tiles() : Tetramino['tiles'] {
    return this.tetramino.tiles;
  }
}

class Game {
  public next: Tetramino;
  public tetraminos: TetraminoState[];
  public gridSize: [number, number];

  constructor() {
    this.gridSize = [10, 20];
    this.tetraminos = [];
  }

  init() {
    const seq = shuffle(tetraminos);
    this.next = seq[0];
    this.tetraminos.push(
      new TetraminoStateImpl(this.initialPos(), seq[1])
    )
  }

  get current() {
    return this.tetraminos[this.tetraminos.length-1];
  }

  update() {
    const pos = this.current.pos
    this.current.pos = pos.move(0, 1);
  }

  private initialPos() : Pos {
    return new PosImpl(this.gridSize[0]/2, 0);
  }
}
export default Game