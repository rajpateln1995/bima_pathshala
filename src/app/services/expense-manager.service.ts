import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseManagerService {

  constructor(private http: HttpClient,
              private auth: AuthService,
              ) { }

  base_url = environment.base_url;

  getAllExpense(){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.get(this.base_url + '/expense', { headers: header });
  }


  updateExpense(data){
    let header = new HttpHeaders();
    header = header.append('Authorization', this.auth.getToken());

    return this.http.put(this.base_url + '/expense', data , { headers : header });
  }



}
