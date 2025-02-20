import { Component } from '@angular/core';
import { TranslationService } from './service/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  selectedLang = 'en'; // Default language

  constructor(private translationService: TranslationService) {
    this.selectedLang = this.translationService.getCurrentLanguage() || 'en';
  }

  switchLanguage() {
    this.translationService.switchLanguage(this.selectedLang);
  }
}
