import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { guru } from '../guru/guru.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'ngx-shishya',
  templateUrl: './shishya.component.html',
  styleUrls: ['./shishya.component.scss']
})
export class ShishyaComponent implements OnInit {

  constructor(private http: HttpClient,
              private user : UserService) { }

  data: any;
  total:Number = 0;
  table_head = ['Email',
    'Roll No.',
    'Aadhaar No.',
    'Gender',
    'Age',
    'Pincode',
    'City',
    'State',
    'Country',
    'Occupation',
    'Mother Tongue'];


  pageSize: string = '5';
  curr_page: number = 1;
  createSanchalak: FormGroup;
  location = new Array();
  country: String = "";
  city: String = "";
  state: String = "";
  pinCode: String = "";
  pincodeInvalid: boolean = false;
  genderValue = "male";
  createGuru: FormGroup;
  otp: String = "";
  show_otp: boolean = false;
  contact_error: String = "";
  contact: String = "";
  verified: String = "";
  disable_contact: Boolean = false;
  postalUrl = "https://api.postalpincode.in/pincode/"

  ngOnInit(): void {
    

    this.createSanchalak = new FormGroup({
      'name' : new FormControl(null,),
      'email' : new FormControl(null,),
      'contact_no' : new FormControl(null,),
      'description' : new FormControl(null,),
      'country' : new FormControl(),
      'state' : new FormControl(),
      'city' : new FormControl(),
      'profile_picture' : new FormControl()
    });
    this.user.getUsers('sishya', '200', '1').subscribe(res => {
      console.log(res);
      this.data = res;
      this.data = this.data.data.sishya;      
      this.total = this.data.length;
    },
    err => {
      console.log(err);
    });
  }

  pincode(event){
    if (event.target.value.length === 6){
      const x = event.target.value;
      const match = x.match(/^\d{6}$/);
      console.log(match)

      if ( match && match[0] === x){
        const url = this.postalUrl + x;
        let loc_obj = new Array;
        this.http.get(url).subscribe(
          res => {
            console.log(res)
            if (res[0].PostOffice !== null){
              for (const loc of res[0].PostOffice){
                loc_obj.push({
                 "city": loc.District,
                 "state": loc.State,
                 "country": loc.Country,
                 "name": loc.Name,
                });
              }
              if(loc_obj.length === 1){
                this.city = loc_obj[0].city;
                this.state = loc_obj[0].state;
                this.country = loc_obj[0].country;
              }else{
                document.getElementById("triggerPincode").click();
                this.location = loc_obj;
              }
              
            }else{
              this.location = loc_obj;
              this.pincodeInvalid = true;
              this.pinCode = "";
            }
            
            console.log(this.location)
          },
          err => {
            console.log(err)
          }
        )
      }else{
        console.log('else')
        this.pincodeInvalid = true;
              this.pinCode = "";
      }

    }
   
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

  downloadCsv(){
     
    let dataObj = [];
    for (const data of this.data){
      dataObj.push({
        'Email' : data.email,
      'Roll No.': data.rollNumber ,
      'Aadhaar No.' : data.aadharNumber,
      'Gender' : data.gender,
      'Age' : data.age,
      'Pincode' : data.address.pincode,
      'City' : data.address.city,
      'State' : data.address.state,
      'Country' : data.address.country,
      'Occupation' : data.occupation,
      'Mother Tongue' : data.motherTongue
      })
    } 
    const d = this.ConvertToCSV(dataObj,this.table_head);
    let blob = new Blob([d], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, "Shishya-Export.csv");
   }

  selectLocality(data){
    console.log(data)
    this.state = data.state;
    this.country = data.country;
    this.city = data.city;
  }

  downloadSampleCsv(){
    const d =this.ConvertToCSV({},this.table_head);
    let blob = new Blob([d], { type: 'text/csv;charset=utf-8;'});
    saveAs(blob, "Sample-CSV-Shishya.csv");
  }

  
  uploadCsv(){
    console.log(this.data)
  }
}
