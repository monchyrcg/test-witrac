import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';


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

    getUserVariable(name) {
        const user = this.getUser();
        return user[name];
    }

    setToken(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    updateUser(user: User) {
        let currentUser = this.getUser();
        const newUser = { ...currentUser, ...user };

        localStorage.setItem('currentUser', JSON.stringify(newUser));
    }

    isLoggedIn() {
        const data = this.getUser();
        if (!data) {
            return false;
        }

        const user: User = data;

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
