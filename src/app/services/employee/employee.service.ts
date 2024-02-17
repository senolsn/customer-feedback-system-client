import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
   apiUrl = 'https://localhost:44328/api/';
  constructor(private httpClient:HttpClient) { }

  getByMail(email: string): Observable<SingleResponseModel<Employee>> {
    let newPath = this.apiUrl + 'Employees/GetByMail?mail='+email;
    return this.httpClient.get<SingleResponseModel<Employee>>(newPath);
  }
}
