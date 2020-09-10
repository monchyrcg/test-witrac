import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpXsrfTokenExtractor
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthenticationGeneralService } from '../services/auth-general.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    headerName = 'X-XSRF-TOKEN';
    constructor(
        private tokenService: HttpXsrfTokenExtractor,
        private auth: AuthenticationGeneralService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userData: User = this.auth.getUser();

        req = req.clone({
            withCredentials: true
        })

        if (userData && userData.token) {
            req = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${userData.token}`)
            });
        }

        if (req.method === 'GET' || req.method === 'HEAD') {
            return next.handle(req);
        }

        const token = this.tokenService.getToken();

        // Be careful not to overwrite an existing header of the same name.
        if (token !== null && !req.headers.has(this.headerName)) {
            req = req.clone({ headers: req.headers.set(this.headerName, token) });
        }

        return next.handle(req);
    }
}