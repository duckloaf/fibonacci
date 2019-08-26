import { TestBed, async } from '@angular/core/testing';
import { NumberValidationService } from './number-validate.service';

describe('The NumberValidation service', () => {
    let validationService: NumberValidationService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [NumberValidationService],
        }).compileComponents();
        validationService = TestBed.get(NumberValidationService);
    }));

    it('should be created', () => {
        expect(validationService).toBeTruthy();
    });

    describe('The sanitiseInput function', () => {
        it('should pass back positive integers', () => {
            expect(validationService.sanitiseInput(1)).toEqual(1);
            expect(validationService.sanitiseInput(2)).toEqual(2);
        });
        it('should round positive decimals to the nearest integer', () => {
            expect(validationService.sanitiseInput(3.4)).toEqual(3);
            expect(validationService.sanitiseInput(5.6)).toEqual(6);
            expect(validationService.sanitiseInput(0.2)).toEqual(1);
        });
        it('should return 1 for negative integers and decimals', () => {
            expect(validationService.sanitiseInput(-10)).toEqual(1);
            expect(validationService.sanitiseInput(-0.1)).toEqual(1);
        });
        it('should return 1 if 0 is entered', () => {
            expect(validationService.sanitiseInput(0)).toEqual(1);
        });
    });
});