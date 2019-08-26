import { Injectable } from "@angular/core";
import { isNumber } from 'util';

@Injectable({
    providedIn: 'root'
})
export class NumberValidationService {
    
    /**
     * Numbers entered must be positive integers.
     * Decimals will be rounded to the nearest whole number.
     * Numbers less than 1 will default to 1.
     * Non-numeric values will return a null value.
     */
    sanitiseInput(input: number): number {
        if (!isNumber(input)) {
            return null;
        } else {
            return Math.max(1, Math.round(input));
        }
    }
}
