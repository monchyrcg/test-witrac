import { Component } from '@angular/core';
import { SettingsService } from './shared/services/settings.service';
import { StaticData } from './shared/settings/staticdata';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
})

export class AppComponent {

	defaulLocal = StaticData.locales;

	constructor(private settingService: SettingsService) {

		if (localStorage.getItem('locale')) {
			this.settingService.setLang(localStorage.getItem('locale'));
		} else {
			const browserLocale = (navigator.language).split('-')[0];

			const setLocale = this.defaulLocal.includes(browserLocale) ? browserLocale : 'en';

			this.settingService.changeLang(setLocale);
		}
	}
}
