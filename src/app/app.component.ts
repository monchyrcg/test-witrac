import { Component } from '@angular/core';
import { SettingsService } from './shared/services/settings.service';
import { Countries } from './shared/settings/country';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
})

export class AppComponent {

	defaultCountry = Countries.countries;

	constructor(private settingService: SettingsService) {

		if (localStorage.getItem('country')) {
			const locale = Countries.settingCountry[localStorage.getItem('country')].locale;
			this.settingService.setLang(locale);
		} else {
			const browserLocale = (navigator.language).split('-')[0];

			const setLocale = this.defaultCountry.includes(browserLocale) ? browserLocale : 'en';

			this.settingService.changeCountry(setLocale);
		}
	}
}
