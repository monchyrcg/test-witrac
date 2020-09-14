import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';



@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
})

export class AppComponent {

	defaulLocal = ['es', 'en', 'fr', 'it'];

	constructor(private translate: TranslateService) {

		if (localStorage.getItem('locale')) {
			translate.setDefaultLang(localStorage.getItem('locale'));
		} else {
			const browserLocale = (navigator.language).split('-')[0];
			console.log(browserLocale);
			const setLocale = this.defaulLocal.includes(browserLocale) ? browserLocale : 'en';
			console.log(setLocale);
			localStorage.setItem('locale', setLocale);
			translate.setDefaultLang(setLocale);
		}
	}
}
