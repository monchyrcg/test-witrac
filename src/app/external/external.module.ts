import { NgModule } from "@angular/core";
import { AppointmentsModule } from "./appointments/appointments.module";
import { CustomersModule } from "./customers/customers.module";
import { ExternalRoutingModule } from "./external.routing.module";


@NgModule({
    declarations: [

    ],
    imports: [
        ExternalRoutingModule,
        AppointmentsModule,
        CustomersModule
    ],
    exports: [

    ],
    providers: [],
})

export class ExternalModule {

}