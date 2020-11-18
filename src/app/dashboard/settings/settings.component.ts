import { Component, OnInit } from '@angular/core';
import { AuthenticationGeneralService } from 'src/app/shared/services/auth-general.service';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    current_team_id: number;
    showListKind = false;

    kindName: string = 'Estabilizacion';
    kindColor: string = '#4c51bf';
    currentColor: string = '#4c51bf';

    constructor(
        public settingService: SettingsService,
        private authService: AuthenticationGeneralService
    ) { }

    ngOnInit(): void {
        this.current_team_id = this.authService.getUserVariable('current_team_id');
    }

    changeKind(kind) {
        this.showListKind = false;
        this.kindName = kind.name;
        this.kindColor = kind.color;
        this.currentColor = kind.color;
    }
}