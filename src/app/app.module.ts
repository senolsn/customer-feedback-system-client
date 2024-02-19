import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerAuthComponent } from './components/customer-auth/customer-auth.component';
import { EmployeeAuthComponent } from './components/employee-auth/employee-auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SolvedComplaintsComponent } from './components/solved-complaints/solved-complaints.component';
import { DialogModule } from 'primeng/dialog';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerAuthComponent,
    EmployeeAuthComponent,
    DashboardComponent,
    ComplaintsComponent,
    SidebarComponent,
    SolvedComplaintsComponent,
    CustomerDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DialogModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
