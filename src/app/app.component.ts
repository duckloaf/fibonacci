import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import { isNumber } from 'util';
import { Fibonacci } from './fibonacci.service';
import { NumberValidation } from './number-validate.service';


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
        private fib: Fibonacci,
        private numVal: NumberValidation
    ) {}

    ngOnInit() {
        this.enteredNumbers = [];
        this.fibonacciSequence = this.fib.generateSequence(1000);
        this.timerPaused = true;
        this.outputStrings.push('Please input the number of time in seconds between emitting numbers and their frequency');
    }

    startProgram(): void {
        const trustedValue = this.numVal.sanitiseInput(this.refreshTimeInput);
        if (!trustedValue) {
            return;
        } else {
            this.refreshTime = trustedValue * 5;
            this.refreshTimeDisplay = trustedValue;
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

    numberEntered(): void {
        const trustedValue = this.numVal.sanitiseInput(this.numberInput);
        this.outputStrings.push(`${trustedValue}`);

        if (this.fib.isFibonacciNumber(trustedValue)) {
            this.outputStrings.push('FIB');
        }

        if (!this.enteredNumbers[trustedValue]) {
            this.enteredNumbers[trustedValue] = 0;
        }
        this.enteredNumbers[trustedValue] = this.enteredNumbers[trustedValue] + 1;
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
