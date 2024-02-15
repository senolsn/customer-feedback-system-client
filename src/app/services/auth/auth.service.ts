import { LoginModel } from './../../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from 'src/app/models/registerModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44328/api/'

  constructor(private httpClient:HttpClient){}

  registerForEmployee(registerModel:RegisterModel):Observable<TokenModel>{
    let newPath = this.apiUrl + 'Auths/RegisterForEmployee';
    return this.httpClient.post<TokenModel>(newPath,registerModel);
  }

  registerForCustomer(registerModel:RegisterModel):Observable<TokenModel>{
    let newPath = this.apiUrl + 'Auths/RegisterForCustomer';
    return this.httpClient.post<TokenModel>(newPath,registerModel)
  }
  
  loginForEmployee(loginModel:LoginModel):Observable<TokenModel>{
    let newPath = this.apiUrl + 'Auths/LoginForEmployee';
    return this.httpClient.post<TokenModel>(newPath,loginModel);
  }

  loginForCustomer(loginModel:LoginModel):Observable<TokenModel>{
    let newPath = this.apiUrl + 'Auths/LoginForCustomer';
    return this.httpClient.post<TokenModel>(newPath,loginModel)
  }
}
