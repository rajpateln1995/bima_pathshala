import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private auth: AuthService) { }
  base_url = "https://bimapath.herokuapp.com/api";
  

  getToken(){
    const data = JSON.parse(localStorage.getItem('Token'))
    console.log(Date.now())
    if (data.expDate < Date.now()){
      alert("Your Session has expired! Please Log In Again");
      this.auth.logout();
      return null;  
    }else{
      return 'Bearer ' + data.token;
    }
  }
  
  getUsers(type:string , limit:string , page: string){

    let q_params = new HttpParams();
    q_params = q_params.append('limit' , limit);
    q_params = q_params.append('role' , type);
    q_params = q_params.append('page' , page);

    let header = new HttpHeaders()
    header = header.append('Authorization', this.getToken());

    return this.http.get(this.base_url + '/user/', { headers : header , params : q_params });
     
  }

}
