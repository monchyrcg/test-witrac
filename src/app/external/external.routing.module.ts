import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: 'appointments', loadChildren: './appointments/appointments.module#AppointmentsModule', },
    { path: 'customers', loadChildren: './customers/customers.module#CustomersModule', },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExternalRoutingModule {

}