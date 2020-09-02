import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  base_url = 'https://bimapath.herokuapp.com/api';


  getCourses(){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());
    return this.http.get(this.base_url + '/course', { headers : header });
  }


}
