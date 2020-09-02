import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbSpinnerService } from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService,
              private router: Router,
              private spinner$: NbSpinnerService) { }


  loading: boolean = false;



  btn_valid: boolean = false;
  login_form: FormGroup;

  ngOnInit(): void {
    this.spinner$.load();
    this.login_form = new FormGroup({
      'email' : new FormControl(null, [Validators.required , Validators.email]),
      'password' : new FormControl(null, Validators.required),
    });
  }

  ngOnDestroy(){
    this.loading = false;
  }


  login(){
    console.log(this.login_form)
    this.loading = true;
    this.btn_valid = false;
    this.auth.login(this.login_form.value.email , this.login_form.value.password).subscribe(res => {
      console.log('asfasf');
      console.log(res);
      const r = res;
      if (r['success'] === 1) {
        this.router.navigateByUrl('/pages/users/sanchalak');
      }
      
    },
    err => {
      console.log(err);
    });
  }

}
