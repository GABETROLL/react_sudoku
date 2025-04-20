import shuffleArray from './shuffleArray';

export default class Board {
    array: Array<Array<number>> = [];

    static matrix(): Array<Array<number>> {
        const result = [];

        for (let i = 0; i < 9; i++) {
            const currentRow: Array<number> = [];
  
            for (let j = 0; j < 9; j++) {
                currentRow.push(0);
            }

            result.push(currentRow);
        }
  
    return result;
    }
  
    drawNumbers(): void {
        let i = 0;
        let j = 0;
  
        function nextPosition(i: number, j: number): Array<number> | null {
            if (j === 8 && i === 8) {
                return null;
            } else if (j === 8) {
                return [i + 1, 0];
            } else {
                return [i, j + 1];
            }
        }
  
        function previousPosition(i: number, j: number): Array<number> {
            if (j === 0 && i === 0) {
                throw "You're back to the beginning!";
            }

            if (j === 0) {
                return [i - 1, 8];
            } else {
                return [i, j - 1];
            }
        }

        while (true) {
            let possibleCellNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            shuffleArray(possibleCellNumbers);

            while (possibleCellNumbers.length) {
                this.array[i][j] = possibleCellNumbers.pop()!;

                if (this.valid_cell(i, j, false))
                    break;
            }

            if (!this.valid_cell(i, j, false)) {
                [i, j] = previousPosition(i, j);
            } else {
                let upcomingPosition = nextPosition(i, j);

                if (upcomingPosition === null) {
                    break;
                }

                [i, j] = upcomingPosition;
            }
        }
    }

    initialize(): void {
        this.array = Board.matrix();
        this.drawNumbers();
    }

  constructor(array: Array<Array<number>> | undefined) {
    if (array === undefined) {
      this.initialize();
    } else {
      this.array = array;
    }
  }

  writeCell(y: number, x: number, digit: number): Board {
    const arrayCopy: Array<Array<number>> = this.array.map((row) => (row.map((digit) => digit)));

    if (!(0 <= y && y < 9 && 0 <= x && x < 9)) {
      throw "Cell position is invalid!";
    }
    if (!(0 <= digit && digit <= 9)) {
      throw "Digit for cell is invalid!";
    }

    arrayCopy[y][x] = digit;
    return new Board(arrayCopy);
  }

    // Returns wether or not the number in the cell with coordinates
    // (y,x) is valid.
    // (Yes, the y-axis comes first, and is the vertical axis)
    valid_cell(y: number, x: number, zeroValid: boolean): boolean {
        const cell_number = this.array[y][x];

        if (cell_number === 0 && zeroValid) {
            return true;
        } else if (cell_number === 0 && !zeroValid) {
            return false;
        }

        // check row
        for (const [x_index, number] of this.array[y].entries()) {
            if (x_index == x) {
                continue;
            }

            if (number == cell_number) {
                return false;
            }
        }

        // check column
        for (let y_index = 0; y_index < 9; y_index++) {
            const number = this.array[y_index][x];

            if (y_index == y) {
                continue;
            }

            if (number == cell_number) {
                return false;
            }
        }

        // check square
        const y_square_start = Math.floor(y / 3) * 3;
        const x_square_start = Math.floor(x / 3) * 3;

        for (let y_index = y_square_start; y_index < y_square_start + 3; y_index++) {
            for (let x_index = x_square_start; x_index < x_square_start + 3; x_index++) {
                if (y_index == y && x_index == x) {
                    continue;
                }
                
                const number = this.array[y_index][x_index];

                if (number == cell_number) {
                    return false;
                }
            }
        }

        return true;
    }
}
