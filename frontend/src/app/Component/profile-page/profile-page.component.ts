import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Booking } from '../../model/booking.model';
import { BusService } from '../../service/bus.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  selecteditem: string = 'trips';
  currentcustomer: any = [];
  currentname: string = '';
  currentemail: string = '';
  mytrip: Booking[] = [];
  reviewForm!: FormGroup;
  reviews: any;

  constructor(private busbooking: BusService, private fb: FormBuilder) {}

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
}
