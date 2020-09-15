import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-assign-users',
  templateUrl: './assign-users.component.html',
  styleUrls: ['./assign-users.component.scss']
})
export class AssignUsersComponent implements OnInit {

  constructor(private user : UserService) { }

  searchField = "";
  guru;
  shishya;
  users

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

}
