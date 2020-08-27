import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router : Router) {

  }

  user = new Subject<User>()
  
  base_url = "https://bimapath.herokuapp.com/api";
  token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiX2lkIjoiNWY0MmRjN2I4MzgzYTExNzU2MTg1NzEyIiwicm9sZSI6InNhbmNoYWxhayJ9LCJpYXQiOjE1OTgyMTczNDAsImV4cCI6MTU5ODgyMjE0MH0.3iydDnMgF4G69qlTt2PmNosGR9yd2PR1vzcf1G8TnpI"

  login(email:string , password:string ){

    return this.http.post(this.base_url + '/user/login' , {
      "email" : email,
      "password" : password
    }).pipe(tap(res => {
      const data:any = res;
      const Obj = {
        'email' : data.data.email,
        'token' : data.data.auth.token,
        'expDate' : data.data.auth.expires,
      };
      localStorage.setItem('Token',JSON.stringify(Obj))
    }))
  }

  register(email:string, password:string){
    return this.http.post(this.base_url + '/user/register', {
      'email': email,
      'role' : 'sanchalak',
      'password' : 'password'
    }).pipe(tap(res => {
      const data:any = res;
      const Obj = {
        'email' : data.data.email,
        'token' : data.data.auth.token,
        'expDate' : data.data.auth.expires,
      };
      localStorage.setItem('Token',JSON.stringify(Obj))
    }))
  }


  logout(){
    localStorage.setItem('Token', null)
    this.router.navigateByUrl('auth/login');
  }

}
