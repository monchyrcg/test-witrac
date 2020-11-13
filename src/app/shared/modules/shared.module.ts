import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ModalInfoComponent } from '../components/modals/info/modal-info.component';
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
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { NgxEchartsModule } from 'ngx-echarts';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        ModalInfoComponent,
        ErrorFormComponent,
        LabelFormComponent,
        SnackbarComponent,
        HighlightDirective,
        FilterPipe,
        TabsComponent,
        TabComponent,
        BreadcrumbComponent,
        LoadingComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule,
        NgxPermissionsModule.forRoot(),
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
        }),
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
        CalendarModule,
        BreadcrumbComponent,
        LoadingComponent,
        NgxEchartsModule
    ],
    entryComponents: [],
    providers: []
})
export class SharedModule {
    /**/
}
