import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CourseService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }

    base_url = environment.base_url;

  id: any;
  getCourses(status = '' , page = '' , limit = '', all='false', language) {
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());
    console.log(language);

    let q_params = new HttpParams();
    q_params = q_params.append('status', status);
    q_params = q_params.append('page', page);
    q_params = q_params.append('limit', limit);
    q_params = q_params.append('all', all);
    q_params = q_params.append('language', language);

    return this.http.get(this.base_url + '/course/all', { headers: header , params : q_params});
  }

  putCourse(data) {
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());
    return this.http.put(this.base_url + '/course', data, { headers: header });
  }

  getLanguages() {
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    let q_params = new HttpParams();
    q_params = q_params.append('type', 'all');

    return this.http.get(this.base_url + '/language', { headers: header, params: q_params });
  }

  createCourse(data) {
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.post(this.base_url + '/course/addMultiple', data, { headers: header });
  }

  getCourseDetails(id) {
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    let q_params = new HttpParams();
    q_params = q_params.append('_id', id);

    return this.http.get(this.base_url + '/course/detailsDashboard', { headers: header, params: q_params });
  }

  createSection(data) {
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.post(this.base_url + '/course/sections', data, { headers: header });
  }

  getSectionDetails(id){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    let q_params = new HttpParams();
    q_params = q_params.append('_id', id);

    return this.http.get(this.base_url + '/course/sections', {headers: header});

  }

  createSubSection(data) {
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.put(this.base_url + '/course/sections', data, { headers: header });
  }

  upload(data) {
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    const body = new FormData();
    body.append('uploads', data);

    return this.http.post(this.base_url + '/upload', body, { headers: header, reportProgress: true, observe: 'events' });
  }


  getAllAssessments() {
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.get(this.base_url + '/course/assessments', { headers: header });
  }

  editAssesment(data) {
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.put(this.base_url + '/course/assessments', data, { headers: header });
  }

  addAssessment(data) {
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.post(this.base_url + '/course/assessments', data, { headers: header });
  }

  delSubSection(subSec, sec) {

    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    let q_params = new HttpParams();
    q_params = q_params.append('subSection', subSec);
    q_params = q_params.append('section', sec);

    return this.http.delete(this.base_url + '/course/sections/removeSubSection', { headers: header, params: q_params });
  }

  delSection(course , sec , session='') {
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    let q_params = new HttpParams();
    q_params = q_params.append('c', course);
    q_params = q_params.append('s', sec);
    q_params = q_params.append('session', session);

    return this.http.delete(this.base_url + '/course/sections', { headers: header, params: q_params });
  }
}
