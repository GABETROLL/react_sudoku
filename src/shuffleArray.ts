export default function shuffleArray(x: Array<any>): void {
    for (let index = 0; index < x.length; index++) {
        const randomSwapIndex: number = Math.floor(Math.random() * x.length);

        const current = x[index];
        x[index] = x[randomSwapIndex];
        x[randomSwapIndex] = current;
    }
}
