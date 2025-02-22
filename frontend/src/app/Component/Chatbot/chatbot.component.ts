import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  constructor(private location: Location) {}

  // Go back to the previous page when clicking "X"
  closeChat() {
    this.location.back();
  }
}
