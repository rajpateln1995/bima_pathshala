import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { Papa } from 'ngx-papaparse';
import { CourseService } from '../../../services/course.service';
import { NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-shishya',
  templateUrl: './shishya.component.html',
  styleUrls: ['./shishya.component.scss'],
})
export class ShishyaComponent implements OnInit {

  constructor(private http: HttpClient,
              private user: UserService,
              private router: Router,
              private papa: Papa,
              private toaster : NbToastrService,
              private courses :CourseService) { }

  data: any;
  total: Number = 0;
  status = [
    'Created By Sanchalak',
    'Verified',
    'Enabled',
    'Blocked',
    'Deleted',
  ];
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
      'Email': true,
      'Phone': true,
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

  limit: string = '50';

  pageSize: string = '';
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
  otp: String = '';
  show_otp: boolean = false;
  contact_error: String = '';
  contact: String = '';
  verified: String = '';
  disable_contact: Boolean = false;
  postalUrl = 'https://api.postalpincode.in/pincode/';
  filter: FormGroup;
  bulkJson: any;

  ngOnInit(): void {


    this.createShishya = new FormGroup({
      'fName' : new FormControl(null, Validators.required),
      'lName' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'phone' : new FormControl(null, Validators.required),
      'dob' : new FormControl(null, Validators.required),
      'aadhaarNo' : new FormControl(null, Validators.required),
      'aadhaarImg' : new FormControl(null),
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


    this.user.getUsers('shishya', this.limit, '1').subscribe(res => {
      console.log(res);
      this.data = res;
      this.total = this.data.total;
      this.data = this.data.data.shishya;
      
    },
    err => {
      console.log(err);
    });
  }

  addField(field){
    this.table_head_obj[field] = !this.table_head_obj[field];
  }

  removeField(field){
    this.table_head_obj[field] = !this.table_head_obj[field];
  }

  removeFilters() {
    this.filter.reset();
    this.user.getUsers('shishya', this.limit, '1').subscribe(res => {
      console.log(res);
      this.data = res;
      this.total = this.data.total;
      this.data = this.data.data.shishya;
      console.log(this.data);

    },
    err => {
      console.log(err);
    });
    console.log(this.filter);
  }


  filterUsers() {
    this.user.getUsers('shishya',
    this.limit,
    '1',
    '',
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
      this.total = this.data.total;
      this.data = this.data.data.shishya;
      console.log(this.data);
      if(this.total === 0){
        this.toaster.show('Your Search Parameters Did not Match to Any Users !', 'No Users Found' , 
        { status : 'warning' , duration : 5000 , position : NbGlobalLogicalPosition.TOP_START });
      }
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong !', 'Error' ,
        { status : 'danger' , duration : 5000 , position : NbGlobalLogicalPosition.TOP_START });
    });
  }

  changeLimit(e){
    this.limit = e;
    this.user.getUsers('shishya', this.limit, '1').subscribe(res => {
      console.log(res);
      this.data = res;
      this.total = this.data.total;
      this.data = this.data.data.guru;
    },
    err => {
      console.log(err);
    });
  }

  getPage(page) {
    console.log(page);
    this.user.getUsers('shishya', this.limit, page).subscribe(res => {
      console.log(res);
      this.data = res;
      this.total = this.data.total;
      this.data = this.data.data.shishya;
      this.curr_page = page;
    },
    err => {
      console.log(err);
    });
  }


  pincodeCheck = false;
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
              this.pincodeCheck = true;
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
              this.pincodeCheck = false;
              this.pinCode = '';
            }
            console.log(this.location);
          },
          err => {
            console.log(err);
          },
        );
      }else{
        this.pincodeInvalid = true;
        this.pincodeCheck = false;
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


  parseToJson(event) {
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    const options = {
      complete: (results) => {
        console.log('Parsed: ', results);
        this.bulkJson = results;

      },
      header : true,
    };
    this.papa.parse(file, options);
  }

  rejectedfields: any[] = [];
  uploadCsv(){
    console.log(this.bulkJson);
    this.bulkJson.data.pop();
    const objArray = {
      'data':  [],
    };
    for (const data of this.bulkJson.data) {
      const obj: any = {
        'fName': data['First Name'],
        'lName': data['Last Name'],
        'email': data['Email'],
        'phone': data['Phone'],
        'password': 'default',
        'dob': data['Date of Birth'],
        'aadharNumber': data['Aadhaar Number'],
        'motherTongue': data['Mother Tongue'],
        'maritalStatus': data['Marital Status'],
        'occupation': data['Occupation'],
        'gender': data['Gender'],
        'address': {
          'pinCode': data['Pincode'],
          'locality': data['Locality'],
          'country': data['Country'],
          'state': data['State'],
          'city': data['City / District'],
        },
        'role': 'shishya',
        'status': '0',
      };

      const match = String(obj.email).match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      if (match[0] === obj.email
        && String(obj.aadharNumber).length === 12
        && String(obj.address.pinCode).length === 6
        && obj.role === 'shishya' === true) {
          objArray.data.push(obj);
          console.log(objArray);
      }else{
        this.rejectedfields.push(obj);
      }

    }
    console.log(objArray);
    document.getElementById('close-upload').click();
    document.getElementById('rejected').click();
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

  downloadCsv() {

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


   csvHeader = [
    'First Name',
       'Last Name',
       'Email',
       'Phone',
       'Date of Birth',
       'Aadhaar Number',
       'Gender',
       'Marital Status',
       'Mother Tongue',
       'Occupation',
       'Pincode',
       'Locality',
       'City / District',
       'State',
       'Country',
   ];
  downloadSampleCsv(){
    const d = this.ConvertToCSV({}, this.csvHeader);
    const blob = new Blob([d], { type: 'text/csv;charset=utf-8;'});
    saveAs(blob, 'Sample-CSV-Shishya.csv');
  }


  showUser(id){
    this.router.navigateByUrl(`/pages/users/user-details/shishya/${id}`);
  }

  aadhaarImg;
  progressImg = 0;
  uploadImage(event){
    const data = event.target.files[0];
    this.courses.upload(data).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress){
        console.log(event);
        this.progressImg = (event.loaded / event.total) * 100;

      }else if (event.type === HttpEventType.Response){
        console.log(event);
        const data: any = event;
        this.progressImg = 0;
        this.aadhaarImg = data.body.data[0];
      }
    },
    err => {
      console.log(err);
      this.progressImg = 0;
    });
  }

  createUser(){
    const obj = {
      'data' : [{
        'fName': this.createShishya.value.fName,
        'lName': this.createShishya.value.lName,
        'email': this.createShishya.value.email,
        'phone': this.createShishya.value.phone,
        'password': 'default',
        'dob': this.createShishya.value.dob,
        'aadharNumber': this.createShishya.value.aadhaarNo,
        'aadhaarImg': this.aadhaarImg,
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
        'role': 'shishya',
        'status': '1',
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
      if (err.status === 401){
        this.toaster.show('The Phone No. you Entered Already Exist ! Please Provide a Different Phone No.' , 'Cannot Create User' ,
         { status : 'warning' , duration : 5000 , position : NbGlobalLogicalPosition.TOP_START });
      }else{
        this.toaster.show('Something Went Wrong !' , 'Error' , { status : 'danger' });
      }
      
    });
    

  }  


}


