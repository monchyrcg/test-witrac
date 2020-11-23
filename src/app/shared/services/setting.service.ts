import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SettingGeneralService } from './settings-general.service';

@Injectable({
    providedIn: 'root'
})
export class SettingService {

    constructor(
        public settingGeneralService: SettingGeneralService,
        private http: HttpClient
    ) { }

    getColors(team_id) {
        return this.http.get(`${environment.apiUrl}/teams/${team_id}/colors`,)
            .pipe(map((response: any) => {
                response.data.forEach((element, key) => {
                    response.data[key].name = this.findName(key);
                });

                return response.data;
            }));
    }

    private findName(key): string {
        let name;
        switch (key) {
            case 0:
                name = this.settingGeneralService.getLangText('kind_appointments.stabilization')
                break;
            case 1:
                name = this.settingGeneralService.getLangText('kind_appointments.study')
                break;
            case 2:
                name = this.settingGeneralService.getLangText('kind_appointments.new')
                break;
            case 3:
                name = this.settingGeneralService.getLangText('kind_appointments.revision')
                break;
            case 4:
                name = this.settingGeneralService.getLangText('kind_appointments.maintenance')
                break;
            case 5:
                name = this.settingGeneralService.getLangText('kind_appointments.recovered')
                break;
        }

        return name;
    }
}