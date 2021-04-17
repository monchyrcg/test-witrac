import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AuthenticationGeneralService } from 'src/app/shared/services/auth-general.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Injectable()
export class LoginService {

    constructor(
        private http: HttpClient,
        private auth: AuthenticationGeneralService,
    ) { }

    sanctum() {
        return this.http
            .get(`${environment.url}/sanctum/csrf-cookie`)
            .pipe(map((response: any) => response));
    }

    login(email: string, password: string) {
        const body = {
            email,
            password,
        };
        return this.http
            .post(`${environment.apiUrl}/login`, body)
            .pipe(map((response: any) => {
                if (!response.error) {
                    const result: User = response.data;
                    this.auth.setToken(result);
                }
            }));
    }

    getUser() {
        return this.http
            .get(`${environment.apiUrl}/user`)
            .pipe(map((response: any) => {
                const result: User = response.data;
                result.token = JSON.parse(localStorage.getItem('currentUser')).token;

                this.auth.setToken(result);
            }));
    }

    logout() {
        this.auth.logout();
    }
}