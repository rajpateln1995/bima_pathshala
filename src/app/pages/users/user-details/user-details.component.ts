import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})




export class UserDetailsComponent implements OnInit {

  constructor(private user: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  userId: string = '';
  details: any = null;
  certificates: any;
  courses: any;
  sessions: any;
  editable: boolean = false;
  role: string;
  loading: boolean = false;
  editForm: FormGroup;

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
      this.editForm.value.fname =this.details.fname
      this.loading = false;
    },
    err => {
      console.log(err);
    });

    this.user.userDetails(this.userId).subscribe(res => {
      console.log(res);
      const data: any = res;
      this.certificates = data.data.certificates;
      this.courses = data.data.courses;
      this.sessions = data.data.certificates;

    },
    err => {
      console.log(err);
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

  }
  save(){
    this.loading = true;
    const data = {
      'role': this.role,
      'status': 1,
      '_id': this.userId,
      'dob': this.details.dob,
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
      document.getElementById('success').click();
      this.loading = false;
    },
    err => {
      console.log(err);
      this.loading = false;
    });

    
    // this.router.navigate(['pages/users/shishya']);
  }


}


export class Address {
  locality: string = '';
  city: string = '';
  state: string = '';
  country: string = '';
  pincode: string = '';
}

export class Location {
  type: string = '';
  coordinates: number[];
}

export class Auth {
  expires: string = '';
  token: string = '';
}

export class userModel {
  _id: string = '';
  address: Address;
  location: Location;
  fName: string = '';
  lName: string = '';
  imageUrl: string = '';
  aadharNumber: string = '';
  referralCode: string = '';
  gender: string = '';
  occupation: string = '';
  dob: string = '';
  age: string = '';
  motherTongue: string = '';
  maritalStatus: string = '';
  dependents: number = 0;
  role: string = '';
  orders: any[];
  isVip: number = 0;
  externalUrls: any[];
  status: number = 0;
  passHash: string = '';
  email: string;
  media: any[];
  cart: any[];
  salt: string = '';
  initialPas: string = '';
  createdAt: Date;
  updatedAt: Date;
  rollNumber: number;
  __v: number = 0;
  auth: Auth;
  id: string = '';
}
