import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { take } from 'rxjs/operators';
import { TranslationService } from './service/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  selectedLang = 'en'; // Default language

  constructor(
    private translationService: TranslationService, 
    private afMessaging: AngularFireMessaging
  ) {
    this.selectedLang = this.translationService.getCurrentLanguage() || 'en';
  }

  ngOnInit() {
    this.requestPermission();
    this.listenForMessages();
  }

  switchLanguage() {
    this.translationService.switchLanguage(this.selectedLang);
  }

  requestPermission() {
    this.afMessaging.requestToken
      .pipe(take(1))
      .subscribe(
        (token) => {
        if (token) {
          console.log('FCM Token:', token);
          localStorage.setItem('fcm_token', token);
        } else {
          console.warn('FCM Token is null');
        }
      },
        error => console.error('Error getting notification permission', error)
      );
  }
  
  listenForMessages() {
    this.afMessaging.messages.subscribe((message: any) => {
      console.log('Message received:', message);
    });
  }
}
