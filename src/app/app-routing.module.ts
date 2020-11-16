import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// modules
import { AuthRoutingModule } from './auth/auth-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { LoginComponent } from './auth/login/login.component';

import { AuthGuard } from './shared/guards/auth.guard';
import { SignPrivayComponent } from './signprivacy/signprivacy.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'sign-privacy/:customer', component: SignPrivayComponent },
  { path: '**', component: NopagefoundComponent }
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