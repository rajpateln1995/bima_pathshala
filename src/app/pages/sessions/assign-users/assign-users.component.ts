import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-assign-users',
  templateUrl: './assign-users.component.html',
  styleUrls: ['./assign-users.component.scss']
})
export class AssignUsersComponent implements OnInit {

  constructor(private user : UserService,
              private route : ActivatedRoute) { }

  searchField = "";
  guru;
  shishya;
  users;
  guruArray = [];
  shishyaArray = [];

  ngOnInit(): void {
  }


  getUsers() {
    const match = this.searchField.match(/^\d+$/)
    if(match && match[0] === this.searchField){
      this.user.getUsers('','1000','1','','','',this.searchField).subscribe(res => {
        document.getElementById('select-user').click();
        const temp: any = res;
        this.guru = temp.data.guru;
        this.shishya = temp.data.shishya;
        console.log(this.guru);
        console.log(this.shishya);
        
      },
      err => {
        console.log(err);
      })
    }else {
        this.user.getUsers('','1000','1','',this.searchField).subscribe(res => {
          document.getElementById('select-user').click();
          const temp: any = res;
          this.guru = temp.data.guru;
          this.shishya = temp.data.shishya;
          console.log(this.guru);
          console.log(this.shishya);
          
        },
        err => {
          console.log(err);
        });
    }
  }


  assignGuru(g : any){
    
    const obj = {
      img : g.imageUrl,
      id : g._id,
      name : g.fName + ' ' + g.lName,
    };

    this.guruArray.push(obj);


    // this.user.mapGuruShishya(obj).subscribe(res => {
    //   console.log(res);
    // },
    // err => {
    //   console.log(err);
    // });
  }

  assignShishya(s : any){

    const obj = {
      img : s.imageUrl,
      id : s._id,
      name : s.fName + ' ' + s.lName,
    };

    this.shishyaArray.push(obj);

  }




}
