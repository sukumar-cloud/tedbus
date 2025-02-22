import { Component, Input, OnInit } from '@angular/core';
import { TravelStoriesService } from '../../../service/travel-stories.service';

@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  styleUrl: './my-trip.component.css'
})
export class MyTripComponent implements OnInit {
  @Input() booking: any;
  travelStories: any[] = [];  // Travel stories array

  imageArr = [
    {
      _id: { $oid: "6049b8a97501a24470b9a526" },
      images: "https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/2323/1087/GW/DL/6fNUIf.jpeg"
    },
    // Other image objects...
    {
      _id: { $oid: "604b8aedb3f0410d74d91bf8" },
      images: "https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/2323/1087/GW/DL/6fNUIf.jpeg"
    },
  ];

  randomimage: string = '';

  constructor(private travelStoriesService: TravelStoriesService) {}

  ngOnInit() {
    // Set random image
    const randomindex = Math.floor(Math.random() * this.imageArr.length);
    this.randomimage = this.imageArr[randomindex].images;

    // Load travel stories
    this.loadTravelStories();
  }

  // Fetch travel stories from backend
  loadTravelStories() {
    this.travelStoriesService.getStories().subscribe(
      (data) => {
        this.travelStories = data;
      },
      (error) => {
        console.error('Error fetching stories:', error);
      }
    );
  }
}
