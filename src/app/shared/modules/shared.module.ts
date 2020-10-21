import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ModalComponent } from '../components/modal/modal.component';
import { ErrorFormComponent } from '../components/form/error/error.component';
import { LabelFormComponent } from '../components/form/label/label.component';
import { NgxPermissionsModule } from 'ngx-permissions';

import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { HighlightDirective } from '../directives/highlight.directive';
import { FilterPipe } from '../pipes/filter.pipe';
import { TabsComponent } from '../components/tabs/tabs.component';
import { TabComponent } from '../components/tab/tab.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        ModalComponent,
        ErrorFormComponent,
        LabelFormComponent,
        SnackbarComponent,
        HighlightDirective,
        FilterPipe,
        TabsComponent,
        TabComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule,
        NgxPermissionsModule.forRoot(),
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        NgxPermissionsModule,
        ErrorFormComponent,
        LabelFormComponent,
        SnackbarComponent,
        HighlightDirective,
        FilterPipe,
        TabsComponent,
        TabComponent,
        CalendarModule
    ],
    entryComponents: [],
    providers: []
})
export class SharedModule {
    /**/
}
