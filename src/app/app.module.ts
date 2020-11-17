import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/modules/shared.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthenticationGeneralService } from './shared/services/auth-general.service';
import { BrowserModule } from '@angular/platform-browser';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { MenuComponent } from './dashboard/home/menu/menu.component';
import { SignPrivayComponent } from './signprivacy/signprivacy.component';

@NgModule({
	declarations: [
		AppComponent,
		NopagefoundComponent,
		SignPrivayComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		SharedModule,
		RouterModule,
		AppRoutingModule,
		DashboardModule,
		AuthModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		}),
	],
	exports: [],
	providers: [
		AuthInterceptor, AuthenticationGeneralService,
		MenuComponent,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
	],
	bootstrap: [AppComponent]
})

export class AppModule {

}
