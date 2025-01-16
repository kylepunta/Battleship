class Ship {
    constructor(length) {
        this._length = length;
        this._numberOfHits = 0;
    }

    get length() {
        return this._length;
    }
    
    get numberOfHits() {
        return this._numberOfHits;
    }

    hit() {
        this._numberOfHits++;
    }

    isSunk() {
        return this._numberOfHits >= this._length;
    }
}