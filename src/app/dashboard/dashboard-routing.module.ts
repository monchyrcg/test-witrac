
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { DashboardComponent } from './home/dashboard/dashboard.component';

import { HomeComponent } from './home/home.component';
import { AssetComponent } from './home/asset/asset.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            {
                path: 'assets',
                component: AssetComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {

}