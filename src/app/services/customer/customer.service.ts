import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
apiUrl = 'https://localhost:44328/api/';

  constructor(private httpClient:HttpClient) { }

  getByMail(email: string): Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + 'Customers/GetByMail?mail='+email
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath)
  }
}
