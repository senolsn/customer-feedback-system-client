import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAuthComponent } from './pages/customer-auth/customer-auth.component';
import { EmployeeAuthComponent } from './pages/employee-auth/employee-auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {path:'auth',component:CustomerAuthComponent},
  {path:'admin/auth',component:EmployeeAuthComponent},
  {path:'sidebar',component:SidebarComponent},
  {path:'dashboard',component:AdminDashboardComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
