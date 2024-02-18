// complaints.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Complaint } from 'src/app/models/complaint';
import { Employee } from 'src/app/models/employee';
import { UpdateComplaintModelForEmployee } from 'src/app/models/updateComplaintModelForEmployee';
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
  updateComplaintsModel:UpdateComplaintModelForEmployee;
  employeeNoteValue: string = '';


  constructor(
    private complaintService: ComplaintsService,
    private employeeService: EmployeeService,
    private toastr:ToastrService
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

  updateEmployeeNoteForComplaints(complaint:Complaint){
    let employeeNoteValue = this.employeeNoteValue.trim(); // Trim kullanarak başındaki ve sonundaki boşlukları temizleyin
    if (!employeeNoteValue) {
        employeeNoteValue = "Şikayetiniz tarafımızca çözülmüştür."; // Varsayılan mesaj
    }

    let updateComplaintsModel:UpdateComplaintModelForEmployee ={
        complaintId: complaint.complaintId,
        customerId: complaint.customer.id,
        employeeId: complaint.employee.id,
        complaintStatus: 1,
        description: complaint.description,
        employeeNote: this.employeeNoteValue,
        title: complaint.title
    }

    this.complaintService.updateForEmployee(updateComplaintsModel).subscribe(
      response => {
      this.getEmployeeAndComplaints(this.employee.email)
      this.toastr.success("Not güncellendi !")
      
      },
      responseError => {
          this.toastr.error(responseError.error.message)
          // Hata durumunda yapılacak işlemler burada yapılabilir
      }
  );
    
  }

  markComplaintAsResolved(complaint: Complaint): void {
    // Complaint türünden bir nesneyi UpdateComplaintModelForEmployee türüne dönüştür
    let updateComplaintsModel: UpdateComplaintModelForEmployee = {
        complaintId: complaint.complaintId,
        customerId: complaint.customer.id,
        employeeId: complaint.employee.id,
        complaintStatus: 2,
        description: complaint.description,
        employeeNote: "Şikayetiniz tarafımızca çözülmüştür!",
        title: complaint.title
    };

    // updateForEmployee metodunu çağır
    this.complaintService.updateForEmployee(updateComplaintsModel).subscribe(
        response => {
        this.getEmployeeAndComplaints(this.employee.email)
        this.toastr.success("Şikayet Çözüldü!","Tebrikler")
        },
        responseError => {
            this.toastr.error(responseError.error.message)
            // Hata durumunda yapılacak işlemler burada yapılabilir
        }
    );
  }
}
