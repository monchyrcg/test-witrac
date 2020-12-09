import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppointmentsComponent } from './appointments.component';


const routes: Routes = [

    { path: '', component: AppointmentsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: []
})
export class AppointmentsRoutingModule { }