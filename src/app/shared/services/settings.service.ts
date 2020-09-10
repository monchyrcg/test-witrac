import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	constructor(private translateService: TranslateService) { }


	changeLang(lang: string): void {
		this.translateService.setDefaultLang(lang);
		localStorage.setIem('lang', lang);
	}
}
