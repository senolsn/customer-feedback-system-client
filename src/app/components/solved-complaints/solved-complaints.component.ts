import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Complaint } from 'src/app/models/complaint';
import { Employee } from 'src/app/models/employee';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-solved-complaints',
  templateUrl: './solved-complaints.component.html',
  styleUrls: ['./solved-complaints.component.css']
})
export class SolvedComplaintsComponent implements OnInit {
  resolvedComplaints:Complaint[] = [];
  employee:Employee;

constructor(
  private complaintService:ComplaintsService,
  private employeeService:EmployeeService
) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: { email: string } = jwtDecode(token);
      const encodedEmail = encodeURIComponent(decodedToken.email);
      this.getEmployeeAndComplaints(encodedEmail) //Resolved Complaintsleri getir.
    }else{
      console.error('Token bulunamadı veya geçersiz.');
    }
  }


  getResolvedComplaints(employeeId:string){
    this.complaintService.getResolvedComplaintsByEmployeeId(employeeId).subscribe((response: any) =>{
      this.resolvedComplaints = response.data;
    });
  }

  getEmployeeAndComplaints(encodedEmail: string): void {
    this.employeeService.getByMail(encodedEmail).subscribe(response => {
      this.employee = response.data;
      console.log(this.employee.id);
      this.getResolvedComplaints(this.employee.id);
      console.log(this.resolvedComplaints);
    });
  }
}
