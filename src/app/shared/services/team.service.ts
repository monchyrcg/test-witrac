import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    constructor(
        private http: HttpClient
    ) { }


    /**
     * users
     */
    public listUsers(team_id: number) {
        return this.http
            .get(`${environment.apiUrl}/teams/${team_id}/users`)
            .pipe(map((response: any) => {
                return response.data;
            }));
    }
}