import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/modules/shared.module';

import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        AuthRoutingModule,
    ],
    exports: [
        SharedModule
    ],
    providers: [LoginService],
})

export class AuthModule { }