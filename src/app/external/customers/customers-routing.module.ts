import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NutritionalPlanComponent } from "./nutritional-plan/nutritional-plan.component";
import { SignPrivacyComponent } from "./signprivacy/signprivacy.component";

const routes: Routes = [
    { path: 'sign-privacy/:customer', component: SignPrivacyComponent },
    { path: 'nutritional-plan/:customer', component: NutritionalPlanComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomersRoutingModule {

}