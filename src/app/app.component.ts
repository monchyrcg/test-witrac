import { Component } from '@angular/core';
import { browser } from 'protractor';
import { SettingGeneralService } from './shared/services/settings-general.service';
import { Countries } from './shared/settings/country';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
})

export class AppComponent {

	defaultCountry = Countries.countries;

	constructor(private settingGeneralService: SettingGeneralService) {

		if (localStorage.getItem('country')) {
			const locale = Countries.settingCountry[localStorage.getItem('country')].locale;
			this.settingGeneralService.setLang(locale);
		} else {
			const browserLocale = (navigator.language).split('-')[0];

			const setLocale = this.defaultCountry.includes(browserLocale) ? browserLocale : 'us';

			this.settingGeneralService.changeCountry(setLocale);
		}
	}
}
