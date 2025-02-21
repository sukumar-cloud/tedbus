import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Booking } from '../../model/booking.model';
import { BusService } from '../../service/bus.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  selecteditem: string = 'trips';
  currentcustomer: any = [];
  currentname: string = '';
  currentemail: string = '';
  mytrip: Booking[] = [];
  reviewForm!: FormGroup;
  reviews: any;

  constructor(private busbooking: BusService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.currentcustomer = sessionStorage.getItem('Loggedinuser');
    const user = JSON.parse(this.currentcustomer);
    this.currentname = user.name;
    this.currentemail = user.email;

    this.busbooking.getbusmongo(user._id).subscribe((response: any) => {
      this.mytrip = response;
      console.log(this.mytrip);
    });

    // Initialize the review form
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });
  }

  handlelistitemclick(selected: string): void {
    this.selecteditem = selected;
  }

  submitReview(): void {
    if (this.reviewForm.valid) {
      console.log('Review Submitted:', this.reviewForm.value);
      this.reviewForm.reset();
    }
  }

  sendNotification() {
    const fcmToken = localStorage.getItem('fcm_token');

    if (!fcmToken) {
      console.error("No FCM token found.");
      return;
    }

    const payload = {
      title: "Booking Confirmation",
      body: "Your bus ticket has been booked successfully!",
      token: fcmToken
    };

    this.http.post("http://localhost:3000/send-notification", payload)
      .subscribe(response => console.log("Notification sent", response),
        error => console.error("Error sending notification", error));
  }

  sendSMS() {
    const userPhone = "+911234567890"; // Replace with dynamic phone number retrieval logic

    const payload = {
      phone: userPhone,
      message: "Your bus ticket has been booked successfully!"
    };

    this.http.post("/send-sms", payload)
      .subscribe(response => console.log("SMS sent", response),
        error => console.error("Error sending SMS", error));
  }
}
