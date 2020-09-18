import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import * as crypto from 'crypto-js';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) {

  }

  user = new Subject<User>();

  base_url = environment.base_url;


  getToken() {
    const data = JSON.parse(localStorage.getItem('Token'));
    var bytes = crypto.AES.decrypt(data.token, 'Secret Key Bima Paathshala');
    var deToken = bytes.toString(crypto.enc.Utf8);
    console.log(deToken)
    if (data.expDate < Date.now()){
      alert('Your Session has expired! Please Log In Again');
      this.logout();
      return null;
    }else{
      return 'Bearer ' + deToken;
    }
  }

  login(email: string , password: string ){

    return this.http.post(this.base_url + '/user/login' , {
      'email' : email,
      'password' : password,
    }).pipe(tap(res => {
      console.log(res);
      const data: any = res;
      var enToken = crypto.AES.encrypt(data.data.auth.token, 'Secret Key Bima Paathshala').toString();
      console.log(data.data.auth.token);

      if(data.data[0] !== null) {
        const Obj = {
          'email' : data.data.email,
          'fName' : data.data.fName,
          'lName' : data.data.lName,
          'imageUrl' : data.data.imageUrl,
          'token' : enToken,
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
        'fName' : data.data.fName,
        'lName' : data.data.lName,
        'imageUrl' : data.data.imageUrl,
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
