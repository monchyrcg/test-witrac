import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilsService } from '../shared/services/util.service';


@Injectable({
    providedIn: 'root'
})
export class SignPrivacyService {

    constructor(private http: HttpClient, private utilService: UtilsService) { }

    getCustomerCrypt(customer: string) {
        return this.http.get(`${environment.apiUrl}/sign-privacy/${customer}`,)
            .pipe(map((response: any) => {
                return response.data;
            }));
    }

    saveCustomerCrypt(customer: string) {
        return this.http
            .get(`${environment.apiUrl}/sign-privacy/signed/${customer}`,)
            .pipe(map((response: any) => {
                response.data;
            }));
    }
}