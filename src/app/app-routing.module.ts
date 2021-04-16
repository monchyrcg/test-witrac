import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
	{ path: '', redirectTo: '', pathMatch: 'full' },
	{ path: '', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		DashboardModule,
		AuthRoutingModule
	],
	exports: [RouterModule, DashboardModule]
})
export class AppRoutingModule {

}