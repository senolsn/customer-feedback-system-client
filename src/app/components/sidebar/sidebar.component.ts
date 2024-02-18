import { Toast, ToastrService } from 'ngx-toastr';
// sidebar.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  constructor(
    private toastrService:ToastrService
  ) {}

  
  logOut(){
    localStorage.removeItem("token");
    this.toastrService.warning("Çıkış Yapılıyor...,","Başarılı")
  }
 
}
