import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	private changeLocale = new BehaviorSubject<string>(localStorage.getItem('locale'));
	public changeLocalS = this.changeLocale.asObservable();

	constructor(private translateService: TranslateService) { }


	changeLang(lang: string): void {
		this.translateService.use(lang);
		localStorage.setItem('locale', lang);

		this.changeLocale.next(lang);
	}
}
