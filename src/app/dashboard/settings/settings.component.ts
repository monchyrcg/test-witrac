import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { AuthenticationGeneralService } from 'src/app/shared/services/auth-general.service';
import { SettingService } from 'src/app/shared/services/setting.service';
import { SettingGeneralService } from 'src/app/shared/services/settings-general.service';
import { MenuComponent } from '../home/menu/menu.component';


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

    current_team_id: number;
    showListKind = false;
    subscription: Subscription = new Subscription;

    kindsAppointments;
    firstKindAppointment;
    currentColor;

    constructor(
        public settingGeneralService: SettingGeneralService,
        private authService: AuthenticationGeneralService,
        private settingService: SettingService,
        private snackbarService: SnackbarService,
    ) { }


    ngOnInit(): void {
        this.current_team_id = this.authService.getUserVariable('current_team_id');

        this.getColor();
    }

    getColor() {
        this.kindsAppointments = null;
        this.settingService.getColors(this.current_team_id).subscribe(
            (response) => {
                this.kindsAppointments = response;
                this.firstKindAppointment = this.kindsAppointments[0];
                this.currentColor = this.firstKindAppointment.color;
            }
        )
    }

    changeTeam(team_id) {
        this.current_team_id = team_id;
        this.getColor();
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
        this.settingGeneralService.changeSettings(this.current_team_id, this.kindsAppointments).subscribe(
            () => {
                this.showSnackBar('Seetings updated successfully.', 'success');
            },
            (error) => {
                this.showSnackBar('Algo ha pasado ....', 'danger');
            }
        )
    }

    showSnackBar(text: string, _class: string) {
        this.snackbarService.show(text, _class);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}