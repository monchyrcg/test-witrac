import { NgModule } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/modules/shared.module';
import { AuthModule } from './auth/auth.module';
import { MenuComponent } from './dashboard/home/menu/menu.component';
import { AuthenticationGeneralService } from './shared/services/auth-general.service';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';


@NgModule({
	declarations: [
		AppComponent,

	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		SharedModule,
		RouterModule,
		AppRoutingModule,
		DashboardModule,
		AuthModule
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
