import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {


    constructor(
        private http: HttpClient
    ) { }

    updateProfile(profile) {
        return this.http
            .put(`${environment.apiUrl}/profile/${profile.id}`, profile)
            .pipe(map((response: any) => {
                return response.data;
            }));
    }

    saveGoogleCalendarEvents(id: number, events) {
        return this.http
            .post(`${environment.apiUrl}/profile-google-calendar/${id}`, events)
            .pipe(map((response: any) => {
                return response.data;
            }));
    }
}