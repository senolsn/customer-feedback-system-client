import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Complaint } from 'src/app/models/complaint';
import { Employee } from 'src/app/models/employee';
import { UpdateComplaintModelForEmployee } from 'src/app/models/updateComplaintModelForEmployee';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  complaints:Complaint[] = [];
  employee:Employee;
  updateComplaintsModel:UpdateComplaintModelForEmployee;

  unResolvedComplaints:Complaint[] = [];

  allUnresolvedComplaints:Complaint[] = [];
  allResolvedComplaints:Complaint[] = [];
  

constructor(
  private complaintService:ComplaintsService,
  private employeeService:EmployeeService,
  private toastr:ToastrService) {}
 
 
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: { email: string } = jwtDecode(token);
      const encodedEmail = encodeURIComponent(decodedToken.email);
      this.getEmployeeAndComplaints(encodedEmail) //Unresolved Complaintsleri getir.
      this.getComplaints() //Total Complaints
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

  markComplaintAsInprogress(complaint: Complaint): void {
    // Complaint türünden bir nesneyi UpdateComplaintModelForEmployee türüne dönüştür
    let updateComplaintsModel: UpdateComplaintModelForEmployee = {
        complaintId: complaint.complaintId,
        customerId: complaint.customer.id,
        employeeId: complaint.employee.id,
        complaintStatus: 1,
        description: complaint.description,
        employeeNote: "Şikayet çözülme aşamasında!",
        title: complaint.title
    };

    // updateForEmployee metodunu çağır
    this.complaintService.updateForEmployee(updateComplaintsModel).subscribe(
        response => {
        this.getEmployeeAndComplaints(this.employee.email)
        this.toastr.success("Şikayet Alındı!")
        },
        responseError => {
            this.toastr.error(responseError.error.message)
            // Hata durumunda yapılacak işlemler burada yapılabilir
        }
    );
  }

  deleteComplaints(complaint:Complaint){
    this.complaintService.delete(complaint).subscribe(response =>{
      this.toastr.success("Şikayet reddedildi!")
      this.getEmployeeAndComplaints(this.employee.email)
    },responseError => {
      console.log(responseError)
    })
  }

  openModel(){
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null){
      modelDiv.style.display = 'block';
    }
  }

  closeModel(){
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null){
      modelDiv.style.display = 'none';
    }
  }
}
