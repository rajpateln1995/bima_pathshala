import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbSpinnerService } from '@nebular/theme';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService,
              private router: Router,
              private spinner$: NbSpinnerService,
              private loader : LoaderService) { }






  btn_valid: boolean = false;
  login_form: FormGroup;
  showMsg;
  pleaseWait = false;

  ngOnInit(): void {
    this.spinner$.load();
    this.login_form = new FormGroup({
      'email' : new FormControl(null, [Validators.required , Validators.email]),
      'password' : new FormControl(null, Validators.required),
    });
  }

  ngOnDestroy(){
    
  }


  login(){
    console.log(this.login_form)
    this.btn_valid = false;
    this.auth.login(this.login_form.value.email , this.login_form.value.password).subscribe(res => {
      console.log('asfasf');
      console.log(res);
      const r = res;
      if (r['success'] === 1) {
        this.pleaseWait = true;
        this.showMsg = false;
        this.router.navigateByUrl('/pages/home');
      }else{
        this.loader.hide();
        this.showMsg = true;
      }
      
    },
    err => {
      console.log(err);
    });
  }

  // signup(){
  //   this.router.navigateByUrl('/auth/signup');
  // }

}
