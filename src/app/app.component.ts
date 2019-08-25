import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import { isNumber } from 'util';
import { Fibonacci } from './fibonacci.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    refreshTime: number;
    refreshTimeInput: number;
    refreshTimeDisplay: number;
    refreshTicker: number;
    timerPaused: boolean;
    numberInput: number;
    enteredNumbers: number[] = [];
    fibonacciSequence: number[];
    subscription: Subscription;
    ticker: Observable<number> = timer(0, 200);
    outputStrings: string[] = [];

    constructor(
        private fib: Fibonacci
    ) {}

    ngOnInit() {
        this.enteredNumbers = [];
        this.fibonacciSequence = this.fib.generateSequence(1000);
        this.timerPaused = true;
        this.outputStrings.push('Please input the number of time in seconds between emitting numbers and their frequency');
    }

    startProgram(): void {
        // The refresh interval must be a number
        if (!isNumber(this.refreshTimeInput)) {
            this.refreshTimeInput = 0;
            return;
        }
        // The refresh interval must be a positive integer
        if (this.refreshTimeInput < 1) {
            this.refreshTime = 5;
            this.refreshTimeDisplay = 1;
        } else {
            this.refreshTime = Math.round(this.refreshTimeInput) * 5;
            this.refreshTimeDisplay = Math.round(this.refreshTimeInput);
        }
        this.timerPaused = false;
        this.refreshTicker = this.refreshTime;
        this.outputStrings.push(`${this.refreshTimeInput}`);
        this.startTimer();
    }

    startTimer(): void {
        this.subscription = this.ticker.subscribe((tick) => {
            // If the timer is not paused, continue the countdown
            if (!this.timerPaused) {
                this.refreshTicker -= 1;
            }
            if (this.refreshTicker === 0) {
                this.outputStrings.push(this.outputEnteredNumbers());
                this.refreshTicker = this.refreshTime;
            }
        })
    }

    timerOperation(): void {
        if (this.timerPaused) {
            this.outputStrings.push('timer resumed');
        } else {
            this.outputStrings.push('timer halted');
        }
        this.timerPaused = !this.timerPaused;
    }

    progressBarPercentage(): number {
        return 100 * (this.refreshTicker / this.refreshTime);
    }

    numberEntered() {
        this.outputStrings.push(`${this.numberInput}`);

        if (this.fib.isFibonacciNumber(this.numberInput)) {
            this.outputStrings.push('FIB');
        }

        if (!this.enteredNumbers[this.numberInput]) {
            this.enteredNumbers[this.numberInput] = 0;
        }
        this.enteredNumbers[this.numberInput] = this.enteredNumbers[this.numberInput] + 1;
    }

    outputEnteredNumbers(): string {
        let outputString: string = '';
        this.enteredNumbers.map((value, index) => {
            return {enteredNumber: index, frequency: value};
        }).sort((a, b) => {
            return b.frequency - a.frequency;
        }).forEach((valuePair) => {
            if (valuePair.enteredNumber) {
                outputString += `${valuePair.enteredNumber}:${valuePair.frequency}, `;
            }
        })
        // console.log(outputString.substr(0, outputString.length - 2));
        return outputString.substr(0, outputString.length - 2);
    }

    quit(): void {
        this.outputStrings.push(this.outputEnteredNumbers());
        this.outputStrings.push('Thanks for playing, the game has now ended.');
        this.enteredNumbers = [];
        this.timerPaused = true;
        this.refreshTime = null;
        this.refreshTimeInput = null;
        this.subscription.unsubscribe();
    }

}
