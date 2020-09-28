import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';
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

	constructor(private translateService: TranslateService, private authService: AuthenticationGeneralService) { }

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

		const nameTeam = (user.teams).filter(x => x.id == user.current_team_id).map(u => u.name);

		const totalTeams = (user.teams).length;

		const teams = user.teams;

		this.changeTeamSource.next({ nameTeam: nameTeam, totalTeams: totalTeams, teams: teams });
	}

	changeTeam(id: number) {
		let user = this.authService.getUser();
		user.current_team_id = id;
		this.authService.setToken(user);
		this.getTeam();
	}
}
