import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class FibonacciService {
    fibonacciSequence: number[];
    
    /**
     * Rather than calculating the fibonacci sequence every time a number is entered,
     * calculate it once and then check entered numbers against the generated array.
     */
    generateSequence(sequenceLength: number): number[] {
        this.fibonacciSequence = [];

        // Push the first two numbers into the array
        this.fibonacciSequence.push(1);
        this.fibonacciSequence.push(1);

        // Loop through and generate the required number of fibonacci numbers
        let iterator = 2;
        while (iterator < sequenceLength) {
            this.fibonacciSequence.push(
                this.fibonacciSequence[iterator - 2] + this.fibonacciSequence[iterator - 1]
            );
            iterator += 1;
        }

        return this.fibonacciSequence;
    }

    isFibonacciNumber(value: number): boolean {
        return this.fibonacciSequence.includes(value);
    }
}
