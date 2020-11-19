import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SettingService {

    constructor(
        private http: HttpClient,
    ) { }

    getColors(team_id) {
        return this.http.get(`${environment.apiUrl}/teams/${team_id}/colors`,)
            .pipe(map((response: any) => {
                return response.data;
            }));
    }
}