
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: '', pathMatch: 'full' },
            {
                path: 'calendar',
                component: CalendarComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: '/forbidden'
                    }
                }
                // loadChildren: './components/profile/profile.module#ProfileModule',
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {

}