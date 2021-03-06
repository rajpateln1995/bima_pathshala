import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }

    base_url = environment.base_url;

  getDocAndArticle(type='' , _id = '' , page='1' , limit='50' , all='false' , language='' , name = ''){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    let q_params = new HttpParams();
    q_params = q_params.append('type', type);
    q_params = q_params.append('_id', _id);
    q_params = q_params.append('page', page);
    q_params = q_params.append('limit', limit);
    q_params = q_params.append('all', all);
    q_params = q_params.append('language', language);
    q_params = q_params.append('title', name);

    return this.http.get(this.base_url + '/document/all' , { headers : header , params: q_params });
  }

  // getDocAndArticleDetails(type='' , _id = ''){
  //   let header = new HttpHeaders();
  //   header = header.append('Authorization', this.auth.getToken());

  //   let q_params = new HttpParams();
  //   q_params = q_params.append('type', type);
  //   q_params = q_params.append('_id', _id);
    

  //   return this.http.get(this.base_url + '/document' , { headers : header , params: q_params });
  // }


  addMultipleDoc(data){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.post(this.base_url + '/document/addMultiple' , data , { headers : header} );
  }

  saveDocument(data){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.put(this.base_url + '/document' , data , { headers : header} );
  }    

}
