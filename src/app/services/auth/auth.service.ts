import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModelForEmployee } from 'src/app/models/registerModelForEmployee';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44328/api/'

  constructor(private httpClient:HttpClient){}

  registerForEmployee(registerModelForEmployee:RegisterModelForEmployee):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + 'Auths/RegisterForEmployee';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModelForEmployee);
  }
}
