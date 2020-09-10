import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { UserService } from '../@core/mock/users.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class VideoService {

  constructor(private http: HttpClient,
              private auth: AuthService) { }


  base_url = 'https://bimapath.herokuapp.com/api';



  getVideos() {
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.get(this.base_url + '/video' , { headers : header });
  }

  addMultipleVideo(data) {
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.post(this.base_url + '/video/addMultiple' , data , { headers : header } )
  }

}
