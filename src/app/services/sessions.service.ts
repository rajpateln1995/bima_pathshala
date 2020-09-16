import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  base_url = environment.base_url;

  getAllSessions(limit='' , page = '', all='false' ){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    let q_params = new HttpParams();
    q_params = q_params.append('limit', limit);
    q_params = q_params.append('page', page);
    q_params = q_params.append('all', all);

    return this.http.get(this.base_url + '/sessions/all' , { headers : header , params: q_params });
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
