type Pos = [number, number];

export const rotate = (pos: Pos, rotation: number) : Pos => {
  let [x, y] = pos;
  for (let i = 0; i < rotation; i++) {
    let x_ = x;
    x = -y;
    y = x_;
  }
  return [x, y];
}