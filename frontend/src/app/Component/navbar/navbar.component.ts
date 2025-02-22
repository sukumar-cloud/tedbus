import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
declare var google: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isloggedIn: boolean = false;
  showChat: boolean = false; // Added for chatbot toggle

  constructor(private router: Router, private customerservice: CustomerService) {}

  ngOnInit(): void {
    if (sessionStorage.getItem("Loggedinuser")) {
      this.isloggedIn = true;
    } else {
      this.isloggedIn = false;
    }

    google.accounts.id.initialize({
      client_id: "927389231250-guo104mabm73spnj3ef7atl55v8ueuk7.apps.googleusercontent.com",
      callback: (response: any) => { this.handlelogin(response); }
    });
  }

  ngAfterViewInit(): void {
    this.rendergooglebutton();
  }

  private rendergooglebutton(): void {
    const googlebtn = document.getElementById('google-btn');
    if (googlebtn) {
      google.accounts.id.renderButton(googlebtn, {
        theme: 'outline',
        size: 'medium',
        shape: 'pill',
        width: 150,
      });
    }
  }

  private decodetoken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handlelogin(response: any) {
    const payload = this.decodetoken(response.credential);
    this.customerservice.addcustomermongo(payload).subscribe({
      next: (response) => {
        console.log('POST success', response);
        sessionStorage.setItem("Loggedinuser", JSON.stringify(response));
      },
      error: (error) => {
        console.error('POST request failed', error);
      }
    });
  }

  handlelogout() {
    google.accounts.id.disableAutoSelect();
    sessionStorage.removeItem('Loggedinuser');
    window.location.reload();
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  // 🔹 Chatbot Toggle Function
  toggleChat() {
    this.showChat = !this.showChat;
  }
}
