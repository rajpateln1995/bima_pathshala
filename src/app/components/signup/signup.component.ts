import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbSpinnerService } from '@nebular/theme';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private spinner$: NbSpinnerService,
              private auth: AuthService,
              private router: Router) { }

  signup_form: FormGroup;
  btn_valid: boolean = false;

  ngOnInit(): void {
    this.spinner$.load();
    this.signup_form = new FormGroup({
      'email' : new FormControl(null, [Validators.required , Validators.email]),
      'password' : new FormControl(null, Validators.required),
    });
  }

  signup(){
    this.auth.register(this.signup_form.value.email, this.signup_form.value.password).subscribe(res => {
      console.log(res);
      if (res['success'] === 1) {
        this.router.navigateByUrl('/pages/users/sanchalak');
      }
    },
    err => {
      console.log(err);
    })
  }

  login(){
    this.router.navigateByUrl('/auth/login');
  }

}
