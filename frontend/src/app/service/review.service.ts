import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:5000/api/reviews'; // Change based on your backend

  constructor(private http: HttpClient) {}

  getUserReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
