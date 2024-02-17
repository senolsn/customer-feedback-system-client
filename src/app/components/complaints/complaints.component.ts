// complaints.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Complaint } from 'src/app/models/complaint';
import { Employee } from 'src/app/models/employee';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  unResolvedComplaints: Complaint[] = [];
  employee: Employee;

  constructor(
    private complaintService: ComplaintsService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: { email: string } = jwtDecode(token);
      const encodedEmail = encodeURIComponent(decodedToken.email);
      this.getEmployeeAndComplaints(encodedEmail); // Unresolved Complaintsleri getir.
    } else {
      console.error('Token bulunamadı veya geçersiz.');
    }
  }

  getUnresolvedComplaints(employeeId: string): void {
    this.complaintService.getUnresolvedComplaintsByEmployeeId(employeeId).subscribe((response: any) => {
      this.unResolvedComplaints = response.data;
    });
  }

  getEmployeeAndComplaints(encodedEmail: string): void {
    this.employeeService.getByMail(encodedEmail).subscribe(response => {
      this.employee = response.data;
      console.log(this.employee.id);
      this.getUnresolvedComplaints(this.employee.id);
      console.log(this.unResolvedComplaints);
    });
  }
}
