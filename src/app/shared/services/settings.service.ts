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

	setLang(lang) {
		this.translateService.use(lang);
	}

	changeLang(lang: string): void {
		this.setLang(lang);
		localStorage.setItem('locale', lang);

		this.changeLocale.next(lang);
	}

	getLangText(target: string): string[] {
		return this.translateService.instant(target)
	}
}
