import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
              private router : Router) { }



  btn_valid: boolean = false; 
  login_form: FormGroup;

  ngOnInit(): void {
    this.login_form = new FormGroup({
      'email' : new FormControl(null, [Validators.required , Validators.email]),
      'password' : new FormControl(null, Validators.required)
    })

  }


  login(){
    this.auth.login(this.login_form.value.email , this.login_form.value.password).subscribe(res => {
      console.log('asfasf');
      console.log(res) 
      let r = res
      if (r['success'] === 1){
        this.router.navigateByUrl('/pages/users/sanchalak')
      }
      
    },
    err => {
      console.log(err);
    })
  }

}
