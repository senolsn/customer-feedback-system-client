import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-employee-auth',
  templateUrl: './employee-auth.component.html',
  styleUrls: ['./employee-auth.component.css']
})
export class EmployeeAuthComponent {
  @ViewChild('container') container!: ElementRef;
  registerForEmployeeForm: FormGroup;
  loginForEmployeeForm:FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createRegisterForEmployeeForm();
    this.createLoginForEmployeeForm();
  }

  //Form Oluştur.
  createRegisterForEmployeeForm() {
    this.registerForEmployeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  createLoginForEmployeeForm(){
    this.loginForEmployeeForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }


  //Kayıt İşlemini Gerçekleştir.
  registerForEmployee() {
    if (this.registerForEmployeeForm.valid) {
      const password = this.registerForEmployeeForm.get('password')?.value;
      const confirmpassword = this.registerForEmployeeForm.get('confirmPassword')?.value;

      if (password == confirmpassword) {
        let registerModelForEmployee = Object.assign(
          {},
          this.registerForEmployeeForm.value
        );
        this.authService
          .registerForEmployee(registerModelForEmployee)
          .subscribe(
            (response) => {
              this.toastr.success('Successfuly Entry!', 'Success');
              localStorage.setItem('token', response.data.token);
              this.router.navigate(['/dashboard']);
            },
            (responseError) => {
              console.log(responseError);
            }
          );
      } else {
        this.toastr.warning(
          'The passwords you entered do not match.',
          'Warning'
        );
      }
    } else {
      this.toastr.warning('Please check the entered values!');
    }
  }
  loginForEmployee(){
    if(this.loginForEmployeeForm.valid){
      let loginModelForEmployee = Object.assign({},this.loginForEmployeeForm.value);
      this.authService.loginForEmployee(loginModelForEmployee).subscribe(response => {
        this.toastr.success("Successfuly Entry!","Success")
        localStorage.setItem('token',response.data.token);
        this.router.navigate(["/dashboard"]);
      }, responseError => {
        this.toastr.warning("Please check the entered values!")
      })
    }

  }

  //Kayıt-Giriş sayfasındaki animasyon geçişi
  togglePanel(panel: string) {
    if (panel === 'register') {
      this.container.nativeElement.classList.add('active');
    } else if (panel === 'login') {
      this.container.nativeElement.classList.remove('active');
    }
  }
}
