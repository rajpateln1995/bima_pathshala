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

  getDocAndArticle(type='' , _id = ''){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    let q_params = new HttpParams();
    q_params = q_params.append('type', type);
    q_params = q_params.append('_id', _id);

    return this.http.get(this.base_url + '/document' , { headers : header , params: q_params });
  }


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
