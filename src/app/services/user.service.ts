import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient,
              private auth: AuthService) { }

              
  base_url = environment.base_url;



  getUsers(type: string = '',
    limit: string = '10',
    page: string = '1',
    _id: string = '',
    name: string = '' ,
    email: string = '' ,
    contact: string = '' ,
    pincode: string = '',
    city: string = '',
    state: string = '',
    country: string = '') {
    let q_params = new HttpParams();
    q_params = q_params.append('limit' , limit);
    q_params = q_params.append('role' , type);
    q_params = q_params.append('page' , page);
    q_params = q_params.append('_id' , _id);
    q_params = q_params.append('name' , name);
    q_params = q_params.append('email' , email);
    q_params = q_params.append('number' , contact);
    q_params = q_params.append('pincode' , pincode);
    q_params = q_params.append('city' , city);
    q_params = q_params.append('state' , state);
    q_params = q_params.append('country' , country);
    console.log(q_params);


    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.get(this.base_url + '/user/', { headers : header , params : q_params });

  }


  createUser(data: any){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.post(this.base_url + '/user/addMultiple' , data, { headers : header });
  }

  updateUserDetails(data: any){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.put(this.base_url + '/user/' , data, { headers : header });
  }

  createMultipleUser(data: any){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.post(this.base_url + '/user/addMultiple/', data, { headers : header });
  }

  userDetails(id){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    let q_params = new HttpParams();
    q_params = q_params.append('_id' , id);


    return this.http.get(this.base_url + '/main/userDetails/', { headers: header  , params : q_params})
  }


  mapGuruShishya(data){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.post(this.base_url + '/user/guruShishyaSessionManager', data , {headers  : header})

  }

}
