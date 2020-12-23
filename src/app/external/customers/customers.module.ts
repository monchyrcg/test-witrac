import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SharedModule } from "src/app/shared/modules/shared.module";
import { CustomersRoutingModule } from "./customers-routing.module";
import { NutritionalPlanComponent } from "./nutritional-plan/nutritional-plan.component";
import { SignPrivacyComponent } from "./signprivacy/signprivacy.component";


@NgModule({
    declarations: [
        SignPrivacyComponent,
        NutritionalPlanComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CustomersRoutingModule,
        Ng2FlatpickrModule,
        GooglePlaceModule,
    ],
    exports: [
        SharedModule,
    ],
    providers: [],
})

export class CustomersModule {

}