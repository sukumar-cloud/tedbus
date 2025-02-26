import { Component, Input } from '@angular/core';
import { ReviewService } from 'src/app/service/review.service'; // Ensure the correct path

@Component({
  selector: 'app-bottom-tab',
  templateUrl: './bottom-tab.component.html',
  styleUrl: './bottom-tab.component.css'
})
export class BottomTabComponent {
  @Input() filledseats: number[] = [];
  @Input() seatprice: number = 0;
  @Input() routedetials: any;
  @Input() busarrivaltime: number = 0;
  @Input() busdeparturetime: number = 0;
  @Input() operatorname: string = '';
  @Input() busid: string = '';

  tabstate: boolean[] = [false, false, false, false, false];
  reviews: { rating: number; comment: string; user: string }[] = [];

  constructor(private reviewService: ReviewService) {}

  handletabstate(value: number): void {
    for (let i = 0; i < this.tabstate.length; i++) {
      this.tabstate[i] = i === value && !this.tabstate[i];
    }
    if (value === 2) {
      this.showReviews();  // Call showReviews() when clicking the Reviews tab
    }
  }

  showReviews(): void {
    this.reviewService.getUserReviews().subscribe((data: { rating: number; comment: string; user: string }[]) => {
      this.reviews = data;
    });
  }
}
