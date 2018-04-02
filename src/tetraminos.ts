import Color from './color';

export interface Tetramino {
  index: number
  color: Color,
  tiles: number[][]
}

const tetraminos : Tetramino[] = [
  {
    index: 0,
    color: Color.Red,
    tiles: [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  },
  {
    index: 1,
    color: Color.Yellow,
    tiles: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ]
  }
];

export default tetraminos