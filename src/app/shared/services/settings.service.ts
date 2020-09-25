import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	private changeLocaleSource = new BehaviorSubject<any>({ locale: localStorage.getItem('locale'), start: 1 });
	public changeLocal$ = this.changeLocaleSource.asObservable();

	constructor(private translateService: TranslateService) { }

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
}
