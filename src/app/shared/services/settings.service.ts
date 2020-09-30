import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Roles } from '../settings/rol';
import { User } from '../models/user.model';
import { AuthenticationGeneralService } from './auth-general.service';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	private changeLocaleSource = new BehaviorSubject<any>({ locale: localStorage.getItem('locale'), start: 1 });
	public changeLocal$ = this.changeLocaleSource.asObservable();

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

	changeLang(lang: string): void {
		this.setLang(lang);
		localStorage.setItem('locale', lang);

		this.changeLocaleSource.next({ locale: lang, start: 1 });
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
