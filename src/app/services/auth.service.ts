import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

 setAuthHeader(){

 }

  base_url = "https://bimapath.herokuapp.com/api";
  token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiX2lkIjoiNWY0MmRjN2I4MzgzYTExNzU2MTg1NzEyIiwicm9sZSI6InNhbmNoYWxhayJ9LCJpYXQiOjE1OTgyMTczNDAsImV4cCI6MTU5ODgyMjE0MH0.3iydDnMgF4G69qlTt2PmNosGR9yd2PR1vzcf1G8TnpI"

  login(email:string , password:string ){

    return this.http.post(this.base_url + '/user/login' , {
      "email" : email,
      "password" : password
    })
  }

  getUsers(type:string , limit:string , page: string){

    let q_params = new HttpParams();
    q_params = q_params.append('limit' , limit);
    q_params = q_params.append('role' , type);
    q_params = q_params.append('page' , page);

    let header = new HttpHeaders()
    header = header.append('Authorization', this.token)

    return this.http.get(this.base_url + '/user/', { headers : header , params : q_params })
     
  }


}
