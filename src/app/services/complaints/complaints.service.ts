import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint } from 'src/app/models/complaint';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  apiUrl = 'https://localhost:44328/api/';
  constructor(private httpClient:HttpClient) { }

  getAllComplaints():Observable<ListResponseModel<Complaint>>{
    let newPath = this.apiUrl + 'Complaints/GetAllComplaints'
    return this.httpClient.get<ListResponseModel<Complaint>>(newPath);
  }

  getResolvedComplaintsByEmployeeId(employeeId:string):Observable<ListResponseModel<Complaint>>{
    let newPath = this.apiUrl + 'Complaints/GetResolvedComplaintsByEmployeeId?employeeId='+employeeId;
    return this.httpClient.get<ListResponseModel<Complaint>>(newPath);
  }

  getUnresolvedComplaintsByEmployeeId(employeeId:string):Observable<ListResponseModel<Complaint>>{
    let newPath = this.apiUrl + 'Complaints/GetUnresolvedComplaintsByEmployeeId?employeeId='+employeeId;
    return this.httpClient.get<ListResponseModel<Complaint>>(newPath);
  }

  getCreatedComplaintsByEmployeeId(employeeId:string):Observable<ListResponseModel<Complaint>>{
    let newPath = this.apiUrl + 'Complaints/GetCreatedComplaintsByEmployeeId?employeeId='+employeeId;
    return this.httpClient.get<ListResponseModel<Complaint>>(newPath);
  }

  getAllResolvedComplaints(){
    let newPath = this.apiUrl + 'Complaints/GetAllResolvedComplaints'
    return this.httpClient.get<ListResponseModel<Complaint>>(newPath);
  }

  getAllUnresolvedComplaints(){
    let newPath = this.apiUrl + 'Complaints/GetAllUnsolvedComplaints'
    return this.httpClient.get<ListResponseModel<Complaint>>(newPath);
  }
}
