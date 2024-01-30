
export class Message {
    numPairs: number;
    constructor(numPairs: number) {
        this.numPairs = numPairs;
    }

    updateNumPairs(numPairs: number) {
        this.numPairs = numPairs;
    }

    getMessage() {
        let plural = this.numPairs === 1 ? "pair" : "pairs";
        return `${this.numPairs} ${plural}: Press SPACE to play`;
    }

    getCurrentMessage(): string {
        return this.getMessage();
    }
}
