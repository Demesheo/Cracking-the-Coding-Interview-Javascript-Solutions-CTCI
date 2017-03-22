'use strict';

// FROM: https://github.com/careercup/CtCI-6th-Edition-JavaScript-ES2015/blob/master/src/chapter3/ch3-q1.js

// STACK SIZE IS DYNAMIC
export class TripleStack {
  constructor() {
    this._stack = [];
    this._stackLengths = [0, 0, 0];
  }

  _getLength(stackNum) {
    return this._stackLengths[stackNum - 1];
  }

  push(stackNum, value) {
    const stackIndex = this._getLength(stackNum) * 3 + stackNum - 1;
    this._stack[stackIndex] = value;
    this._stackLengths[stackNum - 1]++;
  }

  pop(stackNum) {
    const stackLength = this._getLength(stackNum);
    let value;

    if (stackLength > 0) {
      const stackIndex = (stackLength - 1) * 3 + stackNum - 1;
      value = this._stack[stackIndex];
      this._stack[stackIndex] = undefined;
      this._stackLengths[stackNum - 1]--;
    }
    return value;
  }

  peek(stackNum) {
    const stackLength = this._getLength(stackNum);
    let value;

    if (stackLength > 0) {
      const stackIndex = (stackLength - 1) * 3 + stackNum - 1;
      value = this._stack[stackIndex];
    }
    return value;
  }

  isEmpty(stackNum) {
    return this._getLength(stackNum) === 0;
  }
}

// |---~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---|

// BASED OFF FIRST SOLUTION IN BOOK
// STACKS HAVE A FIXED SIZE
class FixedMultiStack {
  constructor(numOfStacks, stackSize) {
    this.numOfStacks = numOfStacks || 3;
    this.stackCapacity = stackSize || 1;
    this.values = new Array(stackSize * this.numOfStacks || 0);
    this.sizes = new Array(this.numOfStacks).fill(0);
  }

  _indexOfTop(stackNum) {
    const offset = (stackNum - 1) * this.stackCapacity,
          size = this.sizes[stackNum - 1];
    return offset + size - 1;
  }

  push(stackNum, value) {
    if (this.isFull(stackNum)) throw Error(`Stack number ${stackNum} is full`);
    this.sizes[stackNum - 1]++;
    this.values[this._indexOfTop(stackNum)] = value;
  }

  pop(stackNum) {
    if (this.isEmpty(stackNum)) throw Error(`Stack number ${stackNum} is empty`);

    const topIndex = this._indexOfTop(stackNum),
          value = this.values[topIndex];

    this.values[topIndex] = undefined;
    this.sizes[stackNum - 1]--;
    return value;
  }

  peek(stackNum) {
    return this.values[this._indexOfTop(stackNum)];
  }

  isEmpty(stackNum) {
    return this.sizes[stackNum - 1] === 0;
  }

  isFull(stackNum) {
    return this.sizes[stackNum - 1] === this.stackCapacity;
  }

}