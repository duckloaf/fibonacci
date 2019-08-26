import { TestBed, async } from '@angular/core/testing';
import { FibonacciService } from './fibonacci.service';

describe('The NumberValidation service', () => {
    let fibonacciService: FibonacciService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [FibonacciService],
        }).compileComponents();
        fibonacciService = TestBed.get(FibonacciService);
    }));

    it('should be created', () => {
        expect(fibonacciService).toBeTruthy();
    });

    describe('The generateSequence function', () => {
        it('should create an array of the specified length', () => {
            const fibArray1 = fibonacciService.generateSequence(5);
            expect(fibArray1.length).toEqual(5);
            const fibArray2 = fibonacciService.generateSequence(10);
            expect(fibArray2.length).toEqual(10);
        });
        it('should create a valid array of fibonacci numbers', () => {
            const fibArray = fibonacciService.generateSequence(50);
            expect(fibArray[0]).toEqual(1);
            expect(fibArray[1]).toEqual(1);
            expect(fibArray[5]).toEqual(8);
            expect(fibArray[25]).toEqual(121393);
            expect(fibArray[49]).toEqual(12586269025);
        });
    });

    describe('The isFibonacciNumber function', () => {
        it('should return true if the specified number is a fibonacci number', () => {
            fibonacciService.fibonacciSequence = fibonacciService.generateSequence(50);
            expect(fibonacciService.isFibonacciNumber(1)).toEqual(true);
            expect(fibonacciService.isFibonacciNumber(2)).toEqual(true);
            expect(fibonacciService.isFibonacciNumber(21)).toEqual(true);
            expect(fibonacciService.isFibonacciNumber(121393)).toEqual(true);
            expect(fibonacciService.isFibonacciNumber(12586269025)).toEqual(true);
        });
        it('should return false if the specified number is not a fibonacci number', () => {
            fibonacciService.fibonacciSequence = fibonacciService.generateSequence(50);
            expect(fibonacciService.isFibonacciNumber(4)).toEqual(false);
            expect(fibonacciService.isFibonacciNumber(15)).toEqual(false);
            expect(fibonacciService.isFibonacciNumber(22)).toEqual(false);
            expect(fibonacciService.isFibonacciNumber(500)).toEqual(false);
            expect(fibonacciService.isFibonacciNumber(100000)).toEqual(false);
        });
    });
});