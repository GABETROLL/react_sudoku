import shuffleArray from './shuffleArray';

export type CellInfo = {digit: number, permanent: boolean};


export default class Board {
    array: CellInfo[][] = [];

    static matrix(): CellInfo[][] {
        const result: CellInfo[][] = [];

        for (let i = 0; i < 9; i++) {
            const currentRow: CellInfo[] = [];
  
            for (let j = 0; j < 9; j++) {
                currentRow.push({digit: 0, permanent: false});
            }

            result.push(currentRow);
        }
  
    return result;
    }

    static validNumber(x: number): boolean {
        return Number.isInteger(x) && 0 <= x && x <= 9;
    }
  
    drawNumbers(): void {
        function nextPosition(i: number, j: number): [number, number] | null {
            if (j === 8 && i === 8) {
                return null;
            } else if (j === 8) {
                return [i + 1, 0];
            } else {
                return [i, j + 1];
            }
        }
  
        function previousPosition(i: number, j: number): [number, number] {
            if (j === 0 && i === 0) {
                throw "You're ALREADY at the beginning!";
            }

            if (j === 0) {
                return [i - 1, 8];
            } else {
                return [i, j - 1];
            }
        }
  
        let i = 0;
        let j = 0;
  
        while (true) {
            let possibleCellNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            shuffleArray(possibleCellNumbers);

            while (possibleCellNumbers.length) {
                this.array[i][j] = {digit: possibleCellNumbers.pop()!, permanent: true};

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

        // TODO: ERASE SOME OF THE NUMBERS.
    }

    initialize(): void {
        this.array = Board.matrix();
        this.drawNumbers();
    }

    constructor(array: CellInfo[][] | undefined) {
        if (array === undefined) {
            this.initialize();
        } else {
            this.array = array;
        }
    }

    writeCell(y: number, x: number, digit: number): Board {
        const arrayCopy: CellInfo[][] = this.array.map((row) => (row.map((cellInfo) => ({...cellInfo}))));

        if (!(0 <= y && y < 9 && 0 <= x && x < 9)) {
            throw "Cell position is invalid!";
        }
        if (!(0 <= digit && digit <= 9)) {
            throw "Digit for cell is invalid!";
        }

        if (arrayCopy[y][x].permanent === true) {
            throw "Attempting to write permanent cell!";
        }

        arrayCopy[y][x].digit = digit;
        return new Board(arrayCopy);
    }

    // Returns wether or not the number in the cell with coordinates
    // (y,x) is valid.
    // (Yes, the y-axis comes first, and is the vertical axis,
    // and x is the horizontal axis, and comes second)
    //
    // `zeroValid` indicates to the method if a cell being empty
    // (the cell's value is 0) should be considered valid.
    //
    // This may be necessary, for example, if the player wants to see what
    // parts of the board they just filled are currently valid, without
    // highlighting all of the empty cells, which may be overwhelming.
    // (I can't remember the exact reason this was needed, though)
    valid_cell(y: number, x: number, zeroValid: boolean): boolean {
        const cell_digit: number = this.array[y][x].digit;

        if (cell_digit === 0 && zeroValid) {
            return true;
        } else if (cell_digit === 0 && !zeroValid) {
            return false;
        }

        // check row
        for (const [x_index, cellInfo] of this.array[y].entries()) {
            if (x_index === x) {
                continue;
            }

            if (cellInfo.digit === cell_digit) {
                return false;
            }
        }

        // check column
        for (let y_index = 0; y_index < 9; y_index++) {
            const cell_info = this.array[y_index][x];

            if (y_index === y) {
                continue;
            }

            if (cell_info.digit === cell_digit) {
                return false;
            }
        }

        // check square
        const y_square_start = Math.floor(y / 3) * 3;
        const x_square_start = Math.floor(x / 3) * 3;

        for (let y_index = y_square_start; y_index < y_square_start + 3; y_index++) {
            for (let x_index = x_square_start; x_index < x_square_start + 3; x_index++) {
                if (y_index === y && x_index === x) {
                    continue;
                }

                const cell_info: CellInfo = this.array[y_index][x_index];

                if (cell_info.digit === cell_digit) {
                    return false;
                }
            }
        }

        return true;
    }
}
