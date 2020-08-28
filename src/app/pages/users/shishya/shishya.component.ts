import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { guru } from '../guru/guru.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'ngx-shishya',
  templateUrl: './shishya.component.html',
  styleUrls: ['./shishya.component.scss'],
})
export class ShishyaComponent implements OnInit {

  constructor(private http: HttpClient,
              private user: UserService) { }

  data: any;
  total: Number = 0;
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
  limit: string = '6';

  pageSize: string = '5';
  curr_page: number = 1;
  createSanchalak: FormGroup;
  location = new Array();
  country: String = '';
  city: String = '';
  state: String = '';
  pinCode: String = '';
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


    this.createSanchalak = new FormGroup({
      'name' : new FormControl(null),
      'email' : new FormControl(null),
      'contact' : new FormControl(null,),
      'contact_no' : new FormControl(null),
      'country' : new FormControl(),
      'state' : new FormControl(),
      'city' : new FormControl(),
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

  selectLocality(data){
    console.log(data);
    this.state = data.state;
    this.country = data.country;
    this.city = data.city;
  }

  downloadSampleCsv(){
    const d = this.ConvertToCSV({}, this.table_head);
    const blob = new Blob([d], { type: 'text/csv;charset=utf-8;'});
    saveAs(blob, 'Sample-CSV-Shishya.csv');
  }


  uploadCsv(event){
    const file = event.target.files;
    if( file[0].size !== 0 && file[0].name.slice(-3,file[0].name.length) === 'csv' ) {
      console.log("valid")
    }
  }

}
