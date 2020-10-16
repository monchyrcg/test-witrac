import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilsService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class TwilioService {

    constructor(private http: HttpClient, private utilService: UtilsService) { }

    getToken() {

        let body = {
            forPage: window.location.pathname
        }

        return this.http
            .post(`${environment.apiUrl}/token`, body)
            .pipe(map((response: any) => {
                return response.data;
            }));
    }
}