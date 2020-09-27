import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionsService } from '../../../services/sessions.service';
import { NbToastrService } from '@nebular/theme';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'ngx-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})




export class UserDetailsComponent implements OnInit {

  constructor(private user: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private session: SessionsService,
              private toaster: NbToastrService)
  {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  userId: string = '';
  details: any = null;
  certificates: any;
  courses: any;
  sessions: [];
  editable: boolean = false;
  role: string;
  loading: boolean = false;
  editForm: FormGroup;
  myGuru;
  myShishya;
  gurusArray = [];
  shishyasArray = [];


  searchFieldGuru="";
  searchFieldShishya="";
  gurus;
  shishyas;
  guru;
  shishya;


  ngOnInit() {
    this.loading = true;
    console.log(this.details);
    this.role = this.route.snapshot.params['role'];
    this.userId = this.route.snapshot.params['id'];
    this.user.getUsers('', '10', '1', this.userId).subscribe(res => {
      console.log(res);
      this.details = res;
      this.details = this.details.data[this.role][0];
      console.log(this.details);
      this.editForm.value.fname = this.details.fname;
      this.loading = false;
      this.myGuru = this.details.myGurus;
      this.myShishya = this.details.myShishyas;
      if (this.role === 'guru') {
        this.getShishyas();
      }else{
        this.getGurus();
      }
    },
    err => {
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
      console.log(err);
    });

    this.user.userDetails(this.userId).subscribe(res => {
      console.log(res);
      const data: any = res;
      this.certificates = data.data.certificates;
      this.courses = data.data.courses;
      this.sessions = data.data.session;
      this.gurus = data.data.myGurus;
      this.shishyas = data.data.myShishyas;
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
    });

    this.editForm = new FormGroup({
      'dob': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'gender': new FormControl(null, Validators.required),
      'fName': new FormControl(null, Validators.required),
      'lName': new FormControl(null, Validators.required),
      'age': new FormControl(null, Validators.required),
      'motherTongue': new FormControl(null),
      'maritalStatus': new FormControl(null),
      'occupation': new FormControl(null),
      'aadharNumber': new FormControl(null, [Validators.required, Validators.minLength(12)]),
      'pincode': new FormControl(null, Validators.required),
      'locality': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),

  });
  
  
  // for (const g of this.gurus){
  //       const obj = {
  //         img : g.imageUrl,
  //         id : g._id,
  //         name : g.fName + ' ' + g.lName,
  //       };
  //       this.guruArray.push(obj);
  // }

  // for (const s of this.attendees){
  //   const obj = {
  //     img : s.imageUrl,
  //     id : s._id,
  //     name : s.fName + ' ' + s.lName,
  //   };
  //   this.shishyaArray.push(obj);
  // }


  }

  showUser(role , id){
    this.router.navigateByUrl(`/pages/users/user-details/${role}/${id}`);
  }

  getShishyas() {
    for (const id of this.myShishya){
      this.user.getUsers('', '100000', '1', id).subscribe(res => {
        console.log(res);
        const temp: any = res;
        const obj = {
          _id : temp.data.shishya[0]._id,
          name : temp.data.shishya[0].fName + ' ' + temp.data.shishya[0].lName,
          phone : temp.data.shishya[0].phone,
          email : temp.data.shishya[0].email,
        };
        this.shishyasArray.push(obj);
        console.log(this.shishyasArray);
      },
      err => {
        console.log(err);
        this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
      });
    }
  }

  getGurus(){
    for (const id of this.myGuru) {
      this.user.getUsers('', '100000', '1', id).subscribe(res => {
        console.log(res);
        const temp: any = res;
        const obj = {
          _id : temp.data.guru[0]._id,
          name : `${temp.data.guru[0].fName} ${temp.data.guru[0].lName}`,
          phone : temp.data.guru[0].phone,
          email : temp.data.guru[0].email,
        };
        this.gurusArray.push(obj);
        console.log(this.gurusArray);
      },
      err => {
        console.log(err);
        this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
      });
    }
  }


  getInitials(fullName){
    if(fullName.length > 0){
      return fullName.split(" ").map((n)=>n[0].toUpperCase()).join("");
    }else{
      return 'XX';
    }
  }



  save(){
    this.loading = true;
    const data = {
      'role': this.role,
      'status': 1,
      '_id': this.userId,
      'dob': this.details.dob,
      'phone': this.details.phone,
      'email': this.details.email,
      'gender': this.details.gender,
      'fName': this.details.fName,
      'lName': this.details.lName,
      'age': this.details.age,
      'motherTongue': this.details.motherTongue,
      'maritalStatus': this.details.maritalStatus,
      'occupation': this.details.occupation,
      'aadharNumber': this.details.aadharNumber,
      'address': {
        'pincode': this.details.address.pincode,
        'locality': this.details.address.locality,
        'city': this.details.address.city,
        'state': this.details.address.state,
        'country': this.details.address.country,
      },
    };
    this.user.updateUserDetails(data).subscribe(res => {
      console.log(res);
      this.toaster.show('User Details Saved Successfully', 'Saved Successfully' , { status : 'success' });
      this.loading = false;
    },
    err => {
      console.log(err);
      this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
      this.loading = false;
    });

  }

  viewSession(sesionId, status){
    let obj;
    this.session.getSessionDetails(sesionId).subscribe(res => {
      console.log(res);
      const temp: any = res;
      obj = temp.data.otherLanguages;
      const data = [];
      for (const x of obj){
        data.push({
          id : x.session,
          lang : x.language});
      }
      localStorage.setItem('session-list', JSON.stringify({data : data}));
      this.router.navigateByUrl('pages/sessions/create/id/' + sesionId + '/' + status);
    },
    err => {
      console.log(err);
    });

}

changeStatus(status , type){
  const obj = {
    _id : this.route.snapshot.params['id'],
    status : status,
  };
  this.user.updateUserDetails(obj).subscribe(res => {
    console.log(res);
    this.toaster.show(`User Is ${this.status[status]}`, this.status[status] , { status : type });
  }, err => {
    console.log(err);
    this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
  });
}

status = [
  'Created By Sanchalak',
  'Verified',
  'Enabled',
  'Blocked',
  'Deleted',
];


guruList;
getGuruSearch(){
  let name = "";
  let contact = "";
  const match = this.searchFieldGuru.match(/^\d+$/);
  if(match && match[0]===this.searchFieldGuru){
    contact = this.searchFieldGuru;
  }else{
    name = this.searchFieldGuru;
  }
  this.user.getUsers('guru', '10000' , '1', '' , name , '' , contact).subscribe((res: any) => {
    console.log(res);
    this.guruList = res.data.guru;
  },
  err => {
    console.log(err);
  })
}


shishyaList;
getShishyaSearch(){
  let name = "";
  let contact = "";
  const match = this.searchFieldShishya.match(/^\d+$/);
  
  if(match && match[0]===this.searchFieldShishya){
    contact = this.searchFieldShishya;
  }else{
    name = this.searchFieldShishya;
  }
  this.user.getUsers('shishya', '10000' , '1', '' , name , '' , contact).subscribe((res: any) => {
    console.log(res);
    this.shishyaList = res.data.shishya;
  },
  err => {
    console.log(err);
  });
}

assignGuru(g){
  const obj = {
    shishya : this.route.snapshot.params['id'],
    guru : g._id,
    add : true,
  };
  this.user.mapGuruShishya(obj).subscribe(res => {
    console.log(res);
    this.toaster.show('Guru Assigned Successfully !', 'Guru Assigned' , { status : 'success' });
  }, err => {
    console.log(err);
    this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
  });
  const x = {
    _id : g._id,
    name : g.fName + ' ' + g.lName,
    phone : g.phone,
    email : g.email,
  };
  this.gurusArray.push(x);
}

assignShishya(s){
  const obj = {
    shishya : s._id,
    guru : this.route.snapshot.params['id'],
    add: true,
  };
  this.user.mapGuruShishya(obj).subscribe(res => {
    
    this.toaster.show('Shishya Assigned Successfully !', 'Shishya Assigned' , { status : 'success' });
    
  }, err => {
    console.log(err);
    this.toaster.show('Something Went Wrong !', 'Error' , { status : 'danger' });
  });
  const x = {
    _id : s._id,
    name : s.fName + ' ' + s.lName,
    phone : s.phone,
    email : s.email,
  };
  this.shishyasArray.push(x);
}


}

