class Ship {
  constructor(type, length) {
    if (length > 5) length = 5;
    if (length < 2) length = 2;
    this._type = type;
    this._length = length;
    this._numberOfHits = 0;
  }

  get type() {
    return this._type;
  }

  set type(type) {
    this._type = type;
  }

  get length() {
    return this._length;
  }

  set length(length) {
    this._length = length;
  }

  get numberOfHits() {
    return this._numberOfHits;
  }

  hit() {
    if (this._numberOfHits != this._length) {
      this._numberOfHits++;
    }
  }

  isSunk() {
    return this._numberOfHits >= this._length;
  }
}

export { Ship };
