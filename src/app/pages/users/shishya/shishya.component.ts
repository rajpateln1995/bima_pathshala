import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { guru } from '../guru/guru.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-shishya',
  templateUrl: './shishya.component.html',
  styleUrls: ['./shishya.component.scss'],
})
export class ShishyaComponent implements OnInit {

  constructor(private http: HttpClient,
              private user: UserService,
              private router: Router) { }

  data: any;
  total: Number = 0;
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

  limit: string = '6';

  pageSize: string = '5';
  curr_page: number = 1;
  createShishya: FormGroup;
  location = new Array();
  country: String = '';
  city: String = '';
  state: String = '';
  pinCode: String = '';
  locality: string = "";
  pincodeInvalid: boolean = false;
  genderValue = 'male';
  createGuru: FormGroup;
  otp: String = '';
  show_otp: boolean = false;
  contact_error: String = '';
  contact: String = '';
  verified: String = '';
  disable_contact: Boolean = false;
  postalUrl = 'https://api.postalpincode.in/pincode/';
  filter: FormGroup;

  ngOnInit(): void {


    this.createShishya = new FormGroup({
      'fName' : new FormControl(null, Validators.required),
      'lName' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, Validators.required),
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


    this.user.getUsers('sishya', this.limit, '1').subscribe(res => {
      console.log(res);
      this.data = res;
      this.data = this.data.data.sishya;
      this.total = this.data.length;
    },
    err => {
      console.log(err);
    });
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
    this.locality = data.name
  }

  date(){
    setTimeout(() => {
      if (document.getElementsByClassName('cdk-overlay-container')[0]){
        document.getElementsByClassName('cdk-overlay-container')[0].setAttribute('style', 'z-index: 1080;');
      }
    }, 200);

  }


  ConvertToCSV(objArray, headerList) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
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
    saveAs(blob, 'Shishya-Export.csv');
   }



  downloadSampleCsv(){
    const d = this.ConvertToCSV({}, this.table_head);
    const blob = new Blob([d], { type: 'text/csv;charset=utf-8;'});
    saveAs(blob, 'Sample-CSV-Sishya.csv');
  }


  uploadCsv(event){
    const file = event.target.files;
    if( file[0].size !== 0 && file[0].name.slice(-3,file[0].name.length) === 'csv' ) {
      console.log("valid")
    }
  }


  showUser(id){
    this.router.navigateByUrl(`/pages/users/user-details/sishya/${id}`);
  }



  createUser(){
    const obj = {
      'data' : [{
        'fName': this.createShishya.value.fName,
        'lName': this.createShishya.value.lName,
        'email': this.createShishya.value.email,
        'password': 'default',
        'dob': this.createShishya.value.dob,
        'aadharNumber': this.createShishya.value.aadhaarNo,
        'aadhaarImg': this.createShishya.value.aadhaarImg,
        'motherTongue': this.createShishya.value.motherTongue,
        'maritalStatus': this.createShishya.value.maritalStatus,
        'occupation': this.createShishya.value.occupation,
        'gender': this.genderValue,
        'address': {
          'pinCode': this.pinCode,
          'locality': this.locality,
          'country': this.country,
          'state': this.state,
          'city': this.city,
        },
        'role': 'sishya',
      }],
    }

    console.log(obj)
    this.user.createUser(obj).subscribe(res => {
      console.log(res);
      this.createShishya.reset();
      document.getElementById('close-btn').click();


    },
    err => {
      console.log(err);
    });
    

  }  


}