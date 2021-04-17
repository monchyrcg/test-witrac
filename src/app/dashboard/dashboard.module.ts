import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/modules/shared.module';

import { HomeComponent } from './home/home.component';
import { MenuComponent } from './home/menu/menu.component';
import { AssetComponent } from './home/asset/asset.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LibraryComponent } from './home/library/library.component';

@NgModule({
    declarations: [
        MenuComponent,
        HomeComponent,
        AssetComponent,
        DashboardComponent,
        ProfileComponent,
        LibraryComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule,
        RouterModule,
    ],
    exports: [
        SharedModule,
        MenuComponent
    ],
    providers: [],
})

export class DashboardModule {

}