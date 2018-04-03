type Pos = [number, number];

export const rotate = (pos: Pos, rotation: number) : Pos => {
  let [x, y] = pos;
  for (let i = 0; i < rotation; i += 1) {
    const tmp = x;
    x = -y;
    y = tmp;
  }
  return [x, y];
};
