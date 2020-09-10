import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { AuthenticationGeneralService } from 'src/app/shared/services/auth-general.service';
import { User } from 'src/app/shared/models/user.model';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient, private router: Router, private auth: AuthenticationGeneralService) { }

    sanctum() {
        return this.http
            .get(`${environment.apiUrl}/sanctum/csrf-cookie`)
            .pipe(map((response: any) => response));
    }

    login(email: string, password: string) {
        const body = {
            email,
            password,
        };
        return this.http
            .post(`${environment.apiUrl}/api/login`, body)
            .pipe(map((response: any) => {
                const result: User = response.data;
                this.auth.setToken(result);
            }));
    }

    getUser() {
        return this.http
            .get(`${environment.apiUrl}/api/user`)
            .pipe(map((response: any) => {
                const result: User = response.data;
                result.token = JSON.parse(localStorage.getItem('currentUser')).token;
                this.auth.setToken(result);
            }));
    }

    // initUser(response) {
    //     const user = <any>response;
    //     if (user && user.token) {
    //         this.data = user;
    //         // this.setUser();
    //         // this.setRenewer();
    //     }
    //     return user;
    // }

}