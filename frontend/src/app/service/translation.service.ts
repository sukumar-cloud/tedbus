import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    constructor(private translate: TranslateService) {
        this.translate.setDefaultLang('en');
    }
    private apiUrl = `${environment.apiUrl}/travel-stories`; // Use environment variable

    switchLanguage(lang: string) {
        this.translate.use(lang);
    }

    getCurrentLanguage(): string {
        return this.translate.currentLang || 'en';
    }
}
