import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
    let service: TranslationService;
    let translateServiceSpy: jasmine.SpyObj<TranslateService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('TranslateService', ['setDefaultLang', 'use', 'currentLang']);

        TestBed.configureTestingModule({
            providers: [
                TranslationService,
                { provide: TranslateService, useValue: spy }
            ]
        });

        service = TestBed.inject(TranslationService);
        translateServiceSpy = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set default language', () => {
        expect(translateServiceSpy.setDefaultLang).toHaveBeenCalledWith('en');
    });

    it('should switch language', () => {
        service.switchLanguage('fr');
        expect(translateServiceSpy.use).toHaveBeenCalledWith('fr');
    });

    it('should get current language', () => {
        translateServiceSpy.currentLang = 'es';
        expect(service.getCurrentLanguage()).toBe('es');
    });
});
