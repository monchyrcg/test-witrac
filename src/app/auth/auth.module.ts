import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/modules/shared.module';

import { LoginComponent } from './login/login.component';
import { ErrorFormComponent } from '../shared/components/form/error/error.component';
import { LabelFormComponent } from '../shared/components/form/label/label.component';
import { LoginService } from './login/login.service';

@NgModule({
    declarations: [
        LoginComponent,
        ErrorFormComponent,
        LabelFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        AuthRoutingModule,
        TranslateModule.forChild()
    ],
    exports: [
        SharedModule
    ],
    providers: [LoginService],
})

export class AuthModule { }