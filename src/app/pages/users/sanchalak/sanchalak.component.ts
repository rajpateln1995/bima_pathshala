import { Component, OnInit } from '@angular/core';

import { NbComponentStatus } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { table } from 'console';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';



@Component({
  selector: 'ngx-sanchalak',
  templateUrl: './sanchalak.component.html',
  styleUrls: ['./sanchalak.component.scss'],
})
export class SanchalakComponent implements OnInit {

  constructor(private http: HttpClient,
              private user: UserService) { }



  data: any;
  total: number = 0;
  filterByKeywords: String = '';
  table_head = [
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'Roll No.',
    'Aadhaar No.',
    'Gender',
    'Date of Birth',
    'Age',
    'Pincode',
    'Locality',
    'City',
    'State',
    'Country',
    'Occupation',
    'Mother Tongue',
    'Marital Status'];
    pageSize: string = '5';
  limit: string = '6';
  curr_page: number = 1;
  createSanchalak: FormGroup;
  location = new Array();
  country: String = '';
  city: String = '';
  state: String = '';
  pinCode: String = '';
  pincodeInvalid: boolean = false;
  genderValue = 'male';
  // otp: String = '';
  // show_otp: boolean = false;
  contact_error: String = '';
  contact: String = '';
  verified: String = '';
  disable_contact: Boolean = false;
  postalUrl = 'https://api.postalpincode.in/pincode/';
  filter: FormGroup;
  


  ngOnInit(): void {
    // const obj = JSON.parse(localStorage.getItem('sanchalak'));
    // this.data = obj.sanchalak;
    // this.fullData = obj.sanchalak;
    // console.log(this.data);
    // for (const x in this.data[0]){
    //   this.table_head.push(x);
    // }
    // console.log(this.table_head);

    this.createSanchalak = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'contact_no' : new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(8)]),
      'country' : new FormControl(null, Validators.required),
      'state' : new FormControl(null, Validators.required),
      'city' : new FormControl(null, Validators.required),
    });

    this.filter = new FormGroup({
      'name' : new FormControl(''),
      'email' : new FormControl(''),
      'contact' : new FormControl(''),
      'pincode' : new FormControl(''),
      'city' : new FormControl(''),
      'state' : new FormControl(''),
      'country' : new FormControl(''),
    });

    this.user.getUsers('sanchalak', '200', '1').subscribe(res => {
      console.log(res);
      this.data = res;
      this.data = this.data.data.sanchalak;
      console.log(this.data);
      this.total = this.data.length;

    },
    err => {
      console.log(err);
    });
    console.log(this.filter);
  }



  filterUsers() {
    this.user.getUsers('sanchalak',
    '200',
    '1',
    this.filter.value.name,
    this.filter.value.email,
    this.filter.value.contact,
    this.filter.value.pincode,
    this.filter.value.city,
    this.filter.value.state,
    this.filter.value.country,
    ).subscribe(res => {
      console.log(res);
      this.data = res;
      this.data = this.data.data.sanchalak;
      console.log(this.data);
      this.total = this.data.length;
    },
    err => {
      console.log(err);
    });
  }


  removeFilters() {
    this.filter.reset();
    this.user.getUsers('sanchalak', '200', '1').subscribe(res => {
      console.log(res);
      this.data = res;
      this.data = this.data.data.sanchalak;
      console.log(this.data);
      this.total = this.data.length;

    },
    err => {
      console.log(err);
    });
    console.log(this.filter);
  }

  getPage(page) {
    console.log(page);
    this.user.getUsers('sishya', this.limit, page).subscribe(res => {
      console.log(res);
      this.data = res;
      this.data = this.data.data.sishya;
      this.total = this.data.length;
      this.curr_page = page;
    },
    err => {
      console.log(err);
    });
  }

  dataChange(){
    console.log(this.data);
  }

  ConvertToCSV(objArray, headerList) {
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
    for (const index in headerList) {
     row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (const index in headerList) {
        const head = headerList[index];
        line += ',' + array[i][head];
     }
      str += line + '\r\n';
    }
    return str;
   }

   createUser(){
    //  var user:sanchalak =  {
    //  "name" : this.createSanchalak.value.name,
    //  "email" : this.createSanchalak.value.email,
    //  "number" : this.createSanchalak.value.contact_no,
    //  "description" : this.createSanchalak.value.description,
    //  "country" : this.createSanchalak.value.country,
    //  "state" : this.createSanchalak.value.state,
    //  "city" : this.createSanchalak.value.city,
    //  "userId" : "",
    //  "bimaId" : "",
    //  "userName": "",
    //  "website" : "",
    //  "dob" : "",
    //  "location" : {
    //    "type" : "",
    //    "coordinates" : [0, 0]
    //  },
    //  }
    //  this.data.push(user);
    //  localStorage.setItem('sanchalak',JSON.stringify(this.data));
  }
   downloadCsv(){

    const dataObj = [];
    for (const data of this.data){
      dataObj.push({
      'Fisrt Name' : data.fName,
      'Last Name' : data.lName,
      'Email' : data.email,
      'Phone' : data.phone,
      'Roll No.': data.rollNumber ,
      'Aadhaar No.' : data.aadharNumber,
      'Gender' : data.gender,
      'Date of Birth' : data.dob,
      'Age' : data.age,
      'Pincode' : data.address.pincode,
      'Locality' : data.address.locality,
      'City' : data.address.city,
      'State' : data.address.state,
      'Country' : data.address.country,
      'Occupation' : data.occupation,
      'Mother Tongue' : data.motherTongue,
      'Marital Status' : data.maritalStatus,
      });
    }
    const d = this.ConvertToCSV(dataObj, this.table_head);
    const blob = new Blob([d], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'Sanchalak-Export.csv');
   }

   pincode(event){
    if (event.target.value.length === 6){
      const x = event.target.value;
      const match = x.match(/^\d{6}$/);
      console.log(match);

      if ( match && match[0] === x){
        const url = this.postalUrl + x;
        const loc_obj = new Array;
        this.http.get(url).subscribe(
          res => {
            console.log(res);
            if (res[0].PostOffice !== null){
              for (const loc of res[0].PostOffice){
                loc_obj.push({
                 'city': loc.District,
                 'state': loc.State,
                 'country': loc.Country,
                 'name': loc.Name,
                });
              }
              if (loc_obj.length === 1){
                this.city = loc_obj[0].city;
                this.state = loc_obj[0].state;
                this.country = loc_obj[0].country;
              }else{
                document.getElementById('triggerPincode').click();
                this.location = loc_obj;
              }

            }else{
              this.location = loc_obj;
              this.pincodeInvalid = true;
              this.pinCode = '';
            }

            console.log(this.location);
          },
          err => {
            console.log(err);
          },
        );
      }else{
        console.log('else');
        this.pincodeInvalid = true;
              this.pinCode = '';
      }

    }

  }

  selectLocality(data){
    console.log(data);
    this.state = data.state;
    this.country = data.country;
    this.city = data.city;
  }

  uploadCsv(){
    console.log(this.data);
  }
}
