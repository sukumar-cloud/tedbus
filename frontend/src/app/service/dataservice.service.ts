import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  private apiUrl = `${environment.apiUrl}/travel-stories`; // Use environment variable
private datasource=new BehaviorSubject<any>(null);
currentdata=this.datasource.asObservable();
private passdetails=new BehaviorSubject<any>(null);
passdata=this.passdetails.asObservable();

sendobj(obj:any){
  this.datasource.next(obj)
}

passobj(obj:any){
  this.passdetails.next(obj);
}

  constructor() { }
}
