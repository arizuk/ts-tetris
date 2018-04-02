import { Color } from './color';

export interface Tetramino {
  type: string,
  color: Color,
  tiles: number[][]
}

export const tetraminos : Tetramino[] = [
  {
    type: 'I',
    color: Color.Red,
    tiles: [
      [-2, 0], [-1, 0], [0, 0], [1, 0]
    ],
  },
  {
    type: 'J',
    color: Color.Yellow,
    tiles: [
      [-1, 0], [0, 0], [1, 0], [1, 1]
    ],
  },
  {
    type: 'L',
    color: Color.Magenta,
    tiles: [
      [-1, -1], [-1, 0], [0, 0], [0, 1]
    ]
  },
  {
    type: 'O',
    color: Color.Blue,
    tiles: [
      [0, 0], [0, 1], [1, 0], [1, 1]
    ]
  },
  {
    type: 'S',
    color: Color.Cyan,
    tiles: [
      [-1, 0], [0, 0], [0, 1], [1, 1]
    ]
  },
  {
    type: 'T',
    color: Color.Green,
    tiles: [
      [-1, 0], [0, 0], [1, 0], [0, 1]
    ]
  },
  {
    type: 'Z',
    color: Color.Orange,
    tiles: [
      [-1, 0], [0, 0], [1, 0], [1, 1]
    ]
  },
];
