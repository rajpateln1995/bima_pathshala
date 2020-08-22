import { Component, OnInit } from '@angular/core';
import { guru } from './guru.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-guru',
  templateUrl: './guru.component.html',
  styleUrls: ['./guru.component.scss']
})
export class GuruComponent implements OnInit {

  constructor() { }

  
  data : guru[]
  table_head = [];
  pageSize : number = 5;
  curr_page: number = 1;
  createSanchalak: FormGroup;


  ngOnInit(): void {
    const obj = JSON.parse(localStorage.getItem('sanchalak'));
    this.data = obj.sanchalak;
    console.log(this.data);
    for (const x in this.data[0]){
      this.table_head.push(x);
    }
    console.log(this.table_head);

    this.createSanchalak = new FormGroup({
      'name' : new FormControl(null,),
      'email' : new FormControl(null,),
      'contact_no' : new FormControl(null,),
      'description' : new FormControl(null,),
      'country' : new FormControl(),
      'state' : new FormControl(),
      'city' : new FormControl(),
      'profile_picture' : new FormControl()

    })
  }

}
