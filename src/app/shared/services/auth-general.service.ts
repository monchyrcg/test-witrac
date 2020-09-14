import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable()
export class AuthenticationGeneralService {
    data;
   
    constructor(private router: Router) {
        if (this.isLoggedIn()) {
            this.data = this.getUser();
        }
    }

    getUser(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    setToken(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    isLoggedIn() {
        const data = this.getUser();
        if (!data) {
            return false;
        }
        return true;
    }

    clearUser() {
        localStorage.removeItem('currentUser');
    }

    logout() {
        this.clearUser();
        this.router.navigate(['/login']);
    }
}
