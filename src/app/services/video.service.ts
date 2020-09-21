import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { UserService } from '../@core/mock/users.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {

  constructor(private http: HttpClient,
              private auth: AuthService) { }


  base_url = environment.base_url;



  getVideos(limit = '', page = '', all='true' , language = '') {
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    let q_params = new HttpParams();
    q_params = q_params.append('limit', limit);
    q_params = q_params.append('page', page);
    q_params = q_params.append('all', all);
    q_params = q_params.append('language', language);

    return this.http.get(this.base_url + '/video/all' , { headers : header , params : q_params });
  }

  getVideoDetails(id){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    let q_params = new HttpParams();
    q_params = q_params.append('_id', id);

    return this.http.get(this.base_url + '/video/detail' , { headers : header , params : q_params});
  }

  addMultipleVideo(data) {
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.post(this.base_url + '/video/addMultiple' , data , { headers : header } )
  }

  saveVideo(data){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.put(this.base_url + '/video' , data , { headers : header } );
  }

}
