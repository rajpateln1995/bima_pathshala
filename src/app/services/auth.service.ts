import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) {

  }

  user = new Subject<User>();

  base_url = 'https://bimapath.herokuapp.com/api';


  getToken() {
    const data = JSON.parse(localStorage.getItem('Token'));
    console.log(Date.now());
    if (data.expDate < Date.now()){
      alert('Your Session has expired! Please Log In Again');
      this.logout();
      return null;
    }else{
      return 'Bearer ' + data.token;
    }
  }

  login(email: string , password: string ){

    return this.http.post(this.base_url + '/user/login' , {
      'email' : email,
      'password' : password,
    }).pipe(tap(res => {
      console.log(res);
      const data: any = res;
      if(data.data[0] !== null) {
        const Obj = {
          'email' : data.data.email,
          'fName' : data.data.fName,
          'lName' : data.data.lName,
          'imageUrl' : data.data.imageUrl,
          'token' : data.data.auth.token,
          'expDate' : data.data.auth.expires,
        };
        localStorage.setItem('Token', JSON.stringify(Obj));
      }
      
    }));
  }

  register(email: string, password: string){
    return this.http.post(this.base_url + '/user/register', {
      'email': email,
      'role' : 'sanchalak',
      'password' : 'password',
    }).pipe(tap(res => {
      const data: any = res;
      const Obj = {
        'email' : data.data.email,
        'token' : data.data.auth.token,
        'expDate' : data.data.auth.expires,
      };
      localStorage.setItem('Token', JSON.stringify(Obj));
    }));
  }


  logout(){
    localStorage.setItem('Token', null);
    this.router.navigateByUrl('auth/login');
  }

}
