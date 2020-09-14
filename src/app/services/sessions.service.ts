import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  base_url = 'https://bimapath.herokuapp.com/api';

  getAllSessions(role='' , _id = ''){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    let q_params = new HttpParams();
    q_params = q_params.append('role', role);
    q_params = q_params.append('_id', _id);

    return this.http.get(this.base_url + '/sessions' , { headers : header , params: q_params });
  }

  createSession(data){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.post(this.base_url + '/sessions/addMultiple' , data , { headers : header });
  }


  getSessionDetails(id){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    let q_params = new HttpParams();
    q_params = q_params.append('_id', id);

    return this.http.get(this.base_url + '/sessions/details' , { headers : header , params: q_params })
  }


  saveSession(data){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.put(this.base_url + '/sessions' , data , {headers : header});
  }


}
