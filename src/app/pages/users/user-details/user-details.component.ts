import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})




export class UserDetailsComponent implements OnInit {

  constructor(private user: UserService,
              private route: ActivatedRoute) { }

  userId: string = "";
  details: any;
  editable: boolean = false;
  role: string ;

  ngOnInit() {
    this.details = userModel;
    this.role = this.route.snapshot.params['role'];
    this.userId = this.route.snapshot.params['id'];
    this.user.getUsers('', '10', '1', this.userId).subscribe(res => {
      console.log(res);
      this.details = res;
      this.details = this.details.data[this.role][0];
      console.log(this.details);

    },
    err => {
      console.log(err);
    })
    
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
