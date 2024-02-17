import { SingleResponseModel } from './../../models/singleResponseModel';
import { LoginModel } from './../../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from 'src/app/models/registerModel';
import { TokenModel } from 'src/app/models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44328/api/'

  constructor(private httpClient:HttpClient){}

  isAuthenticated(){
    if(localStorage.getItem('token')){
      return true
    }else{
      return false
    }
  }

  

  registerForEmployee(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + 'Auths/RegisterForEmployee';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }

  registerForCustomer(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + 'Auths/RegisterForCustomer';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel)
  }
  
  loginForEmployee(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + 'Auths/LoginForEmployee';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }

  loginForCustomer(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + 'Auths/LoginForCustomer';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel)
  }
}
