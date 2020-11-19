import { Component, OnInit } from '@angular/core';
import { AuthenticationGeneralService } from 'src/app/shared/services/auth-general.service';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import { SettingService } from './setting.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    current_team_id: number;
    showListKind = false;

    kindsAppointments;
    firstKindAppointment;
    currentColor;

    constructor(
        public settingGeneralService: SettingGeneralService,
        private authService: AuthenticationGeneralService,
        private settingService: SettingService
    ) { }

    ngOnInit(): void {
        this.current_team_id = this.authService.getUserVariable('current_team_id');

        this.settingService.getColors(this.current_team_id).subscribe(
            (response) => {
                response.forEach((element, key) => {
                    console.log(key);
                    console.log(this.findName(key));
                    response[key].name = this.findName(key);
                });
                this.kindsAppointments = response;
                this.firstKindAppointment = this.kindsAppointments[0];
                this.currentColor = this.firstKindAppointment.color;
            }
        )
    }

    changeKind(kind) {
        this.showListKind = false;
        this.firstKindAppointment = kind;
        this.currentColor = kind.color;
    }

    changeColor(color) {
        this.firstKindAppointment.color = color;
    }

    submit() {
        console.log(this.kindsAppointments);
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