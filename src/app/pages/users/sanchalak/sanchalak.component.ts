import { Component, OnInit } from '@angular/core';
import {sanchalak} from './sanchalak.model'
import { NbComponentStatus } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { table } from 'console';
import { saveAs } from 'file-saver';


@Component({
  selector: 'ngx-sanchalak',
  templateUrl: './sanchalak.component.html',
  styleUrls: ['./sanchalak.component.scss']
})
export class SanchalakComponent implements OnInit {

  constructor() { }
  fullData: sanchalak[];
  data : sanchalak[];
  table_head = [];
  pageSize : number = 5;
  curr_page: number = 1;
  createSanchalak: FormGroup;
  filterByName: String = "";

  ngOnInit(): void {
    const obj = JSON.parse(localStorage.getItem('sanchalak'));
    this.data = obj.sanchalak;
    this.fullData = obj.sanchalak;
    console.log(this.data);
    for (const x in this.data[0]){
      this.table_head.push(x);
    }
    console.log(this.table_head);

    this.createSanchalak = new FormGroup({
      'name' : new FormControl(null,Validators.required),
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'contact_no' : new FormControl(null,[Validators.required,Validators.maxLength(10),Validators.minLength(8)]),
      'description' : new FormControl(null,Validators.required),
      'country' : new FormControl(null,Validators.required),
      'state' : new FormControl(null,Validators.required),
      'city' : new FormControl(null,Validators.required),
      'profile_picture' : new FormControl(null)
    })
  }

  dataChange(){
    console.log(this.data)
  }

  ConvertToCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
    for (let index in headerList) {
     row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i+1)+'';
      for (let index in headerList) {
        let head = headerList[index];
        line += ',' + array[i][head];
     }
      str += line + '\r\n';
    }
    return str;
   }

   createUser(){
     var user:sanchalak =  {
     "name" : this.createSanchalak.value.name,
     "email" : this.createSanchalak.value.email,
     "number" : this.createSanchalak.value.contact_no,
     "description" : this.createSanchalak.value.description,
     "country" : this.createSanchalak.value.country,
     "state" : this.createSanchalak.value.state,
     "city" : this.createSanchalak.value.city,
     "userId" : "",
     "bimaId" : "",
     "userName": "", 
     "website" : "",
     "dob" : "",
     "location" : {
       "type" : "",
       "coordinates" : [0, 0]
     },
     }
     this.data.push(user);
     localStorage.setItem('sanchalak',JSON.stringify(this.data));
  }
   downloadCsv(){
    const data = this.ConvertToCSV(this.data, this.table_head);
    let blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, "Sanchalak-Export.csv");
   }


}
