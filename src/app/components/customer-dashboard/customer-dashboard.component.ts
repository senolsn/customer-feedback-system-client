import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Complaint } from 'src/app/models/complaint';
import { Customer } from 'src/app/models/customer';
import { Employee } from 'src/app/models/employee';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  customer:Customer
  unResolvedComplaints:Complaint[] = [];
  employees:Employee[] = [];

  complaintsTitle:string;
  complaintsDescription:string;
  complaintsEmployee:Employee;
  
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: { email: string } = jwtDecode(token);
      const encodedEmail = encodeURIComponent(decodedToken.email);
      this.getCustomerAndUnresolvedComplaints(encodedEmail);

    }else{
      console.error('Token bulunamadı veya geçersiz.');
    }
  }

  constructor(
    private complaintService:ComplaintsService,
    private customerService:CustomerService,
    private toastr:ToastrService,
    private employeeService:EmployeeService) {}
  

    getCustomerAndUnresolvedComplaints(email:string){
      this.customerService.getByMail(email).subscribe(response => {
        this.customer = response.data
        this.complaintService.getAllComplaintsByCustomerId(this.customer.id).subscribe(response => {
          this.unResolvedComplaints = response.data;
        })
      })
    }

    updateComplaints(){

    }

    handleClick(complaint:Complaint){

    }

    getAllEmployes(){
      this.employeeService.getAllEmployes().subscribe(response =>{
        this.employees = response.data
      })
    }
}
