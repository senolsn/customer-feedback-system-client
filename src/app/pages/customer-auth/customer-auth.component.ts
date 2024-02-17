import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-customer-auth',
  templateUrl: './customer-auth.component.html',
  styleUrls: ['./customer-auth.component.css']
})
export class CustomerAuthComponent {
  @ViewChild('container') container!: ElementRef;
  registerForCustomerForm: FormGroup;
  loginForCustomerForm:FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createRegisterForCustomerForm();
    this.createLoginForCustomerForm();
  }

  //Form Oluştur.
  createRegisterForCustomerForm() {
    this.registerForCustomerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  createLoginForCustomerForm(){
    this.loginForCustomerForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  //Kayıt İşlemini Gerçekleştir.
  registerForCustomer() {
    if (this.registerForCustomerForm.valid) {
      const password = this.registerForCustomerForm.get('password')?.value;
      const confirmpassword = this.registerForCustomerForm.get('confirmPassword')?.value;

      if (password == confirmpassword) {
        let registerModelForCustomer = Object.assign(
          {},
          this.registerForCustomerForm.value
        );
        this.authService
          .registerForCustomer(registerModelForCustomer)
          .subscribe(
            (response) => {
              this.toastr.success('Successfuly Entry!', 'Success');
              localStorage.setItem('token', response.token);
              this.router.navigate(['/']);
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

  loginForCustomer(){
    if(this.loginForCustomerForm.valid){
      let loginModelForCustomer = Object.assign({},this.loginForCustomerForm.value);
      this.authService.loginForCustomer(loginModelForCustomer).subscribe(response => {
        this.toastr.success("Succesfuly Entry!","Success")
        localStorage.setItem('token',response.token);
        this.router.navigate(["/dashboard"]);
      },responseError =>{
        console.log(responseError);
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
