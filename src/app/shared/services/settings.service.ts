import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Roles } from '../settings/rol';
import { User } from '../interfaces/user.interface';
import { AuthenticationGeneralService } from './auth-general.service';
import { Countries } from '../settings/country';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	public country = localStorage.getItem('country') ?? 'es';
	public settings = Countries.settingCountry[this.country];
	private changeCountrySource = new BehaviorSubject<any>({
		locale: this.settings.locale,
		weekStartsOn: this.settings.weekStartsOn,
		weekendDays: this.settings.weekendDays,
		legal_age: this.settings.legal_age,
		flatpickr: this.settings.flatpickr,
		formatMoment: this.settings.formatMoment,
		formatFlatpickr: this.settings.formatFlatpickr
	});
	public changeCountry$ = this.changeCountrySource.asObservable();

	private changeTeamSource = new BehaviorSubject<any>({});
	public changeTeam$ = this.changeTeamSource.asObservable();

	constructor(
		private http: HttpClient,
		private translateService: TranslateService,
		private authService: AuthenticationGeneralService,
		private rolesService: NgxRolesService,
		private permissionsService: NgxPermissionsService
	) { }

	setLang(lang) {
		this.translateService.use(lang);
	}

	changeCountry(country: string): void {
		const countrySettings = Countries.settingCountry[country];
		const locale = countrySettings.locale;
		this.setLang(locale);
		localStorage.setItem('country', country);

		this.changeCountrySource.next({
			locale: locale,
			weekStartsOn: countrySettings.weekStartsOn,
			weekendDays: countrySettings.weekendDays,
			legal_age: countrySettings.legal_age,
			flatpickr: countrySettings.flatpickr,
			formatMoment: countrySettings.formatMoment,
			formatFlatpickr: countrySettings.formatFlatpickr
		});
	}

	getLangText(target: string) {
		return this.translateService.instant(target)
	}

	getTeam() {
		const user: User = this.authService.getUser();

		const currentTeam = (user.teams).filter(x => x.id == user.current_team_id)[0];
		const nameTeam = currentTeam.name;

		const totalTeams = (user.teams).length;

		const teams = user.teams;

		const current_team_id = user.current_team_id;

		const rol = Roles.roles.filter(x => x.id == currentTeam.rol)[0];

		// refresh permissions
		this.permissionsService.flushPermissions();
		this.permissionsService.loadPermissions(rol.permissions);

		// refresh roles
		this.rolesService.flushRoles();
		this.rolesService.addRole(rol.name, rol.permissions);

		this.changeTeamSource.next({ current_team_id: current_team_id, nameTeam: nameTeam, totalTeams: totalTeams, teams: teams });
	}

	changeTeam(id: number) {
		const body = {
			id
		};
		return this.http
			.put(`${environment.apiUrl}/change-team`, body)
			.pipe(map((response: any) => {
				if (!response.error) {
					let user = this.authService.getUser();
					user.current_team_id = id;
					this.authService.setToken(user);
					this.getTeam();
				}
			}));

	}
}
