import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }

  base_url = 'https://bimapath.herokuapp.com/api';

  getDocAndArticle(type){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    let q_params = new HttpParams();
    q_params = q_params.append('type', type);

    return this.http.get(this.base_url + '/document' , { headers : header , params: q_params });
  }

}
