import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAuthComponent } from './pages/customer-auth/customer-auth.component';
import { EmployeeAuthComponent } from './pages/employee-auth/employee-auth.component';

const routes: Routes = [
  {path:'auth',component:CustomerAuthComponent},
  {path:'admin/auth',component:EmployeeAuthComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
