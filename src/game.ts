import { shuffle } from 'lodash';
import { tetraminos, Tetramino } from './tetraminos';
import { rotate } from './rotate';

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
  private rotation: number;
  constructor(public pos: Pos, private tetramino: Tetramino, rotation = 0) {
    this.rotation = rotation % 4;
  }

  get type() {
    return this.tetramino.type;
  }

  get color() {
    return this.tetramino.color;
  }

  get tiles() {
    return this.tetramino.tiles.map(t => rotate(t as [number, number], this.rotation));
  }

  move(dx: number, dy: number) : TetraminoStateImpl {
    const pos = this.pos.move(dx, dy);
    return new TetraminoStateImpl(pos, this.tetramino, this.rotation);
  }

  rotate() : TetraminoStateImpl {
    return new TetraminoStateImpl(this.pos, this.tetramino, this.rotation + 1);
  }
}

class Game {
  public next: Tetramino;
  public current: TetraminoStateImpl;
  public gridSize: [number, number];

  constructor() {
    this.gridSize = [10, 20];
  }

  init() {
    const seq = shuffle(tetraminos);
    this.next = seq[0];
    this.current = new TetraminoStateImpl(this.initialPos(), seq[1]);
  }

  update() {
    this.current = this.current.move(0, 1);
    this.current = this.current.rotate();
  }

  private initialPos() : Pos {
    return new PosImpl(this.gridSize[0] / 2, 0);
  }
}

export default Game;
