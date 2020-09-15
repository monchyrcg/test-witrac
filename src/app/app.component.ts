import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StaticData } from './shared/settings/staticdata';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
})

export class AppComponent {

	defaulLocal = StaticData.locales;

	constructor(private translate: TranslateService) {

		if (localStorage.getItem('locale')) {
			translate.setDefaultLang(localStorage.getItem('locale'));
		} else {
			const browserLocale = (navigator.language).split('-')[0];

			const setLocale = this.defaulLocal.includes(browserLocale) ? browserLocale : 'en';

			localStorage.setItem('locale', setLocale);
			translate.setDefaultLang(setLocale);
		}
	}
}
