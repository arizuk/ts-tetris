import { shuffle, range } from 'lodash';
import { Color } from './color';
import { tetraminos, Tetramino } from './tetraminos';
import { rotate } from './rotate';
import { Key } from './controller';

interface Pos {
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
    return this.tetramino.tiles.map((t) => {
      const rotated = rotate(t as [number, number], this.rotation);
      return [rotated[0] + this.pos.x, rotated[1] + this.pos.y];
    });
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
  public gridSize = [10, 20];
  public grid: Color[][];
  private isRunning = false;

  constructor() {
    const grid = [];
    for (let j = 0; j < this.gridSize[1]; j += 1) {
      grid[j] = [];
      for (let i = 0; i < this.gridSize[0]; i += 1) {
        grid[j][i] = Color.None;
      }
    }
    this.grid = grid;
  }

  init() {
    this.isRunning = true;
    this.next = shuffle(tetraminos)[0];
    this.nextTetromino();
  }

  update(keyCommands: Key[]) {
    if (!this.isRunning) {
      return;
    }

    keyCommands.forEach((key) => {
      switch (key) {
        case Key.Enter:
          this.rotateAction();
          break;
        case Key.Right:
          this.rightAction();
          break;
        case Key.Left:
          this.leftAction();
          break;
        case Key.Down:
          this.downAction();
          break;
      }
    });

    // Fall
    const moved = this.current.move(0, 1);
    if (this.checkCollision(moved)) {
      this.freeze(this.current);
      this.clearFilledLines();

      if (this.isGameEnd()) {
        this.isRunning = false;
        return;
      }

      this.nextTetromino();
      return;
    }

    this.current = this.current.move(0, 1);
  }

  private rotateAction() {
    const rotated = this.current.rotate();
    if (this.isMovable(rotated)) {
      this.current = rotated;
    }
  }

  private rightAction() {
    const moved = this.current.move(1, 0);
    if (this.isMovable(moved)) {
      this.current = moved;
    }
  }

  private leftAction() {
    const moved = this.current.move(-1, 0);
    if (this.isMovable(moved)) {
      this.current = moved;
    }
  }

  private downAction() {
    let moved = this.current.move(0, 1);
    while (!this.checkCollision(moved)) {
      this.current = moved;
      moved = this.current.move(0, 1);
    }
  }

  private isGameEnd() : boolean {
    for (let i = 0; i < this.gridSize[0]; i += 1) {
      if (this.grid[0][i] !== Color.None) {
        return true;
      }
    }
    return false;
  }

  private checkCollision(current: TetraminoState) : boolean {
    const tiles = current.tiles;
    for (let i = 0; i < tiles.length; i += 1) {
      const [x, y] = tiles[i];

      if (y >= this.gridSize[1]) {
        return true;
      }

      if (y < 0) {
        continue;
      }

      if (this.grid[y][x] !== Color.None) {
        return true;
      }
    }
    return false;
  }

  private isMovable(current: TetraminoState) : boolean {
    const tiles = current.tiles;
    for (let i = 0; i < tiles.length; i += 1) {
      const [x, y] = tiles[i];

      if (y < 0 && x >= 0 && x < this.gridSize[0]) {
        continue;
      }

      if (!this.isInGrid(x, y)) {
        return false;
      }

      if (this.grid[y][x] !== Color.None) {
        return false;
      }
    }
    return true;
  }

  private freeze(current) {
    current.tiles.forEach((tile) => {
      const [x, y] = tile;
      if (this.isInGrid(x, y)) {
        this.grid[y][x] = current.color;
      }
    });
  }

  private isInGrid(x, y) : boolean {
    return x >= 0 && x < this.gridSize[0] && y >= 0 && y < this.gridSize[1];
  }

  private initialPos() : Pos {
    return new PosImpl(this.gridSize[0] / 2, 0);
  }

  private nextTetromino() {
    this.current = new TetraminoStateImpl(this.initialPos(), this.next);

    while (this.checkCollision(this.current)) {
      this.current = this.current.move(0, -1);
    }

    this.next = shuffle(tetraminos)[0];
  }

  private clearFilledLines() {
    let y = this.gridSize[1] - 1;
    while (y >= 0) {
      if (this.isFilledLine(y)) {
        this.clearLine(y);
        this.shift(y);
        continue;
      }
      y = y - 1;
    }
  }

  private clearLine(y) {
    const row = this.grid[y];
    for (let i = 0; i < row.length; i += 1) {
      row[i] = Color.None;
    }
  }

  private shift(y) {
    for (let j = y; j >= 0; j -= 1) {
      for (let i = 0; i < this.gridSize[0]; i += 1) {
        if (j === 0) {
          this.grid[j][i] = Color.None;
        } else {
          this.grid[j][i] = this.grid[j-1][i];
        }
      }
    }
  }

  private isFilledLine(y) {
    const row = this.grid[y];
    for (let i = 0; i < row.length; i += 1) {
      if (row[i] === Color.None) {
        return false;
      }
    }
    return true;
  }
}

export default Game;
