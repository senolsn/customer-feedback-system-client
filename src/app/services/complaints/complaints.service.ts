import { UpdateComplaintModelForEmployee } from './../../models/updateComplaintModelForEmployee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateComplaintModelForCustomer } from 'src/app/models/UpdateComplaintModelForCustomer';
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

  getAllComplaintsByCustomerId(customerId:string):Observable<ListResponseModel<Complaint>>{
    let newPath = this.apiUrl +'Complaints/GetAllComplaintsByCustomerId?customerId='+customerId
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


  updateForEmployee(updateComplaintModelForEmployee:UpdateComplaintModelForEmployee){
    let newPath = this.apiUrl + 'Complaints/UpdateForEmployee';
    return this.httpClient.put(newPath,updateComplaintModelForEmployee);
  }

  updateForCustomer(updateComplaintModelForCustomer:UpdateComplaintModelForCustomer){
    let newPath = this.apiUrl + 'Complaints/UpdateForCustomer';
    return this.httpClient.put(newPath,updateComplaintModelForCustomer);
  }

  delete(complaint:Complaint){
    let newPath = this.apiUrl + 'Complaints/Delete';
    return this.httpClient.post(newPath,complaint);
  }
}
