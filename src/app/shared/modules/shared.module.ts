import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { ErrorFormComponent } from '../components/form/error/error.component';
import { LabelFormComponent } from '../components/form/label/label.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from '../components/loading/loading.component';
import { ProgressBarComponent } from '../components/progress/progress..component';



@NgModule({
    declarations: [
        ErrorFormComponent,
        LabelFormComponent,
        SnackbarComponent,
        LoadingComponent,
        ProgressBarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SnackbarComponent,
        ErrorFormComponent,
        LabelFormComponent,
        LoadingComponent,
        ProgressBarComponent
    ],
    entryComponents: [],
    providers: []
})
export class SharedModule {
    /**/
}
