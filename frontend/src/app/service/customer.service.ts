import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { url } from '../config';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = `${environment.apiUrl}/travel-stories`; // Use environment variable

  private apiurl:string=url + 'customer/'
  constructor(private http:HttpClient) { }

  addcustomermongo(user:any):Observable<Customer>{
    const customer:Customer={
      name:user.name,
      email:user.email,
      googleId:user.id,
      profilepicture:user.picture
    }
    return this.http.post<Customer>(this.apiurl,customer  )
}
}
