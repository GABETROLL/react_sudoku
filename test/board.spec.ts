import { expect } from "chai";
import Board from "../src/board";

describe("Board", function () {
  describe("previousPosition", function () {
    it("throws an error if the current position is already the beginning", function () {
      expect(Board.previousPosition(0, 0)).to.throw("You're already at the beginning!");
    });
    it("moves in the x axis as expected", function () {
      expect(Board.previousPosition(0, 1)).to.deep.equal([0, 0]);
      expect(Board.previousPosition(0, 2)).to.deep.equal([0, 1]);
      expect(Board.previousPosition(1, 1)).to.deep.equal([1, 0]);
      expect(Board.previousPosition(1, 2)).to.deep.equal([1, 1]);
      expect(Board.previousPosition(2, 7)).to.deep.equal([2, 6]);
      expect(Board.previousPosition(5, 5)).to.deep.equal([5, 4]);
      expect(Board.previousPosition(6, 2)).to.deep.equal([6, 1]);
      expect(Board.previousPosition(7, 8)).to.deep.equal([7, 7]);
      expect(Board.previousPosition(8, 8)).to.deep.equal([8, 7]);
      expect(Board.previousPosition(8, 7)).to.deep.equal([8, 6]);
    });
    it("rolls over as expected", function () {
      expect(Board.previousPosition(1, 0)).to.deep.equal([0, 8]);
      expect(Board.previousPosition(2, 0)).to.deep.equal([1, 8]);
      expect(Board.previousPosition(3, 0)).to.deep.equal([2, 8]);
      expect(Board.previousPosition(4, 0)).to.deep.equal([3, 8]);
      expect(Board.previousPosition(5, 0)).to.deep.equal([4, 8]);
      expect(Board.previousPosition(6, 0)).to.deep.equal([5, 8]);
      expect(Board.previousPosition(7, 0)).to.deep.equal([6, 8]);
      expect(Board.previousPosition(8, 0)).to.deep.equal([7, 8]);
    });
  });

  describe("nextPosition", function () {
    it("moves in the x axis as expected", function () {
      expect(Board.nextPosition(0, 0)).to.deep.equal([0, 1]);
      expect(Board.nextPosition(3, 4)).to.deep.equal([3, 5]);
      expect(Board.nextPosition(7, 1)).to.deep.equal([7, 2]);
      expect(Board.nextPosition(6, 2)).to.deep.equal([6, 3]);
      expect(Board.nextPosition(5, 7)).to.deep.equal([5, 8]);
      expect(Board.nextPosition(2, 6)).to.deep.equal([2, 7]);
      expect(Board.nextPosition(7, 7)).to.deep.equal([7, 8]);
      expect(Board.nextPosition(8, 7)).to.deep.equal([8, 8]);
    });
    it("rolls over as expected", function () {
      expect(Board.nextPosition(0, 8)).to.deep.equal([1, 0]);
      expect(Board.nextPosition(1, 8)).to.deep.equal([2, 0]);
      expect(Board.nextPosition(2, 8)).to.deep.equal([3, 0]);
      expect(Board.nextPosition(3, 8)).to.deep.equal([4, 0]);
      expect(Board.nextPosition(4, 8)).to.deep.equal([5, 0]);
      expect(Board.nextPosition(5, 8)).to.deep.equal([6, 0]);
      expect(Board.nextPosition(6, 8)).to.deep.equal([7, 0]);
      expect(Board.nextPosition(7, 8)).to.deep.equal([8, 0]);
    });
    it("returns null when already at last position", function () {
      expect(Board.nextPosition(8, 8)).to.be(null);
    });
  });

  describe("nextDigit", function () {
    it("throws error if current digit is 0", function () {
      expect(Board.nextDigit(0)).to.throw("Current digit must not already be 0!");
    });
    it("returns the current digit + 1, mod 10", function () {
      expect(Board.nextDigit(1)).to.equal(2);
      expect(Board.nextDigit(2)).to.equal(3);
      expect(Board.nextDigit(3)).to.equal(4);
      expect(Board.nextDigit(4)).to.equal(5);
      expect(Board.nextDigit(5)).to.equal(6);
      expect(Board.nextDigit(6)).to.equal(7);
      expect(Board.nextDigit(7)).to.equal(8);
      expect(Board.nextDigit(8)).to.equal(9);
    });
    it("returns 1 if (digit + 1) % 10 is 0.", function () {
      expect(Board.nextDigit(9)).to.equal(1);
    });
  });

  describe("drawNumbers", function () {
    it("throws an error when given a wrong amount of cells to erase", function () {
      const board = new Board(Board.matrix());

      expect(board.drawNumbers(NaN)).to.throw();
      expect(board.drawNumbers(-NaN)).to.throw();
      expect(board.drawNumbers(Infinity)).to.throw();
      expect(board.drawNumbers(-Infinity)).to.throw();
      expect(board.drawNumbers(-2)).to.throw();
      expect(board.drawNumbers(-1.45)).to.throw();
      expect(board.drawNumbers(40.5)).to.throw();
      expect(board.drawNumbers(81.2)).to.throw();
      expect(board.drawNumbers(930)).to.throw();
      expect(board.drawNumbers(930.2)).to.throw();
    });
  });
});
