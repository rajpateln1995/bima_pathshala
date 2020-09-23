import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionsService } from '../../../services/sessions.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-assign-users',
  templateUrl: './assign-users.component.html',
  styleUrls: ['./assign-users.component.scss']
})
export class AssignUsersComponent implements OnInit {

  constructor(private user : UserService,
              private route : ActivatedRoute,
              private session : SessionsService) { }
  
  @Input() attendees;
  @Input() gurus;
  searchField = "";
  guru;
  shishya;
  users;
  guruArray = [];
  shishyaArray = [];


  ngOnInit(): void {
    
    console.log(this.gurus);
    console.log(this.attendees);
    for (const g of this.gurus){
          const obj = {
            img : g.imageUrl,
            id : g._id,
            name : g.fName + ' ' + g.lName,
          };
          this.guruArray.push(obj);
    }

    for (const s of this.attendees){
      const obj = {
        img : s.imageUrl,
        id : s._id,
        name : s.fName + ' ' + s.lName,
      };
      this.shishyaArray.push(obj);
    }


  }


  getUsers() {
    const match = this.searchField.match(/^\d+$/)
    if(match && match[0] === this.searchField){
      this.user.getUsers('','1000','1','','','',this.searchField).subscribe(res => {
        document.getElementById('select-user').click();
        const temp: any = res;
        this.guru = temp.data.guru;
        this.shishya = temp.data.shishya;
        console.log(this.shishya)
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
        console.log(this.shishya)
          
        },
        err => {
          console.log(err);
        });
    }
  }
  
  
  getInitials(fullName){
    return fullName.split(" ").map((n)=>n[0].toUpperCase()).join("");
  }


  assignGuru(g : any){
    
    const obj = {
      img : g.imageUrl,
      id : g._id,
      name : g.fName + ' ' + g.lName,
    };

    this.guruArray.push(obj);
    console.log(this.guruArray);

    document.getElementById('close-user').click();

  }

  assignShishya(s : any){


    const obj = {
      img : s.imageUrl,
      id : s._id,
      name : s.fName + ' ' + s.lName,
    };

    this.shishyaArray.push(obj);
    console.log(this.shishyaArray);

    document.getElementById('close-user').click();

  }

  removeShishya(i){
    this.shishyaArray.splice(i, 1);
    let idArr = [];
    for (const shishya of this.shishyaArray){
      idArr.push(shishya.id);
    }
    const obj = {
      _id : this.route.snapshot.params['id'],
      attendees : idArr,
    };
    console.log(obj);
    this.session.saveSession(obj).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    });
  }

  removeGuru(i){
    this.guruArray.splice(i, 1);
    let idArr = [];
    for (const guru of this.guruArray){
      idArr.push(guru.id);
    }
    const obj = {
      _id : this.route.snapshot.params['id'],
      guru : idArr,
    };
    console.log(obj);
    this.session.saveSession(obj).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    });
    
  }

  addUsers(){
    if(this.guruArray.length === 1 && this.shishyaArray.length === 0){
      this.addsingle();
    }else{

      let g = "";
      let s = "";
      for (const guru of this.guruArray){
        g = g + guru.id + ',';
      }

      g = g.slice(0, (g.length - 1) );

      for (const shishya of this.shishyaArray){
        s = s + shishya.id + ',';
      }
      s = s.slice(0, (s.length - 1) );

      const obj = {
        guru : g,
        shishya : s,
        session : this.route.snapshot.params['id'],
        add : true,
      }
      console.log(obj)
        this.user.mapGuruShishya(obj).subscribe(res => {
          console.log(res);
        },
        err => {
          console.log(err);
        });

    }

  }

  addsingle(){
    let idArr = [];
    idArr.push(this.guruArray[0].id);
    const obj = {
      _id : this.route.snapshot.params['id'],
      guru : idArr,
    };
    console.log(obj);
    this.session.saveSession(obj).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    });
  }



}


