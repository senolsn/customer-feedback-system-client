import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAuthComponent } from './components/customer-auth/customer-auth.component';
import { EmployeeAuthComponent } from './components/employee-auth/employee-auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { SolvedComplaintsComponent } from './components/solved-complaints/solved-complaints.component';
import { LoginGuard } from './guards/login.guard';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';

const routes: Routes = [
  {path:'',component:CustomerAuthComponent},
  {path:'admin/auth',component:EmployeeAuthComponent},
  {path:'admin/dashboard',component:DashboardComponent,canActivate:[LoginGuard]},
  {path:'side',component:SidebarComponent},
  {path:'complaints',component:ComplaintsComponent},
  {path:'solvedcomplaints',component:SolvedComplaintsComponent},
  {path:'dashboard',component:CustomerDashboardComponent,canActivate:[LoginGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
