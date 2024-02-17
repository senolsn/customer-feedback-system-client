import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Complaint } from 'src/app/models/complaint';
import { Employee } from 'src/app/models/employee';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  complaints:Complaint[] = [];
  employee:Employee;

  unResolvedComplaints:Complaint[] = [];

  allUnresolvedComplaints:Complaint[] = [];
  allResolvedComplaints:Complaint[] = [];
  

constructor(
  private complaintService:ComplaintsService,
  private employeeService:EmployeeService) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: { email: string } = jwtDecode(token);
      const encodedEmail = encodeURIComponent(decodedToken.email);
      this.getEmployeeAndComplaints(encodedEmail) //Unresolved Complaintsleri getir.
      this.getComplaints()
      this.getAllUnresolvedComplaints()
      this.getAllResolvedComplaints()
    }else{
      console.error('Token bulunamadı veya geçersiz.');
    }
  }

  getComplaints(){
    this.complaintService.getAllComplaints().subscribe(response => {
      this.complaints = response.data
    })
  }

  getAllUnresolvedComplaints(){
    this.complaintService.getAllUnresolvedComplaints().subscribe(response => {
      this.allUnresolvedComplaints = response.data;
    })
  }

  getAllResolvedComplaints(){
    this.complaintService.getAllResolvedComplaints().subscribe(response => {
      this.allResolvedComplaints = response.data;
    } )
  }

  getCreatedComplaints(employeeId:string){
    this.complaintService.getCreatedComplaintsByEmployeeId(employeeId).subscribe((response: any) =>{
      this.unResolvedComplaints = response.data;
    });
  }

  getEmployeeAndComplaints(encodedEmail: string): void {
    this.employeeService.getByMail(encodedEmail).subscribe(response => {
      this.employee = response.data;
      console.log(this.employee.id);
      this.getCreatedComplaints(this.employee.id);
      console.log(this.unResolvedComplaints);
    });
  }

}
