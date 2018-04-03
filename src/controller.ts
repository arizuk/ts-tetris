export enum Key {
  Enter,
  Right,
  Left,
  Down,
}

class Controller {
  private keyCommands : Key[] = [];

  init() {
    window.addEventListener('keydown', (e) => {
      const key = this.getKey(e);
      if (key !== null) {
        this.keyCommands.push(key);
      }
    });
  }

  fetchKeyCommands() {
    const keyCommands = this.keyCommands;
    this.keyCommands = [];
    return keyCommands;
  }

  private getKey(e) : Key|null {
    console.log(e.keyCode);

    switch (e.keyCode) {
      case 13:
        return Key.Enter;
      case 37:
        return Key.Left;
      case 39:
        return Key.Right;
      case 40:
        return Key.Down;
    }
    return null;
  }
}

export default new Controller();
