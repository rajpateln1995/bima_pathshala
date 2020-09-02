import { Component, OnInit } from '@angular/core';

import { NbComponentStatus } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { table } from 'console';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'ngx-sanchalak',
  templateUrl: './sanchalak.component.html',
  styleUrls: ['./sanchalak.component.scss'],
})
export class SanchalakComponent implements OnInit {

  constructor(private http: HttpClient,
              private user: UserService,
              private router: Router) { }



  data: any;
  total: number = 0;
  filterByKeywords: String = '';
  locality: string = '';
  table_head =[
    'View / Edit',
    'First Name',
    'Last Name',
    'Status',
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

    table_head_obj = {
      'View / Edit' : true,
      'First Name': true,
      'Last Name': true,
      'Status': true,
      'Email': false,
      'Phone': false,
      'Roll No.': false,
      'Aadhaar No.': false,
      'Gender': false,
      'Date of Birth': false,
      'Age': false,
      'Pincode': false,
      'Locality': false,
      'City': false,
      'State': false,
      'Country': false,
      'Occupation': false,
      'Mother Tongue': false,
      'Marital Status': false,
    }
    pageSize: string = '5';
  limit: string = '10';
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
      'fName' : new FormControl(null, Validators.required),
      'lName' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'dob' : new FormControl(null, Validators.required),
      'aadhaarNo' : new FormControl(null, Validators.required),
      'aadhaarImg' : new FormControl(null, Validators.required),
      'maritalStatus' : new FormControl(null),
      'motherTongue' : new FormControl(null),
      'occupation' : new FormControl(null),
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

    this.user.getUsers('sanchalak', this.limit, '1').subscribe(res => {
      console.log(res);
      this.data = res;
      this.total = this.data.total;
      this.data = this.data.data.sanchalak;
      console.log(this.data);

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

  date(){
    setTimeout(() => {
      if (document.getElementsByClassName('cdk-overlay-container')[0]){
        document.getElementsByClassName('cdk-overlay-container')[0].setAttribute('style', 'z-index: 1080;');
      }
    }, 200);

  }


  addField(field){
    console.log(field);
    this.table_head_obj[field] = !this.table_head_obj[field];
  }

  removeField(field){
    console.log(field);
    this.table_head_obj[field] = !this.table_head_obj[field];
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
    this.user.getUsers('sanchalak', this.limit, page).subscribe(res => {
      console.log(res);
      this.data = res;
      this.total = this.data.total;
      this.data = this.data.data.sishya;
      this.curr_page = page;
    },
    err => {
      console.log(err);
    });
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
                this.locality = loc_obj[0].name;
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
    this.locality = data.name;
  }

  uploadCsv(){
    console.log(this.data);
  }


  showUser(id){
    this.router.navigateByUrl(`/pages/users/user-details/sanchalak/${id}`);
  }

  createUser(){
    const obj = {
      'data' : [{
        'fName': this.createSanchalak.value.fName,
        'lName': this.createSanchalak.value.lName,
        'email': this.createSanchalak.value.email,
        'password': 'default',
        'dob': this.createSanchalak.value.dob,
        'aadharNumber': this.createSanchalak.value.aadhaarNo,
        'aadhaarImg': this.createSanchalak.value.aadhaarImg,
        'motherTongue': this.createSanchalak.value.motherTongue,
        'maritalStatus': this.createSanchalak.value.maritalStatus,
        'occupation': this.createSanchalak.value.occupation,
        'gender': this.genderValue,
        'address': {
          'pinCode': this.pinCode,
          'locality': this.locality,
          'country': this.country,
          'state': this.state,
          'city': this.city,
        },
        'role': 'sanchalak',
      }],
    }

    console.log(obj)
    this.user.createUser(obj).subscribe(res => {
      console.log(res);
      this.createSanchalak.reset();
      document.getElementById('close-btn').click();
    },
    err => {
      console.log(err);
    });

  }  

}
