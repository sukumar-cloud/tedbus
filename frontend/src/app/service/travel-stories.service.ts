import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TravelStoriesService {
    private apiUrl = `${environment.apiUrl}/travel-stories`; // ✅ Use environment variable

    constructor(private http: HttpClient) { }

    getStories(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    addStory(story: { title: string, content: string }): Observable<any> {
        return this.http.post<any>(this.apiUrl, story);
    }
}
