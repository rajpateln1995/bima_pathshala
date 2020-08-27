import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate{

    constructor(private router: Router) {}

    canActivate(): boolean {
        const user = JSON.parse(localStorage.getItem('Token'));
        if (user && user.token && user.token !== null){
            if (user.expDate < Date.now()) {
                this.router.navigateByUrl('auth/login');
                return false;
            }else {
                return true;
            }
        }else {
            this.router.navigateByUrl('auth/login');
            return false;
        }
    }
}