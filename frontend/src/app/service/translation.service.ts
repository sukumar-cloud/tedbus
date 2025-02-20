import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    constructor(private translate: TranslateService) {
        this.translate.setDefaultLang('en');
    }

    switchLanguage(lang: string) {
        this.translate.use(lang);
    }

    getCurrentLanguage(): string {
        return this.translate.currentLang || 'en';
    }
}
