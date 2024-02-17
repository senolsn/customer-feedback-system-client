import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAuthComponent } from './pages/customer-auth/customer-auth.component';
import { EmployeeAuthComponent } from './pages/employee-auth/employee-auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:'',component:CustomerAuthComponent},
  {path:'admin/auth',component:EmployeeAuthComponent},
  {path:'dashboard',component:DashboardComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
